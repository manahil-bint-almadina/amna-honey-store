import { ChevronDown, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import {
  FAQ_HONEY_IMAGE,
  FAQ_ITEMS,
  buildWhatsappUrl,
  formatDisplayPhone,
} from '../data/defaultStore';
import { ResilientImage } from './ResilientImage';

interface FaqSectionProps {
  whatsapp: string;
}

export function FaqSection({ whatsapp }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  const quickChatUrl = buildWhatsappUrl(
    whatsapp,
    'السلام عليكم، لدي استفسار حول عسل مناحل آمنة عبد الكريم.'
  );

  return (
    <section
      id="faq"
      className="py-16 sm:py-24 border-b border-[#F3D598]/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Visual + Quick WhatsApp Card */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5">
            <div className="rounded-2xl overflow-hidden glass-enchanted flex-1 min-h-[260px]">
              <ResilientImage
                src={FAQ_HONEY_IMAGE}
                alt="عسل طبيعي صافي من مناحل آمنة عبد الكريم بالمدينة المنورة"
                fallbackTitle="نقاء وجودة طبيعية"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="rounded-2xl glass-enchanted p-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-honeyGold">
                  تواصل مباشر عبر واتساب
                </p>
                <p
                  dir="ltr"
                  className="text-lg font-extrabold text-inkDark tabular-nums mt-0.5"
                >
                  {formatDisplayPhone(whatsapp)}
                </p>
              </div>
              <a
                href={quickChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] px-4 py-2 rounded-xl btn-honey-glow text-white text-xs sm:text-sm font-display font-bold inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>اسألنا الآن</span>
              </a>
            </div>
          </div>

          {/* 3 Main FAQ Questions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-bold text-[#F7D78C]">
                الأسئلة الشائعة
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#FFF9F2] drop-shadow-xs">
                إجابات بين يديك قبل الطلب
              </h2>
              <p className="text-sm sm:text-base text-[#F7E8D6]">
                إجابات واضحة حول نقاء العسل، التوصيل والدفع، وسياسة الاسترجاع والاسترداد.
              </p>
            </div>

            <div className="space-y-3">
              {FAQ_ITEMS.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div
                    key={item.id}
                    className="rounded-2xl glass-enchanted overflow-hidden"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => handleToggle(item.id)}
                      className="w-full min-h-[56px] px-5 py-4 flex items-center justify-between gap-4 text-right font-display font-bold text-sm sm:text-base text-inkDark hover:bg-[#FFFDF9]/50 transition cursor-pointer"
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-honeyGold shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-2 text-sm text-inkMuted leading-relaxed border-t border-[#DFB27D]/40">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
