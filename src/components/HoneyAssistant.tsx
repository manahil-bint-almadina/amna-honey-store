import { Loader2, Send, X } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import {
  BENEFICIARY_NAME,
  DEFAULT_IBAN,
  formatDisplayPhone,
} from '../data/defaultStore';
import type { ChatMessage, StoreState } from '../types';

function BeeIcon({
  className = 'w-4 h-4',
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`${className} ${animated ? 'animate-bee-hover' : ''}`}
    >
      {/* Translucent top wings */}
      <g className={animated ? 'animate-bee-wing' : ''}>
        <ellipse
          cx="9"
          cy="7.5"
          rx="4"
          ry="2.6"
          transform="rotate(-25 9 7.5)"
          fill="#FFF8E6"
          fillOpacity="0.92"
          stroke="#F6D598"
          strokeWidth="1"
        />
        <ellipse
          cx="15"
          cy="7.5"
          rx="4"
          ry="2.6"
          transform="rotate(25 15 7.5)"
          fill="#FFF8E6"
          fillOpacity="0.92"
          stroke="#F6D598"
          strokeWidth="1"
        />
      </g>
      {/* Bee golden body */}
      <ellipse
        cx="12"
        cy="14"
        rx="5.5"
        ry="4.2"
        fill="#F7C242"
        stroke="#331B16"
        strokeWidth="1.4"
      />
      {/* Honey-dark stripes */}
      <path
        d="M10 10.2V17.8M13.5 10V18"
        stroke="#331B16"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Head & antennae */}
      <circle cx="17.8" cy="13.5" r="2.1" fill="#331B16" />
      <path
        d="M18.6 11.6C19.3 10.4 20.2 9.8 21 9.8M19.5 12.1C20.4 11.6 21.3 11.6 21.8 11.9"
        stroke="#FFF8E6"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Stinger */}
      <path
        d="M6.5 14L4.3 14.3L6.5 15"
        fill="#331B16"
      />
    </svg>
  );
}

interface HoneyAssistantProps {
  store: StoreState;
}

const QUICK_QUESTIONS = [
  'ما هي أنواع العسل وأسعارها؟',
  'كيف التوصيل والدفع داخل وخارج المدينة؟',
  'ما هي بيانات التحويل البنكي؟',
];

