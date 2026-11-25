import { ArrowLeft, Check, MessageCircle } from 'lucide-react';
import {
  CLEANED_APIARY_LOGO,
  buildWhatsappUrl,
} from '../data/defaultStore';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  whatsapp: string;
}

export function HeroSection({ whatsapp }: HeroSectionProps) {
  const orderWhatsappUrl = buildWhatsappUrl(
    whatsapp,
    'السلام عليكم، أود الطلب من مناحل آمنة عبد الكريم بالمدينة المنورة.'
  );

  return (
    <section
      id="story"
      className="hero relative w-full overflow-hidden bg-transparent border-b border-[#F3D598]/25"
    >
      {/* Transparent Hero sitting directly over the fixed animated palace & flower backdrop */}
      <div className="relative min-h-0 lg:min-h-[560px] flex items-center bg-gradient-to-b from-[#2E181F]/35 via-transparent to-[#2E181F]/30">
        <div className="hero-container relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Hero Headline & Primary CTAs */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center sm:text-right rounded-2xl bg-[#2E181F]/40 backdrop-blur-[3px] p-4 sm:p-6 border border-[#F7D78C]/20">
              <p className="text-[14px] sm:text-base font-bold text-[#F7D78C] drop-shadow-xs max-w-full">
                مناحل آمنة عبد الكريم — المدينة المنورة — عسل طبيعي 100%
              </p>

              <h1 className="font-display text-[24px] leading-[1.35] sm:text-5xl lg:text-[3.15rem] font-extrabold text-[#FFF9F2] sm:leading-[1.24] drop-shadow-sm break-words">
                أمانة اليد، وصفاء الطبيعة في كل قطرة عسل
              </h1>

              <p className="text-[14px] sm:text-lg text-[#F9EFE3] leading-relaxed max-w-full sm:max-w-xl">
                عسل سدرة بلدي، وعسل طلح أصلي، وعسل سمرة طبيعي من مناحلنا الميدانية في
                المدينة المنورة بإشراف مباشر وترخيص معتمد من وزارة البيئة والمياه والزراعة.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-1">
                <a
                  href={orderWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] sm:min-h-[48px] px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl btn-honey-glow text-white font-display font-extrabold text-sm sm:text-base transition"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span>اطلب عبر واتساب الآن</span>
                </a>

                <a
                  href="#products"
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] sm:min-h-[48px] px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl glass-enchanted hover:bg-[#FFFDF9] text-inkDark font-display font-bold text-sm sm:text-base transition"
                >
                  <span>استعرض أنواع العسل والأسعار</span>
                  <ArrowLeft className="w-4 h-4 shrink-0" />
                </a>
              </div>

              {/* Concise Bottom Trust Markers */}
              <div className="pt-3 border-t border-[#F7D78C]/25 flex flex-wrap items-center justify-center sm:justify-start gap-x-3 sm:gap-x-4 gap-y-2 text-xs sm:text-sm font-bold text-[#FFF6E8]">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#F7D78C] shrink-0" />
                  <span>طبيعي 100%</span>
                </span>
                <span aria-hidden="true" className="text-white/40">
                  ·
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#F7D78C] shrink-0" />
                  <span>مرخص رسمياً</span>
                </span>
                <span aria-hidden="true" className="text-white/40">
                  ·
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#F7D78C] shrink-0" />
                  <span>استرداد مبلغ مضمون</span>
                </span>
              </div>
            </div>

            {/* Compact Cleaned Brand Emblem Showcase Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="glass-enchanted rounded-2xl p-3 sm:p-5 max-w-[210px] sm:max-w-[340px] w-full text-center space-y-2.5">
                <div className="aspect-square rounded-xl overflow-hidden bg-[#FFF9F0] border border-[#EBC28E]/70 shadow-sm">
                  <ResilientImage
                    src={CLEANED_APIARY_LOGO}
                    alt="الشعار الرسمي النظيف لمناحل بنت المدينة للعسل الطبيعي - نحالة سعودية"
                    fallbackTitle="مناحل بنت المدينة للعسل الطبيعي"
                    loading="eager"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="font-display text-xs sm:text-sm font-bold text-emeraldDeep">
                  مناحل بنت المدينة للعسل الطبيعي · المدينة المنورة
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
