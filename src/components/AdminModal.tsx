import { Download, RotateCcw, ShieldCheck, Trash2, Upload, X } from 'lucide-react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { DIARY_DEFAULT_IMAGE, defaultStoreState } from '../data/defaultStore';
import type { DiaryEntry, Product, StoreState, WeightKey } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  store: StoreState;
  onSaveStore: (next: StoreState) => void;
  onShowToast: (msg: string) => void;
}

export function AdminModal({
  isOpen,
  onClose,
  store,
  onSaveStore,
  onShowToast,
}: AdminModalProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passInput, setPassInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [draftWhatsapp, setDraftWhatsapp] = useState(store.whatsapp);
  const [draftAdminPass, setDraftAdminPass] = useState(store.adminPass);
  const [draftProducts, setDraftProducts] = useState<Product[]>(store.products);
  const [draftDiary, setDraftDiary] = useState<DiaryEntry[]>(store.diary);

  const [newDiaryTitle, setNewDiaryTitle] = useState('');
  const [newDiaryTag, setNewDiaryTag] = useState('');
  const [newDiaryDesc, setNewDiaryDesc] = useState('');

  useEffect(() => {
    if (isOpen) {
      setIsUnlocked(false);
      setPassInput('');
      setAuthError('');
      setDraftWhatsapp(store.whatsapp);
      setDraftAdminPass(store.adminPass);
      setDraftProducts(structuredClone(store.products));
      setDraftDiary(structuredClone(store.diary));
    }
  }, [isOpen, store]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (passInput.trim() === store.adminPass) {
      setIsUnlocked(true);
      setAuthError('');
    } else {
      setAuthError('كلمة المرور غير صحيحة');
    }
  };

  const handlePriceChange = (
    productId: string,
    weight: WeightKey,
    value: string
  ) => {
    const num = Math.max(0, Number(value) || 0);
    setDraftProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, prices: { ...p.prices, [weight]: num } }
          : p
      )
    );
  };

  const handleAvailabilityToggle = (productId: string) => {
    setDraftProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, available: !p.available } : p
      )
    );
  };

  const handleAddDiary = () => {
    if (!newDiaryTitle.trim() || !newDiaryDesc.trim()) {
      onShowToast('أدخل عنوان التحديث ووصفه أولاً');
      return;
    }
    const entry: DiaryEntry = {
      id: `d_${Date.now()}`,
      tag: newDiaryTag.trim() || 'يوميات المنحل',
      title: newDiaryTitle.trim(),
      desc: newDiaryDesc.trim(),
      image: DIARY_DEFAULT_IMAGE,
    };
    setDraftDiary((prev) => [entry, ...prev]);
    setNewDiaryTitle('');
    setNewDiaryTag('');
    setNewDiaryDesc('');
    onShowToast('تمت إضافة التحديث إلى المسودة');
  };

  const handleDeleteDiary = (id: string) => {
    setDraftDiary((prev) => prev.filter((d) => d.id !== id));
  };

  const handleSaveChanges = () => {
    const cleanWa = draftWhatsapp.replace(/\D/g, '') || defaultStoreState.whatsapp;
    const nextStore: StoreState = {
      whatsapp: cleanWa,
      adminPass: draftAdminPass.trim() || '1234',
      products: draftProducts,
      diary: draftDiary,
    };
    onSaveStore(nextStore);
    onShowToast('تم حفظ جميع تعديلات المنحل بنجاح');
    onClose();
  };

  const handleExportJson = () => {
    const payload: StoreState = {
      whatsapp: draftWhatsapp,
      adminPass: draftAdminPass,
      products: draftProducts,
      diary: draftDiary,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `amna-apiary-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    onShowToast('تم تصدير النسخة الاحتياطية');
  };

  const handleImportJson = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as Partial<StoreState>;
        if (!Array.isArray(parsed.products) || !Array.isArray(parsed.diary)) {
          onShowToast('ملف النسخة الاحتياطية غير صالح');
          return;
        }
        setDraftWhatsapp(parsed.whatsapp || store.whatsapp);
        setDraftAdminPass(parsed.adminPass || store.adminPass);
        setDraftProducts(parsed.products);
        setDraftDiary(parsed.diary);
        onShowToast('تم استيراد البيانات؛ اضغط حفظ لتطبيقها');
      } catch {
        onShowToast('تعذر قراءة ملف JSON');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleResetDefaults = () => {
    setDraftWhatsapp(defaultStoreState.whatsapp);
    setDraftAdminPass(defaultStoreState.adminPass);
    setDraftProducts(structuredClone(defaultStoreState.products));
    setDraftDiary(structuredClone(defaultStoreState.diary));
    onShowToast('تمت استعادة البيانات الافتراضية؛ اضغط حفظ لتأكيدها');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="لوحة إدارة المنحل"
    >
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs"
      />
      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-creamBase border border-honeyGold/40 shadow-2xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-emeraldDeep/10 pb-4">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-emeraldDeep" />
            <h3 className="font-display text-2xl font-bold text-emeraldDeep">
              لوحة إدارة المنحل
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق اللوحة"
            className="p-2 rounded-xl hover:bg-black/5 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isUnlocked ? (
          <form
            onSubmit={handleLogin}
            className="space-y-4 py-4 max-w-sm mx-auto text-center"
          >
            <p className="text-sm text-inkMuted">
              أدخل كلمة المرور للوصول إلى إعدادات المنحل والأسعار والواتساب.
            </p>
            <input
              type="password"
              value={passInput}
              onChange={(e) => setPassInput(e.target.value)}
              placeholder="كلمة المرور (الافتراضية 1234)"
              autoFocus
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-emeraldDeep/20 text-center text-sm focus:outline-none focus:border-honeyGold"
            />
            {authError && (
              <p className="text-xs font-bold text-red-700">{authError}</p>
            )}
            <button
              type="submit"
              className="w-full min-h-[44px] py-2.5 rounded-lg bg-emeraldDeep text-white font-bold text-sm hover:bg-emeraldSoft transition cursor-pointer"
            >
              دخول اللوحة
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            {/* WhatsApp & Admin Password */}
            <div className="grid sm:grid-cols-2 gap-4 bg-white p-4 rounded-2xl border border-emeraldDeep/10">
              <div>
                <label className="block text-xs font-bold text-emeraldDeep mb-1">
                  رقم الواتساب (صيغة دولية مثل 966597176168)
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={draftWhatsapp}
                  onChange={(e) => setDraftWhatsapp(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-creamBase border border-emeraldDeep/15 text-sm tabular-nums text-left"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-emeraldDeep mb-1">
                  كلمة مرور الإدارة
                </label>
                <input
                  type="password"
                  value={draftAdminPass}
                  onChange={(e) => setDraftAdminPass(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-creamBase border border-emeraldDeep/15 text-sm"
                />
              </div>
            </div>

            {/* Products Pricing & Availability */}
            <div className="bg-white p-4 rounded-2xl border border-emeraldDeep/10 space-y-3">
              <h4 className="font-bold text-emeraldDeep text-sm">
                الأسعار وحالة التوفر (بالريال السعودي)
              </h4>
              <div className="space-y-3">
                {draftProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-3.5 rounded-xl bg-creamBase border border-emeraldDeep/10 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-extrabold text-sm text-emeraldDeep">
                        {prod.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleAvailabilityToggle(prod.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition ${
                          prod.available
                            ? 'bg-emeraldDeep text-white'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {prod.available ? 'متوفر الآن' : 'غير متوفر حالياً'}
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2.5 text-xs">
                      <div>
                        <label className="block text-inkMuted mb-1">ربع كيلو</label>
                        <input
                          type="number"
                          min={0}
                          value={prod.prices.quarter}
                          onChange={(e) =>
                            handlePriceChange(prod.id, 'quarter', e.target.value)
                          }
                          className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-emeraldDeep/15 tabular-nums font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-inkMuted mb-1">نصف كيلو</label>
                        <input
                          type="number"
                          min={0}
                          value={prod.prices.half}
                          onChange={(e) =>
                            handlePriceChange(prod.id, 'half', e.target.value)
                          }
                          className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-emeraldDeep/15 tabular-nums font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-inkMuted mb-1">كيلو</label>
                        <input
                          type="number"
                          min={0}
                          value={prod.prices.kilo}
                          onChange={(e) =>
                            handlePriceChange(prod.id, 'kilo', e.target.value)
                          }
                          className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-emeraldDeep/15 tabular-nums font-bold"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Diary Management */}
            <div className="bg-white p-4 rounded-2xl border border-emeraldDeep/10 space-y-3">
              <h4 className="font-bold text-emeraldDeep text-sm">
                يوميات المنحل (إضافة أو حذف تحديث)
              </h4>
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={newDiaryTitle}
                  onChange={(e) => setNewDiaryTitle(e.target.value)}
                  placeholder="عنوان التحديث (مثال: تفقد خلايا السدر)"
                  className="px-3 py-2 rounded-xl bg-creamBase border border-emeraldDeep/15 text-sm"
                />
                <input
                  type="text"
                  value={newDiaryTag}
                  onChange={(e) => setNewDiaryTag(e.target.value)}
                  placeholder="الوسم (مثال: رعاية النحل)"
                  className="px-3 py-2 rounded-xl bg-creamBase border border-emeraldDeep/15 text-sm"
                />
              </div>
              <textarea
                rows={2}
                value={newDiaryDesc}
                onChange={(e) => setNewDiaryDesc(e.target.value)}
                placeholder="وصف مختصر لما تم إنجازه في المنحل..."
                className="w-full px-3 py-2 rounded-xl bg-creamBase border border-emeraldDeep/15 text-sm"
              />
              <button
                type="button"
                onClick={handleAddDiary}
                className="px-4 py-2 rounded-lg bg-emeraldDeep text-white text-xs font-bold hover:bg-emeraldSoft cursor-pointer"
              >
                + إضافة التحديث
              </button>

              {draftDiary.length > 0 && (
                <div className="pt-2 space-y-2 border-t border-emeraldDeep/10">
                  {draftDiary.map((d) => (
                    <div
                      key={d.id}
                      className="flex items-center justify-between gap-2 text-xs bg-creamBase px-3 py-2 rounded-xl"
                    >
                      <span className="font-bold text-emeraldDeep truncate">
                        {d.title} · <span className="text-inkMuted">{d.tag}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteDiary(d.id)}
                        aria-label={`حذف ${d.title}`}
                        className="p-1 text-red-700 hover:bg-red-50 rounded-lg cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Save & Backup Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleExportJson}
                  className="px-3.5 py-2 rounded-xl bg-white border border-emeraldDeep/20 text-xs font-bold text-emeraldDeep hover:bg-creamBase cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تصدير JSON</span>
                </button>
                <label className="px-3.5 py-2 rounded-xl bg-white border border-emeraldDeep/20 text-xs font-bold text-emeraldDeep hover:bg-creamBase cursor-pointer inline-flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5" />
                  <span>استيراد JSON</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJson}
                    className="hidden"
                  />
                </label>
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="px-3.5 py-2 rounded-xl bg-white border border-emeraldDeep/20 text-xs font-bold text-inkMuted hover:text-emeraldDeep cursor-pointer inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>استعادة الافتراضي</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleSaveChanges}
                className="min-h-[44px] px-6 py-2.5 rounded-lg bg-gradient-to-l from-honeyGold to-honeyLight text-white font-extrabold text-sm shadow-goldGlow cursor-pointer"
              >
                حفظ جميع التعديلات
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
