import { Copy, MessageCircle, Send } from 'lucide-react';
import { FormEvent, useMemo, useState } from 'react';
import {
  WEIGHT_LABELS,
  WEIGHT_ORDER,
  buildWhatsappUrl,
  deduplicateProducts,
} from '../data/defaultStore';
import type { Product, WeightKey } from '../types';

interface QuickOrderSectionProps {
  products: Product[];
  whatsapp: string;
  onShowToast: (msg: string) => void;
}

export function QuickOrderSection({
  products,
  whatsapp,
  onShowToast,
}: QuickOrderSectionProps) {
  const uniqueProducts = useMemo(() => deduplicateProducts(products), [products]);
  const availableProducts = useMemo(
    () => uniqueProducts.filter((p) => p.available),
    [uniqueProducts]
  );

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<string>(
    availableProducts[0]?.id || uniqueProducts[0]?.id || 'sidr'
  );
  const [selectedWeight, setSelectedWeight] = useState<WeightKey>('kilo');
  const [notes, setNotes] = useState('');

  const selectedProduct = useMemo(
    () =>
      uniqueProducts.find((p) => p.id === selectedProductId) ||
      availableProducts[0] ||
      uniqueProducts[0],
    [availableProducts, selectedProductId, uniqueProducts]
  );

  const unitPrice = selectedProduct?.prices[selectedWeight] ?? 400;

  const formattedMessage = useMemo(() => {
    const productName = selectedProduct?.name || 'عسل بلدي';
    const weightLabel = WEIGHT_LABELS[selectedWeight];
    const lines = [
      `السلام عليكم، أود طلب ${productName} - ${weightLabel} بسعر ${unitPrice} ريال`,
      '',
    ];
    if (customerName.trim()) lines.push(`• الاسم: ${customerName.trim()}`);
    if (customerPhone.trim()) lines.push(`• رقم الجوال: ${customerPhone.trim()}`);
    if (customerAddress.trim()) lines.push(`• العنوان: ${customerAddress.trim()}`);
    if (notes.trim()) lines.push(`• ملاحظات: ${notes.trim()}`);
    return lines.join('\n');
  }, [
    customerAddress,
    customerName,
    customerPhone,
    notes,
    selectedProduct,
    selectedWeight,
    unitPrice,
  ]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      onShowToast('يرجى إدخال الاسم ورقم الجوال والعنوان لإرسال الطلب');
      return;
    }
    const url = buildWhatsappUrl(whatsapp, formattedMessage);
    window.location.assign(url);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedMessage);
      onShowToast('تم نسخ رسالة الطلب؛ يمكنك لصقها في واتساب');
    } catch {
      onShowToast('تعذر النسخ التلقائي');
    }
  };

  return (
    <section
      id="quick-order"
      className="py-14 sm:py-20 border-b border-[#F3D598]/20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <p className="text-xs sm:text-sm font-bold text-[#F7D78C]">
            الطلب المباشر عبر واتساب
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#FFF9F2] drop-shadow-xs">
            نموذج الطلب السريع
          </h2>
          <p className="text-sm text-[#F7E8D6]">
            املأ الحقول التالية لتجهيز طلبك وإرساله مباشرة إلى واتساب المنحل دون تسجيل.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl glass-enchanted p-6 sm:p-8 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="quick-name"
                className="block text-xs sm:text-sm font-bold text-[#FFF9F2] mb-1.5"
              >
                الاسم
              </label>
              <input
                id="quick-name"
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="اكتب اسمك الكريم"
                className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-[#241217]/65 border border-[#F7D78C]/35 text-[#FFF9F2] placeholder:text-[#F7E8D6]/55 text-sm focus:outline-none focus:border-[#F7D78C]"
              />
            </div>

            <div>
              <label
                htmlFor="quick-phone"
                className="block text-xs sm:text-sm font-bold text-[#FFF9F2] mb-1.5"
              >
                رقم الجوال
              </label>
              <input
                id="quick-phone"
                type="tel"
                dir="ltr"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="05XXXXXXXX"
                className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-[#241217]/65 border border-[#F7D78C]/35 text-[#FFF9F2] placeholder:text-[#F7E8D6]/55 text-sm text-left tabular-nums focus:outline-none focus:border-[#F7D78C]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="quick-address"
              className="block text-xs sm:text-sm font-bold text-[#FFF9F2] mb-1.5"
            >
              العنوان (المدينة والحي)
            </label>
            <input
              id="quick-address"
              type="text"
              required
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              placeholder="مثال: المدينة المنورة - حي العزيزية"
              className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-[#241217]/65 border border-[#F7D78C]/35 text-[#FFF9F2] placeholder:text-[#F7E8D6]/55 text-sm focus:outline-none focus:border-[#F7D78C]"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="quick-product"
                className="block text-xs sm:text-sm font-bold text-[#FFF9F2] mb-1.5"
              >
                نوع العسل
              </label>
              <select
                id="quick-product"
                value={selectedProduct?.id || 'sidr'}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-[#241217]/80 border border-[#F7D78C]/35 text-sm font-bold text-[#FFF9F2] focus:outline-none focus:border-[#F7D78C]"
              >
                {uniqueProducts.map((prod) => (
                  <option
                    key={prod.id}
                    value={prod.id}
                    disabled={!prod.available}
                    className="bg-[#FFFBF5] text-[#2A1608]"
                  >
                    {prod.name}
                    {!prod.available ? ' (غير متوفر حالياً)' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span className="block text-xs sm:text-sm font-bold text-[#FFF9F2] mb-1.5">
                الوزن المطلوب
              </span>
              <div className="grid grid-cols-3 gap-2">
                {WEIGHT_ORDER.map((wKey) => {
                  const active = selectedWeight === wKey;
                  return (
                    <button
                      key={wKey}
                      type="button"
                      onClick={() => setSelectedWeight(wKey)}
                      className={`min-h-[46px] px-2 py-2 rounded-xl border text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                        active
                          ? 'bg-[#B87B24] text-white border-[#F7D78C]'
                          : 'bg-[#241217]/55 text-[#FFF9F2] border-[#F7D78C]/30 hover:border-[#F7D78C]'
                      }`}
                    >
                      {WEIGHT_LABELS[wKey]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="quick-notes"
              className="block text-xs sm:text-sm font-bold text-[#FFF9F2] mb-1.5"
            >
              ملاحظات إضافية (اختياري)
            </label>
            <textarea
              id="quick-notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="وقت التوصيل المفضل أو أي تفاصيل إضافية..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#241217]/65 border border-[#F7D78C]/35 text-[#FFF9F2] placeholder:text-[#F7E8D6]/55 text-sm focus:outline-none focus:border-[#F7D78C]"
            />
          </div>

          <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#F7D78C]/25">
            <div className="space-y-1">
              <div className="text-sm">
                <span className="text-[#F7E8D6]">الإجمالي المطلوب:</span>{' '}
                <strong className="text-2xl font-extrabold text-[#F7D78C] tabular-nums">
                  {unitPrice} ريال
                </strong>
              </div>
              <p className="text-[11px] text-[#F7E8D6]/85">
                بإرسالك الطلب فأنت توافق على{' '}
                <a
                  href="#/privacy"
                  className="text-[#F7D78C] font-bold underline underline-offset-4 hover:text-[#FFF9F2]"
                >
                  سياسة الخصوصية
                </a>{' '}
                و
                <a
                  href="#/terms"
                  className="text-[#F7D78C] font-bold underline underline-offset-4 hover:text-[#FFF9F2]"
                >
                  شروط الاستخدام
                </a>
                .
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="submit"
                className="flex-1 sm:flex-initial min-h-[48px] px-6 py-3 rounded-xl btn-honey-glow text-white font-display font-bold text-sm inline-flex items-center justify-center gap-2 transition cursor-pointer whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>اطلب عبر واتساب الآن</span>
                <Send className="w-4 h-4 shrink-0" />
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="min-h-[48px] px-4 py-3 rounded-xl bg-[#3B2028]/75 border border-[#F7D78C]/45 text-[#FFF9F2] font-bold text-xs sm:text-sm hover:border-[#F7D78C] transition cursor-pointer inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <Copy className="w-4 h-4 shrink-0" />
                <span>نسخ الطلب</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
