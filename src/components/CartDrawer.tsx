import {
  Check,
  Copy,
  MapPin,
  Send,
  ShoppingBag,
  UserCheck,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import {
  BENEFICIARY_NAME,
  DEFAULT_IBAN,
  buildWhatsappUrl,
} from '../data/defaultStore';
import type {
  CartItem,
  DeliveryZone,
  GpsCoords,
  PaymentMethod,
} from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  whatsapp: string;
  onChangeQty: (index: number, delta: number) => void;
  onShowToast: (msg: string) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  cart,
  whatsapp,
  onChangeQty,
  onShowToast,
}: CartDrawerProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [deliveryZone, setDeliveryZone] = useState<DeliveryZone>('inside');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    'الدفع عند الاستلام (داخل المدينة المنورة)'
  );
  const [gpsCoords, setGpsCoords] = useState<GpsCoords | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [copiedIban, setCopiedIban] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const totalPrice = useMemo(
    () => cart.reduce((acc, item) => acc + item.unitPrice * item.qty, 0),
    [cart]
  );

  const handleSelectZone = (zone: DeliveryZone) => {
    setDeliveryZone(zone);
    if (zone === 'outside') {
      setPaymentMethod('تحويل بنكي (مصرف الراجحي)');
    }
  };

  const handleDetectGps = () => {
    if (!navigator.geolocation) {
      onShowToast('المتصفح لا يدعم GPS، يمكنك كتابة العنوان يدوياً');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        const url = `https://maps.google.com/?q=${lat},${lng}`;
        setGpsCoords({ lat, lng, url });
        if (!customerAddress.trim()) {
          setCustomerAddress(`موقع GPS (${lat}, ${lng})`);
        }
        setIsLocating(false);
        onShowToast('تم تحديد موقعك الجغرافي بنجاح');
      },
      () => {
        setIsLocating(false);
        onShowToast('تعذر الوصول للموقع، يمكنك كتابة الحي والعنوان يدوياً');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleCopyIban = async () => {
    try {
      await navigator.clipboard.writeText(DEFAULT_IBAN.replace(/\s+/g, ''));
      setCopiedIban(true);
      onShowToast('تم نسخ رقم الآيبان بنجاح');
      setTimeout(() => setCopiedIban(false), 2000);
    } catch {
      onShowToast('تعذر النسخ التلقائي، يمكنك تحديد الآيبان ونسخه يدوياً');
    }
  };

  const orderMessage = useMemo(() => {
    const zoneLabel =
      deliveryZone === 'inside'
        ? 'داخل المدينة المنورة (توصيل فوري)'
        : 'خارج المدينة المنورة (حسب المنطقة)';

    const lines: string[] = [
      'السلام عليكم أستاذة آمنة عبد الكريم، أرغب بتأكيد طلب العسل التالي:',
      '',
    ];

    if (customerName.trim()) lines.push(`• الاسم: ${customerName.trim()}`);
    lines.push(`• نطاق التوصيل: ${zoneLabel}`);
    if (customerAddress.trim()) {
      lines.push(`• العنوان / الحي: ${customerAddress.trim()}`);
    }
    if (gpsCoords?.url) {
      lines.push(`• موقع GPS على الخريطة: ${gpsCoords.url}`);
    }
    lines.push(`• طريقة الدفع: ${paymentMethod}`);
    lines.push('');
    lines.push('الطلبات المطلوبة:');

    cart.forEach((item, i) => {
      lines.push(
        `${i + 1}) ${item.name} — ${item.weightLabel} × ${item.qty} = ${
          item.unitPrice * item.qty
        } ريال`
      );
    });

    lines.push('');
    lines.push(`الإجمالي (قبل التوصيل): ${totalPrice} ريال`);
    lines.push('');
    lines.push(
      'ملاحظة: لتأكيد الطلب يرجى إرسال الإيصال في حال التحويل البنكي، أو تأكيد الموقع للتوصيل الفوري.'
    );

    return lines.join('\n');
  }, [cart, customerAddress, customerName, deliveryZone, gpsCoords, paymentMethod, totalPrice]);

  const whatsappOrderUrl = useMemo(
    () => buildWhatsappUrl(whatsapp, orderMessage),
    [orderMessage, whatsapp]
  );

  const handleCopyOrderSummary = async () => {
    if (cart.length === 0) {
      onShowToast('أضف صنفاً واحداً على الأقل إلى السلة أولاً');
      return;
    }
    try {
      await navigator.clipboard.writeText(orderMessage);
      onShowToast('تم نسخ تفاصيل الطلب بنجاح');
    } catch {
      onShowToast('تعذر نسخ الطلب تلقائياً');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label="سلة الطلبات"
    >
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/55 backdrop-blur-xs transition-opacity"
      />
      <div className="fixed inset-y-0 left-0 max-w-lg w-full bg-creamBase shadow-2xl flex flex-col z-10 border-r border-honeyGold/30">
        {/* Header */}
        <div className="p-5 bg-emeraldDeep text-creamBase flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#FDF3D0]" />
            <h3 className="font-display text-2xl font-bold text-white">سلة الطلبات</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق السلة"
            className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Items List */}
          {cart.length === 0 ? (
            <div className="text-center py-8 px-4 bg-white rounded-2xl border border-dashed border-honeyGold/40 space-y-2">
              <ShoppingBag className="w-8 h-8 text-honeyGold mx-auto" />
              <p className="text-sm font-bold text-emeraldDeep">السلة فارغة حالياً</p>
              <p className="text-xs text-inkMuted">
                اختر نوع العسل والوزن المناسب لإضافته إلى طلبك.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item, idx) => (
                <div
                  key={item.key}
                  className="bg-white rounded-2xl p-3.5 border border-emeraldDeep/10 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="text-sm font-extrabold text-emeraldDeep">
                      {item.name}
                    </div>
                    <div className="text-xs text-inkMuted tabular-nums">
                      {item.weightLabel} · {item.unitPrice} ريال للعبوة
                    </div>
                    <div className="text-xs font-bold text-honeyGold mt-0.5 tabular-nums">
                      المجموع: {item.unitPrice * item.qty} ريال
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onChangeQty(idx, -1)}
                      aria-label={`تقليل كمية ${item.name}`}
                      className="w-8 h-8 rounded-lg bg-creamBase border border-emeraldDeep/15 font-bold text-emeraldDeep cursor-pointer hover:border-honeyGold"
                    >
                      -
                    </button>
                    <span className="w-7 text-center text-xs font-extrabold tabular-nums">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => onChangeQty(idx, 1)}
                      aria-label={`زيادة كمية ${item.name}`}
                      className="w-8 h-8 rounded-lg bg-emeraldDeep text-white font-bold cursor-pointer hover:bg-emeraldSoft"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Customer & Delivery Form */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-emeraldDeep/10 space-y-4">
            <h4 className="font-bold text-emeraldDeep text-sm flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-honeyGold" />
              <span>بيانات العميل والتوصيل</span>
            </h4>

            <div>
              <label
                htmlFor="customerName"
                className="block text-xs font-bold text-inkDark mb-1"
              >
                الاسم الكامل
              </label>
              <input
                id="customerName"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="اكتب اسمك الكريم"
                className="w-full px-3.5 py-2.5 rounded-xl bg-creamBase border border-emeraldDeep/15 text-sm focus:outline-none focus:border-honeyGold"
              />
            </div>

            {/* Location Zone */}
            <div>
              <span className="block text-xs font-bold text-inkDark mb-1.5">
                موقع التوصيل
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleSelectZone('inside')}
                  className={`p-3 rounded-xl border-2 text-right transition cursor-pointer ${
                    deliveryZone === 'inside'
                      ? 'border-emeraldDeep bg-emeraldDeep/5'
                      : 'border-emeraldDeep/15 bg-white hover:border-honeyGold'
                  }`}
                >
                  <div className="text-xs font-extrabold text-emeraldDeep">
                    داخل المدينة المنورة
                  </div>
                  <div className="text-[11px] text-inkMuted mt-0.5">
                    توصيل فوري · دفع عند الاستلام
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectZone('outside')}
                  className={`p-3 rounded-xl border-2 text-right transition cursor-pointer ${
                    deliveryZone === 'outside'
                      ? 'border-emeraldDeep bg-emeraldDeep/5'
                      : 'border-emeraldDeep/15 bg-white hover:border-honeyGold'
                  }`}
                >
                  <div className="text-xs font-extrabold text-emeraldDeep">
                    خارج المدينة المنورة
                  </div>
                  <div className="text-[11px] text-inkMuted mt-0.5">
                    حسب المنطقة · تحويل مسبق
                  </div>
                </button>
              </div>
              <p className="text-xs text-emeraldDeep bg-amber-50 border border-amber-200 rounded-xl p-2.5 mt-2 leading-relaxed">
                {deliveryZone === 'inside'
                  ? 'التوصيل داخل المدينة المنورة فوري مع رسوم توصيل حسب الموقع المرسل، ويتوفر الدفع عند الاستلام.'
                  : 'التوصيل خارج المدينة المنورة حسب المنطقة، ولا يتم الدفع عند الاستلام خارج المدينة (التحويل البنكي المسبق فقط).'}
              </p>
            </div>

            {/* GPS Location Picker */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="customerAddress"
                  className="text-xs font-bold text-inkDark"
                >
                  العنوان / الحي أو الموقع الجغرافي (GPS)
                </label>
                <button
                  type="button"
                  onClick={handleDetectGps}
                  disabled={isLocating}
                  className="inline-flex items-center gap-1.5 min-h-[34px] px-3 py-1 rounded-lg bg-emeraldDeep text-white text-xs font-bold hover:bg-emeraldSoft transition cursor-pointer disabled:opacity-60 whitespace-nowrap"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>
                    {isLocating
                      ? 'جاري التحديد...'
                      : gpsCoords
                      ? 'تحديث GPS'
                      : 'تحديد موقعي GPS'}
                  </span>
                </button>
              </div>

              <input
                id="customerAddress"
                type="text"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder="مثال: المدينة المنورة - حي العزيزية أو تفاصيل العنوان"
                className="w-full px-3.5 py-2.5 rounded-xl bg-creamBase border border-emeraldDeep/15 text-sm focus:outline-none focus:border-honeyGold"
              />

              {gpsCoords && (
                <div className="text-xs rounded-xl p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between gap-2">
                  <span className="truncate tabular-nums">
                    تم تحديد الموقع ({gpsCoords.lat}, {gpsCoords.lng})
                  </span>
                  <a
                    href={gpsCoords.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-bold shrink-0"
                  >
                    عرض الخريطة
                  </a>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div>
              <span className="block text-xs font-bold text-inkDark mb-1.5">
                طريقة الدفع
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                <label
                  className={`flex items-center gap-2 p-3 rounded-xl border border-emeraldDeep/20 bg-creamBase text-xs font-bold ${
                    deliveryZone === 'outside'
                      ? 'opacity-45 cursor-not-allowed'
                      : 'cursor-pointer'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="الدفع عند الاستلام (داخل المدينة المنورة)"
                    checked={
                      paymentMethod ===
                      'الدفع عند الاستلام (داخل المدينة المنورة)'
                    }
                    disabled={deliveryZone === 'outside'}
                    onChange={() =>
                      setPaymentMethod('الدفع عند الاستلام (داخل المدينة المنورة)')
                    }
                    className="accent-emeraldDeep"
                  />
                  <span>الدفع عند الاستلام</span>
                </label>
                <label className="flex items-center gap-2 p-3 rounded-xl border border-emeraldDeep/20 bg-creamBase cursor-pointer text-xs font-bold">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="تحويل بنكي (مصرف الراجحي)"
                    checked={paymentMethod === 'تحويل بنكي (مصرف الراجحي)'}
                    onChange={() => setPaymentMethod('تحويل بنكي (مصرف الراجحي)')}
                    className="accent-emeraldDeep"
                  />
                  <span>تحويل بنكي</span>
                </label>
              </div>
            </div>

            {/* Bank Details Box */}
            <div className="rounded-2xl bg-emeraldDeep/5 border border-honeyGold/30 p-3.5 space-y-2 text-xs">
              <div className="font-extrabold text-emeraldDeep flex items-center justify-between gap-2">
                <span>تحويل بنكي — مصرف الراجحي</span>
                <button
                  type="button"
                  onClick={handleCopyIban}
                  className="px-2.5 py-1 rounded-lg bg-emeraldDeep text-white font-bold cursor-pointer inline-flex items-center gap-1"
                >
                  {copiedIban ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span>{copiedIban ? 'تم النسخ' : 'نسخ الآيبان'}</span>
                </button>
              </div>
              <div className="text-inkDark">
                الاسم للتحويل: <strong>{BENEFICIARY_NAME}</strong>
              </div>
              <div
                dir="ltr"
                className="font-mono font-bold text-emeraldDeep bg-white px-2.5 py-1.5 rounded-lg border border-honeyGold/20 select-all tabular-nums text-left"
              >
                {DEFAULT_IBAN}
              </div>
              <p className="text-[11px] text-inkMuted leading-relaxed">
                لتأكيد الطلب يرجى ترك رسالة أو تحويل مبلغ العسل المطلوب وإرسال الإيصال
                والطلبات التي تودها عبر الواتساب.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Total & WhatsApp Submit */}
        <div className="p-5 bg-white border-t border-emeraldDeep/10 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-inkMuted font-semibold">
              إجمالي قيمة العسل (قبل التوصيل):
            </span>
            <span className="tabular-nums text-2xl font-extrabold text-emeraldDeep">
              {totalPrice} ريال
            </span>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 ? (
              <a
                href={whatsappOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-h-[48px] py-3 px-4 rounded-2xl bg-[#128C7E] hover:bg-[#0e7468] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition"
              >
                <Send className="w-4 h-4 shrink-0" />
                <span>إرسال وتأكيد الطلب عبر واتساب</span>
              </a>
            ) : (
              <button
                type="button"
                onClick={() =>
                  onShowToast('أضف صنفاً واحداً على الأقل إلى السلة أولاً')
                }
                className="flex-1 min-h-[48px] py-3 px-4 rounded-2xl bg-gray-200 text-gray-500 font-extrabold text-sm flex items-center justify-center gap-2 cursor-not-allowed"
              >
                <Send className="w-4 h-4 shrink-0" />
                <span>إرسال وتأكيد الطلب عبر واتساب</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleCopyOrderSummary}
              title="نسخ نص الطلب"
              aria-label="نسخ نص الطلب"
              className="min-h-[48px] px-3.5 rounded-2xl bg-creamBase border border-emeraldDeep/15 text-emeraldDeep font-bold text-xs hover:border-honeyGold transition cursor-pointer inline-flex items-center gap-1.5 shrink-0"
            >
              <Copy className="w-4 h-4" />
              <span>نسخ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
