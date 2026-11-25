import { Check, Copy, Landmark, Truck, Zap } from 'lucide-react';
import { useState } from 'react';
import { BENEFICIARY_NAME, DEFAULT_IBAN } from '../data/defaultStore';

interface DeliverySectionProps {
  onShowToast: (msg: string) => void;
}

export function DeliverySection({ onShowToast }: DeliverySectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyIban = async () => {
    try {
      await navigator.clipboard.writeText(DEFAULT_IBAN.replace(/\s+/g, ''));
      setCopied(true);
      onShowToast('تم نسخ رقم الآيبان بنجاح');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      onShowToast('تعذر النسخ التلقائي، يمكنك تحديد الآيبان ونسخه يدوياً');
    }
  };

  return (
    <section
      id="delivery-info"
      className="py-16 sm:py-24 border-b border-[#F3D598]/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <p className="text-xs sm:text-sm font-bold text-[#F7D78C]">
            التواصل والدفع والتوصيل
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#FFF9F2] drop-shadow-xs">
            تواصل معنا — طلبك يصل أينما كنت
          </h2>
          <p className="text-sm sm:text-base text-[#F7E8D6]">
            توصيل فوري داخل المدينة المنورة، وشحن منظم لكافة مناطق المملكة.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {/* Inside Madinah */}
          <div className="rounded-2xl glass-enchanted p-6 space-y-3">
            <div className="w-11 h-11 rounded-xl bg-[#FCEBD6] border border-[#E5B87B]/60 flex items-center justify-center text-honeyGold">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-inkDark">
              التوصيل داخل المدينة المنورة
            </h3>
            <p className="text-sm text-inkMuted leading-relaxed">
              التوصيل <strong className="text-inkDark">فوري</strong> مع احتساب رسوم
              التوصيل حسب الموقع المرسل (ويمكنك تحديد موقعك عبر GPS داخل السلة).
            </p>
            <p className="text-xs font-bold text-emeraldDeep pt-1">
              ✓ يتوفر الدفع عند الاستلام أو التحويل البنكي.
            </p>
          </div>

          {/* Outside Madinah */}
          <div className="rounded-2xl glass-enchanted p-6 space-y-3">
            <div className="w-11 h-11 rounded-xl bg-[#FCEBD6] border border-[#E5B87B]/60 flex items-center justify-center text-honeyGold">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-inkDark">
              التوصيل خارج المدينة المنورة
            </h3>
            <p className="text-sm text-inkMuted leading-relaxed">
              الشحن متاح إلى مختلف مناطق المملكة وتُحدد آليته وتكلفته حسب المنطقة
              والوزن.
            </p>
            <p className="text-xs font-bold text-inkDark pt-1">
              ✕ الدفع خارج المدينة بالتحويل البنكي المسبق فقط.
            </p>
          </div>

          {/* Bank Transfer Frame */}
          <div className="rounded-2xl glass-enchanted border-2 border-[#D49D42]/75 p-6 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-honeyGold">
                مصرف الراجحي
              </span>
              <Landmark className="w-5 h-5 text-honeyGold" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-inkDark">
              بيانات التحويل البنكي
            </h3>
            <div className="text-sm space-y-2">
              <div>
                <span className="text-inkMuted">الاسم للتحويل:</span>{' '}
                <strong className="text-inkDark">{BENEFICIARY_NAME}</strong>
              </div>
              <div className="bg-[#FFFDF9]/90 p-2.5 rounded-xl border border-[#DFB27D]/55 flex items-center justify-between gap-2">
                <code
                  dir="ltr"
                  className="text-xs font-bold text-inkDark select-all tabular-nums"
                >
                  {DEFAULT_IBAN}
                </code>
                <button
                  type="button"
                  onClick={handleCopyIban}
                  className="min-h-[34px] px-3 py-1 rounded-lg bg-emeraldDeep text-white text-xs font-bold hover:bg-emeraldSoft transition cursor-pointer shrink-0 inline-flex items-center gap-1.5"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copied ? 'تم النسخ' : 'نسخ الآيبان'}</span>
                </button>
              </div>
            </div>
            <p className="text-xs text-inkMuted leading-relaxed">
              لتأكيد الطلب يرجى تحويل مبلغ الطلب وإرسال صورة الإيصال عبر الواتساب.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
