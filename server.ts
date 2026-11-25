import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

interface ProductSummary {
  name: string;
  available: boolean;
  prices: {
    quarter: number;
    half: number;
    kilo: number;
  };
}

interface StoreContextPayload {
  whatsapp?: string;
  iban?: string;
  beneficiary?: string;
  products?: ProductSummary[];
}

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function formatDisplayPhone(waNumber?: string): string {
  const cleaned = (waNumber || '').replace(/\D/g, '');
  if (cleaned.startsWith('966') && cleaned.length === 12) {
    return '0' + cleaned.slice(3);
  }
  return cleaned || '0597176168';
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history, storeContext } = req.body as {
        message?: string;
        history?: Array<{ role: string; text: string }>;
        storeContext?: StoreContextPayload;
      };

      if (!message || typeof message !== 'string' || !message.trim()) {
        res.status(400).json({ error: 'يرجى كتابة سؤالك أولاً.' });
        return;
      }

      const ai = getGeminiClient();
      if (!ai) {
        res.status(503).json({
          error: 'خدمة المستشار الذكي غير مفعّلة حالياً (مفتاح Gemini غير مهيأ). يمكنك استخدام الأسئلة السريعة أو التواصل عبر الواتساب مباشرة.',
          code: 'GEMINI_KEY_MISSING',
        });
        return;
      }

      const productsText =
        Array.isArray(storeContext?.products) && storeContext.products.length > 0
          ? storeContext.products
              .map(
                (p) =>
                  `- ${p.name} (${p.available ? 'متوفر حالياً' : 'غير متوفر حالياً'}): ربع كيلو ${p.prices.quarter} ريال، نصف كيلو ${p.prices.half} ريال، كيلو ${p.prices.kilo} ريال`
              )
              .join('\n')
          : '- عسل سدرة بلدي، عسل طلح بلدي، عسل سمرة بلدي: ربع كيلو 150 ريال، نصف كيلو 250 ريال، كيلو 400 ريال.';

      const iban = storeContext?.iban || 'SA09 8000 0272 6080 1030 2900';
      const beneficiary = storeContext?.beneficiary || 'آمنة عبد الكريم';
      const displayPhone = formatDisplayPhone(storeContext?.whatsapp);

      const systemInstruction = `أنت مستشار مبيعات ودود وأمين لمشروع "مناحل آمنة عبد الكريم" في المدينة المنورة.
أجب باللغة العربية بأسلوب راقٍ ومباشر ومختصر (3 إلى 5 أسطر غالباً) بالاعتماد فقط على الحقائق التالية:
1) المنتجات والأسعار الحالية:
${productsText}
2) التوصيل والدفع داخل المدينة المنورة:
- التوصيل فوري مع احتساب رسوم التوصيل حسب الموقع المرسل (ويدعم المتجر تحديد الموقع عبر GPS في السلة).
- يتوفر الدفع عند الاستلام داخل المدينة المنورة فقط، كما يتوفر التحويل البنكي.
3) التوصيل والدفع خارج المدينة المنورة:
- التوصيل والشحن حسب المنطقة.
- لا يتوفر الدفع عند الاستلام خارج المدينة المنورة؛ الدفع بالتحويل البنكي المسبق فقط.
4) بيانات التحويل البنكي:
- المصرف: مصرف الراجحي
- الاسم للتحويل: ${beneficiary}
- الآيبان: ${iban}
5) تأكيد الطلب:
- عبر السلة وإرسال تفاصيل الطلب إلى واتساب المنحل (${displayPhone}) مع إرسال إيصال التحويل عند التحويل البنكي.`;

      const recentHistory = Array.isArray(history)
        ? history
            .slice(-6)
            .map((m) => `${m.role === 'user' ? 'العميل' : 'المستشار'}: ${m.text}`)
            .join('\n')
        : '';

      const prompt = recentHistory
        ? `سجل المحادثة السابق:\n${recentHistory}\n\nسؤال العميل الحالي: ${message.trim()}`
        : message.trim();

      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: prompt,
        config: {
          systemInstruction,
        },
      });

      const replyText = response.text?.trim();
      if (!replyText) {
        res.status(502).json({ error: 'لم يتم استلام رد من المستشار الذكي. يرجى المحاولة مرة أخرى.' });
        return;
      }

      res.json({ reply: replyText });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ أثناء الاتصال بالمستشار الذكي.';
      res.status(500).json({
        error: 'تعذر الحصول على رد من المستشار الذكي حالياً. يمكنك استخدام الإجابات السريعة أو التواصل عبر الواتساب.',
        details: errorMessage,
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    app.use(express.static(path.resolve(__dirname, 'public'), { index: false }));
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
