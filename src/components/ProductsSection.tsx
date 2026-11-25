import { ChevronDown, MessageCircle, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import {
  WEIGHT_LABELS,
  WEIGHT_ORDER,
  buildWhatsappUrl,
} from '../data/defaultStore';
import type { Product, WeightKey } from '../types';
import { ResilientImage } from './ResilientImage';

interface ProductsSectionProps {
  products: Product[];
  whatsapp: string;
  selectedWeights: Record<string, WeightKey>;
  onSelectWeight: (productId: string, weight: WeightKey) => void;
  onAddToCart: (productId: string) => void;
}

export function ProductsSection({
  products,
  whatsapp,
  selectedWeights,
  onSelectWeight,
  onAddToCart,
}: ProductsSectionProps) {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleDetails = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="products"
      className="py-16 sm:py-24 border-b border-[#F3D598]/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <p className="text-xs sm:text-sm font-bold text-[#F7D78C]">
            منتجات مناحل آمنة عبد الكريم
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#FFF9F2] drop-shadow-xs">
            تشكيلة عسلنا الطبيعي — اختر نوعك المفضل
          </h2>
          <p className="text-sm sm:text-base text-[#F7E8D6] leading-relaxed">
            ثلاثة أصناف أصيلة بأسعار واضحة وموحدة، ومعبأة بعناية لتحفظ القوام واللون
            والنكهة الطبيعية.
          </p>
        </div>

        {/* 3 Uniform Side-by-Side Frosted Glass Product Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {products.map((prod) => {
            const currentWeight: WeightKey = selectedWeights[prod.id] || 'kilo';
            const currentPrice = prod.prices[currentWeight] ?? 400;
            const weightLabel = WEIGHT_LABELS[currentWeight];
            const directWhatsappUrl = buildWhatsappUrl(
              whatsapp,
              `السلام عليكم، أود طلب ${prod.name} - ${weightLabel} بسعر ${currentPrice} ريال`
            );
            const isExpanded = Boolean(expandedIds[prod.id]);

            return (
              <article
                key={prod.id}
                className="rounded-2xl glass-enchanted overflow-hidden flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div>
                  {/* Uniform 4:3 Studio Product Image */}
                  <div className="aspect-[4/3] overflow-hidden bg-transparent border-b border-[#F7D78C]/25">
                    <ResilientImage
                      src={prod.image}
                      alt={prod.imageAlt || prod.name}
                      fallbackTitle={prod.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Title, Description & Specs */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2 text-xs font-bold">
                        <span className="text-[#F7D78C]">{prod.subtitle}</span>
                        <span
                          className={
                            prod.available ? 'text-emerald-300' : 'text-red-300'
                          }
                        >
                          {prod.available ? 'متوفر' : 'غير متوفر'}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl font-extrabold text-[#FFF9F2]">
                        {prod.name}
                      </h3>
                      <p className="text-sm text-[#F7E8D6] leading-relaxed">
                        {prod.description}
                      </p>
                    </div>

                    {/* Unified Pricing Table / Weight Selector */}
                    <div className="space-y-2">
                      <span className="block text-xs font-bold text-[#FFF9F2]">
                        جدول الأسعار واختيار الوزن:
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        {WEIGHT_ORDER.map((wKey) => {
                          const active = currentWeight === wKey;
                          return (
                            <button
                              key={wKey}
                              type="button"
                              onClick={() => onSelectWeight(prod.id, wKey)}
                              className={`min-h-[52px] py-2 px-2 rounded-xl border text-xs font-bold transition cursor-pointer tabular-nums ${
                                active
                                  ? 'bg-[#B87B24] text-white border-[#F7D78C] shadow-sm'
                                  : 'bg-[#241217]/55 text-[#FFF9F2] border-[#F7D78C]/30 hover:border-[#F7D78C]'
                              }`}
                            >
                              <div className="whitespace-nowrap">{WEIGHT_LABELS[wKey]}</div>
                              <div
                                className={`text-[11px] mt-0.5 ${
                                  active ? 'text-[#FFF8EE]' : 'text-[#F7D78C]'
                                }`}
                              >
                                {prod.prices[wKey]} ر.س
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Expandable Tasting & Usage Specifications */}
                    {prod.details && (
                      <div className="border-t border-[#F7D78C]/25 pt-3">
                        <button
                          type="button"
                          aria-expanded={isExpanded}
                          onClick={() => toggleDetails(prod.id)}
                          className="w-full flex items-center justify-between text-xs font-bold text-[#F7D78C] hover:text-[#FFF9F2] transition cursor-pointer py-1"
                        >
                          <span>المذاق واللون والفوائد والاستخدام</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isExpanded && (
                          <dl className="mt-2.5 space-y-2 text-xs text-[#F7E8D6] glass-enchanted-soft rounded-xl p-3.5">
                            <div>
                              <dt className="font-bold text-[#FFF9F2] inline">
                                المذاق:{' '}
                              </dt>
                              <dd className="inline">{prod.details.taste}</dd>
                            </div>
                            <div>
                              <dt className="font-bold text-[#FFF9F2] inline">
                                اللون:{' '}
                              </dt>
                              <dd className="inline">{prod.details.color}</dd>
                            </div>
                            <div>
                              <dt className="font-bold text-[#FFF9F2] inline">
                                الفوائد:{' '}
                              </dt>
                              <dd className="inline">{prod.details.benefits}</dd>
                            </div>
                            <div>
                              <dt className="font-bold text-[#FFF9F2] inline">
                                الموسم:{' '}
                              </dt>
                              <dd className="inline">{prod.details.season}</dd>
                            </div>
                            <div>
                              <dt className="font-bold text-[#FFF9F2] inline">
                                الاستخدام والتخزين:{' '}
                              </dt>
                              <dd className="inline">
                                {prod.details.usageAndStorage}
                              </dd>
                            </div>
                          </dl>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Footer: Price + Add to Cart + Direct WhatsApp Order */}
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-4 space-y-3 border-t border-[#F7D78C]/25 bg-[#241217]/45">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="block text-[11px] text-[#F7E8D6]/85">
                        السعر المختار
                      </span>
                      <span className="tabular-nums text-2xl font-extrabold text-[#F7D78C]">
                        {currentPrice}{' '}
                        <span className="text-xs font-bold text-[#FFF9F2]">ريال</span>
                      </span>
                    </div>

                    <button
                      type="button"
                      disabled={!prod.available}
                      onClick={() => onAddToCart(prod.id)}
                      className={`min-h-[44px] px-4 py-2 rounded-xl font-bold text-xs sm:text-sm inline-flex items-center gap-1.5 transition whitespace-nowrap ${
                        prod.available
                          ? 'bg-[#3B2028]/75 border border-[#F7D78C]/45 text-[#FFF9F2] hover:border-[#F7D78C] cursor-pointer'
                          : 'bg-white/10 text-white/40 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4 shrink-0" />
                      <span>{prod.available ? 'إضافة للسلة' : 'غير متوفر'}</span>
                    </button>
                  </div>

                  {prod.available ? (
                    <a
                      href={directWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full min-h-[46px] px-5 py-2.5 rounded-xl btn-honey-glow text-white font-display font-bold text-sm inline-flex items-center justify-center gap-2 transition whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" />
                      <span>اطلب عبر واتساب الآن</span>
                    </a>
                  ) : (
                    <span className="w-full min-h-[46px] px-5 py-2.5 rounded-xl bg-white/10 text-white/50 font-bold text-sm inline-flex items-center justify-center">
                      غير متوفر للطلب حالياً
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