export function HoneyAssistant({ store }: HoneyAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'أهلاً بك في مناحل آمنة عبد الكريم بالمدينة المنورة. كيف أقدر أساعدك اليوم؟ يمكنك السؤال عن أنواع العسل، الأسعار، التوصيل، أو بيانات التحويل.',
    },
  ]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const buildStoreFaqAnswer = (query: string): string => {
    const q = query.toLowerCase();
    if (
      q.includes('سعر') ||
      q.includes('أسعار') ||
      q.includes('نوع') ||
      q.includes('أنواع') ||
      q.includes('سدر') ||
      q.includes('طلح') ||
      q.includes('سمر')
    ) {
      const list = store.products
        .map(
          (p) =>
            `• ${p.name} (${p.available ? 'متوفر' : 'غير متوفر حالياً'}): ربع كيلو ${p.prices.quarter} ريال، نصف كيلو ${p.prices.half} ريال، كيلو ${p.prices.kilo} ريال.`
        )
        .join('\n');
      return `متوفر لدينا في مناحل آمنة عبد الكريم:\n${list}\n\nيمكنك اختيار الوزن وإضافته للسلة مباشرة.`;
    }
    if (
      q.includes('توصيل') ||
      q.includes('شحن') ||
      q.includes('دفع') ||
      q.includes('استلام') ||
      q.includes('مدينة') ||
      q.includes('gps') ||
      q.includes('موقع')
    ) {
      return `آلية التوصيل والدفع:\n• داخل المدينة المنورة: التوصيل فوري مع رسوم توصيل حسب الموقع المرسل (يمكنك تحديد موقعك عبر GPS في السلة)، ويتوفر الدفع عند الاستلام.\n• خارج المدينة المنورة: التوصيل حسب المنطقة، ولا يتم الدفع عند الاستلام خارج المدينة؛ الدفع بالتحويل البنكي المسبق فقط.`;
    }
    if (
      q.includes('تحويل') ||
      q.includes('ايبان') ||
      q.includes('آيبان') ||
      q.includes('بنك') ||
      q.includes('راجحي') ||
      q.includes('حساب')
    ) {
      return `بيانات التحويل البنكي:\n• المصرف: مصرف الراجحي\n• الاسم للتحويل: ${BENEFICIARY_NAME}\n• الآيبان: ${DEFAULT_IBAN}\n\nلتأكيد الطلب يرجى ترك رسالة أو تحويل مبلغ العسل المطلوب وإرسال الإيصال والطلبات عبر الواتساب.`;
    }
    return `تتوفر لدينا أنواع العسل (سدرة، طلح، سمرة) بالأسعار المحدثة في المتجر. التوصيل داخل المدينة المنورة فوري مع إمكانية الدفع عند الاستلام، وخارج المدينة بالتحويل المسبق فقط. كما يمكنك التواصل عبر الواتساب (${formatDisplayPhone(
      store.whatsapp
    )}).`;
  };

  const sendQuestion = async (questionText: string) => {
    const trimmed = questionText.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: messages.slice(-6).map((m) => ({
            role: m.role,
            text: m.text,
          })),
          storeContext: {
            whatsapp: store.whatsapp,
            iban: DEFAULT_IBAN,
            beneficiary: BENEFICIARY_NAME,
            products: store.products.map((p) => ({
              name: p.name,
              available: p.available,
              prices: p.prices,
            })),
          },
        }),
      });

      if (response.status === 404 || response.status === 405) {
        setMessages((prev) => [
          ...prev,
          {
            id: `faq_${Date.now()}`,
            role: 'assistant',
            text: buildStoreFaqAnswer(trimmed),
          },
        ]);
        return;
      }

      let data: { reply?: string; error?: string } = {};
      try {
        data = (await response.json()) as { reply?: string; error?: string };
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: `faq_${Date.now()}`,
            role: 'assistant',
            text: buildStoreFaqAnswer(trimmed),
          },
        ]);
        return;
      }

      if (!response.ok || !data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: `err_${Date.now()}`,
            role: 'assistant',
            text:
              data.error ||
              'تعذر الاتصال بالمستشار الذكي حالياً. يمكنك استخدام دليل الأسئلة السريعة أدناه أو التواصل عبر الواتساب.',
            isError: true,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `a_${Date.now()}`,
            role: 'assistant',
            text: data.reply!,
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          role: 'assistant',
          text: 'تعذر الوصول إلى الخادم حالياً. يمكنك استخدام دليل الأسئلة السريعة أدناه أو التواصل عبر الواتساب.',
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void sendQuestion(input);
  };

  const handleQuickFaq = (question: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `uq_${Date.now()}`, role: 'user', text: question },
      {
        id: `aq_${Date.now() + 1}`,
        role: 'assistant',
        text: buildStoreFaqAnswer(question),
      },
    ]);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label="اسأل عن العسل"
        title="اسأل عن العسل"
        className="fixed bottom-[4.25rem] md:bottom-5 right-4 z-40 w-14 h-14 rounded-full glass-twilight border border-[#F5D38C]/75 shadow-luxury flex items-center justify-center hover:scale-105 active:scale-95 transition cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5D38C]"
      >
        <span className="w-11 h-11 rounded-full btn-honey-glow flex items-center justify-center">
          <BeeIcon className="w-7 h-7" animated />
        </span>
      </button>

      {isOpen && (
        <div className="fixed bottom-32 md:bottom-20 right-4 z-50 w-[92vw] max-w-md rounded-xl bg-white shadow-2xl border border-honeyGold/35 overflow-hidden flex flex-col max-h-[70vh]">
          {/* Header */}
          <div className="bg-emeraldDeep text-creamBase px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-white/15 border border-white/25 flex items-center justify-center text-[#FDF3D0]">
                <BeeIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-white">
                  مستشار مناحل آمنة الذكي
                </div>
                <div className="text-[11px] text-[#FDF3D0]">
                  يجيب عن الأنواع، الأسعار، التوصيل والتحويل
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="إغلاق المحادثة"
              className="p-1.5 rounded-lg hover:bg-white/10 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Store FAQ Buttons */}
          <div className="px-3.5 py-2 bg-creamBase border-b border-emeraldDeep/10 flex gap-1.5 overflow-x-auto text-[11px]">
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => handleQuickFaq(q)}
                className="px-2.5 py-1 rounded-full bg-white border border-honeyGold/30 text-emeraldDeep font-bold shrink-0 hover:bg-honeyGold/10 cursor-pointer whitespace-nowrap"
              >
                {q === 'ما هي أنواع العسل وأسعارها؟'
                  ? 'الأنواع والأسعار'
                  : q === 'كيف التوصيل والدفع داخل وخارج المدينة؟'
                  ? 'التوصيل والدفع'
                  : 'بيانات التحويل'}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 text-sm bg-creamBase/50"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === 'user' ? 'justify-start' : 'justify-end'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-emeraldDeep text-white rounded-br-none'
                      : msg.isError
                      ? 'bg-amber-50 text-amber-950 border border-amber-300 rounded-bl-none'
                      : 'bg-white text-inkDark border border-emeraldDeep/10 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-end">
                <div className="rounded-2xl px-3.5 py-2.5 bg-white border border-emeraldDeep/10 text-xs text-inkMuted inline-flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-honeyGold" />
                  <span>جاري كتابة الرد...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-white border-t border-emeraldDeep/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اكتب سؤالك هنا..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-creamBase border border-emeraldDeep/15 text-sm focus:outline-none focus:border-honeyGold"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="إرسال"
              className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg bg-emeraldDeep text-white hover:bg-emeraldSoft transition cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
