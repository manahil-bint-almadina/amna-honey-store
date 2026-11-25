import { ArrowRight, FileText, Shield } from 'lucide-react';

interface LegalPageProps {
  mode: 'privacy' | 'terms';
  onBackHome: () => void;
  onSwitchMode: (nextMode: 'privacy' | 'terms') => void;
}

export function LegalPage({ mode, onBackHome, onSwitchMode }: LegalPageProps) {
  const isPrivacy = mode === 'privacy';

  return (
    <section className="py-12 sm:py-20 min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Breadcrumb & Page Switch */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F3D598]/25 pb-5">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2 rounded-xl glass-enchanted text-sm font-bold text-inkDark hover:border-honeyGold transition cursor-pointer whitespace-nowrap"
          >
            <ArrowRight className="w-4 h-4 shrink-0" />
            <span>العودة إلى الرئيسية</span>
          </button>

          <div className="inline-flex items-center gap-2">
            <a
              href="#/privacy"
              onClick={(e) => {
                e.preventDefault();
                onSwitchMode('privacy');
              }}
              className={`min-h-[40px] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 transition whitespace-nowrap ${
                isPrivacy
                  ? 'btn-honey-glow text-white'
                  : 'glass-enchanted text-inkDark hover:border-honeyGold'
              }`}
            >
              <Shield className="w-4 h-4 shrink-0" />
              <span>سياسة الخصوصية</span>
            </a>

            <a
              href="#/terms"
              onClick={(e) => {
                e.preventDefault();
                onSwitchMode('terms');
              }}
              className={`min-h-[40px] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 transition whitespace-nowrap ${
                !isPrivacy
                  ? 'btn-honey-glow text-white'
                  : 'glass-enchanted text-inkDark hover:border-honeyGold'
              }`}
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span>شروط الاستخدام</span>
            </a>
          </div>
        </div>

        {/* Dedicated Legal Document Container */}
        {isPrivacy ? (
          <article className="rounded-2xl glass-enchanted p-6 sm:p-10 space-y-6">
            <header className="space-y-2 border-b border-emeraldDeep/10 pb-5">
              <p className="text-xs sm:text-sm font-bold text-honeyGold">
                مناحل آمنة عبد الكريم · المدينة المنورة
              </p>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-inkDark">
                سياسة الخصوصية
              </h1>
              <p className="text-xs text-inkMuted">آخر تحديث: 2026</p>
            </header>

            <div className="space-y-5 text-sm sm:text-base text-inkDark leading-relaxed">
              <p>
                تلتزم <strong>مناحل آمنة عبد الكريم</strong> بحماية خصوصية زوار
                وعملاء الموقع الإلكتروني، ونوضح فيما يلي آلية التعامل مع أي معلومات
                تُدخل أثناء التصفح أو عند إرسال الطلبات:
              </p>

              <section className="space-y-2">
                <h2 className="font-display text-xl font-bold text-emeraldDeep">
                  1. البيانات المستخدمة في الطلبات
                </h2>
                <p className="text-inkMuted">
                  يعتمد الموقع على تجهيز نص الطلب محلياً على جهازك لتحويله مباشرة إلى
                  محادثة واتساب الرسمية للمنحل، ولا يقوم بتخزين بياناتك الشخصية أو
                  رقم جوالك في قواعد بيانات خارجية، كما لا يطلب أي بيانات بطاقات
                  بنكية داخل الصفحات.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-display text-xl font-bold text-emeraldDeep">
                  2. الموقع الجغرافي (GPS)
                </h2>
                <p className="text-inkMuted">
                  خدمة تحديد الموقع الجغرافي داخل سلة الطلبات اختيارية بالكامل ولا
                  تعمل إلا بموافقتك الصريحة عند النقر عليها، وتُستخدم حصراً لإرسال
                  موقع التوصيل الدقيق داخل المدينة المنورة عبر واتساب.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-display text-xl font-bold text-emeraldDeep">
                  3. سرية المعلومات وعدم مشاركتها
                </h2>
                <p className="text-inkMuted">
                  تُستخدم بيانات الاسم ورقم الجوال والعنوان لغرض تنفيذ وتوصيل طلبك
                  فقط، ولا يتم بيعها أو مشاركتها مع أي أطراف تسويقية خارجية.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-display text-xl font-bold text-emeraldDeep">
                  4. التخزين المحلي في المتصفح
                </h2>
                <p className="text-inkMuted">
                  يحتفظ المتصفح مؤقتاً باختيارات السلة وإعدادات العرض لضمان سرعة
                  التصفح، ويمكنك مسحها في أي وقت من إعدادات متصفحك.
                </p>
              </section>
            </div>
          </article>
        ) : (
          <article className="rounded-2xl glass-enchanted p-6 sm:p-10 space-y-6">
            <header className="space-y-2 border-b border-emeraldDeep/10 pb-5">
              <p className="text-xs sm:text-sm font-bold text-honeyGold">
                مناحل آمنة عبد الكريم · المدينة المنورة
              </p>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-inkDark">
                شروط الاستخدام
              </h1>
              <p className="text-xs text-inkMuted">آخر تحديث: 2026</p>
            </header>

            <div className="space-y-5 text-sm sm:text-base text-inkDark leading-relaxed">
              <p>
                باستخدامك موقع <strong>مناحل آمنة عبد الكريم</strong> أو إرسال طلب
                عبر واتساب، فإنك توافق على الشروط والأحكام التالية المصاغة بوضوح
                لحفظ حقوق الطرفين:
              </p>

              <section className="space-y-2">
                <h2 className="font-display text-xl font-bold text-emeraldDeep">
                  1. المنتجات والأسعار
                </h2>
                <p className="text-inkMuted">
                  جميع المنتجات المعروضة (عسل سدرة بلدي، عسل طلح بلدي، عسل سمرة
                  بلدي) طبيعية 100% ومن إنتاج مناحل مرخصة من وزارة البيئة والمياه
                  والزراعة. الأسعار المعلنة بالريال السعودي تخص العبوة المختارة ولا
                  تشمل رسوم التوصيل أو الشحن التي تُحدد حسب الموقع.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-display text-xl font-bold text-emeraldDeep">
                  2. آلية الطلب والدفع والتوصيل
                </h2>
                <p className="text-inkMuted">
                  • داخل المدينة المنورة: التوصيل فوري وتتوفر إمكانية الدفع عند
                  الاستلام أو التحويل البنكي.
                  <br />• خارج المدينة المنورة: يتم الشحن عبر الشركات المختصة بعد
                  تأكيد التحويل البنكي المسبق على حساب مصرف الراجحي وإرسال الإيصال
                  عبر واتساب.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-display text-xl font-bold text-emeraldDeep">
                  3. ضمان الجودة والاسترجاع والاسترداد
                </h2>
                <p className="text-inkMuted">
                  نضمن طبيعية العسل وخلوه من أي إضافات بنسبة 100%. في حال عدم رضا
                  العميل أو وجود أي ملاحظة على سلامة المنتج وجودته، يلتزم المنحل
                  باسترجاع الطلب واسترداد كامل المبلغ المدفوع.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-display text-xl font-bold text-emeraldDeep">
                  4. الملكية الفكرية
                </h2>
                <p className="text-inkMuted">
                  جميع النصوص والصور ومقاطع الفيديو المنشورة خاصة بموقع مناحل آمنة
                  عبد الكريم ولا يُسمح بإعادة استخدامها تجارياً دون إذن مسبق.
                </p>
              </section>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
