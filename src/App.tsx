import { CheckCircle2, Lock, MessageCircle } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AboutTrustSection } from './components/AboutTrustSection';
import { AdminModal } from './components/AdminModal';
import { CartDrawer } from './components/CartDrawer';
import { DeliverySection } from './components/DeliverySection';
import { DiarySection } from './components/DiarySection';
import { EnchantedMotionLayer } from './components/EnchantedMotionLayer';
import { FaqSection } from './components/FaqSection';
import { FeaturesSection } from './components/FeaturesSection';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { HoneyAssistant } from './components/HoneyAssistant';
import { LegalPage } from './components/LegalPages';
import { ProductsSection } from './components/ProductsSection';
import { QuickOrderSection } from './components/QuickOrderSection';
import { ReviewsSection } from './components/ReviewsSection';
import { VideosSection } from './components/VideosSection';
import {
  CLEANED_APIARY_LOGO,
  ENCHANTED_BACKDROP_IMAGE,
  WEIGHT_LABELS,
  buildWhatsappUrl,
  formatDisplayPhone,
  loadStoreState,
  saveStoreState,
} from './data/defaultStore';
import type { CartItem, StoreState, WeightKey } from './types';

type ActiveRoute = 'home' | 'privacy' | 'terms';

function resolveHashRoute(): ActiveRoute {
  const hash = window.location.hash.replace(/^#/, '').toLowerCase();
  if (hash === '/privacy' || hash === 'privacy') return 'privacy';
  if (hash === '/terms' || hash === 'terms') return 'terms';
  return 'home';
}

export default function App() {
  const [route, setRoute] = useState<ActiveRoute>(() => resolveHashRoute());
  const [store, setStore] = useState<StoreState>(() => loadStoreState());
  const [selectedWeights, setSelectedWeights] = useState<Record<string, WeightKey>>({
    sidr: 'kilo',
    talh: 'kilo',
    samra: 'kilo',
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const onHashChange = () => {
      const next = resolveHashRoute();
      setRoute(next);
      if (next !== 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigateTo = useCallback((next: ActiveRoute, sectionId?: string) => {
    if (next === 'privacy') {
      window.location.hash = '/privacy';
      setRoute('privacy');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (next === 'terms') {
      window.location.hash = '/terms';
      setRoute('terms');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.location.hash = '';
    setRoute('home');
    if (sectionId) {
      window.setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 40);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const totalCartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart]
  );

  const generalWhatsappUrl = useMemo(
    () =>
      buildWhatsappUrl(
        store.whatsapp,
        'السلام عليكم، أود الطلب من مناحل آمنة عبد الكريم بالمدينة المنورة.'
      ),
    [store.whatsapp]
  );

  const handleSelectWeight = (productId: string, weight: WeightKey) => {
    setSelectedWeights((prev) => ({ ...prev, [productId]: weight }));
  };

  const handleAddToCart = (productId: string) => {
    const prod = store.products.find((p) => p.id === productId);
    if (!prod || !prod.available) return;

    const weight: WeightKey = selectedWeights[productId] || 'kilo';
    const unitPrice = prod.prices[weight];

    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.productId === productId && i.weight === weight
      );
      if (existingIdx >= 0) {
        return prev.map((item, idx) =>
          idx === existingIdx ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prev,
        {
          key: `${productId}_${weight}`,
          productId,
          name: prod.name,
          weight,
          weightLabel: WEIGHT_LABELS[weight],
          unitPrice,
          qty: 1,
        },
      ];
    });

    showToast(`تمت إضافة ${prod.name} (${WEIGHT_LABELS[weight]}) إلى السلة`);
  };

  const handleChangeCartQty = (index: number, delta: number) => {
    setCart((prev) => {
      const next = [...prev];
      const target = next[index];
      if (!target) return prev;
      const newQty = target.qty + delta;
      if (newQty <= 0) {
        next.splice(index, 1);
      } else {
        next[index] = { ...target, qty: newQty };
      }
      return next;
    });
  };

  const handleSaveStore = (next: StoreState) => {
    setStore(next);
    saveStoreState(next);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Persistent Enchanted Golden Honey & Rose-Plum Ambient Backdrop */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 bg-[#3D252C] pointer-events-none overflow-hidden"
      >
        <img
          src={ENCHANTED_BACKDROP_IMAGE}
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-90"
        />
        <EnchantedMotionLayer variant="ambient" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#3E242C]/50 via-[#664148]/42 to-[#321C22]/64" />
      </div>

      {/* Floating Background Flowers */}
      <div className="flower-bg" aria-hidden="true">
        <div className="flower flower-1" />
        <div className="flower flower-2" />
        <div className="flower flower-3" />
        <div className="flower flower-4" />
        <div className="flower flower-5" />
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] pointer-events-none max-w-[92vw]"
        >
          <div className="glass-twilight text-white px-4 py-2.5 rounded-xl shadow-luxury border border-[#F5D38C]/50 flex items-center gap-2 text-xs sm:text-sm font-medium text-center">
            <CheckCircle2 className="w-4 h-4 text-[#F7D78C] shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateHome={() => setRoute('home')}
      />

      <main className="flex-1 relative z-[1] bg-transparent">
        {route === 'privacy' || route === 'terms' ? (
          <LegalPage
            mode={route}
            onBackHome={() => navigateTo('home')}
            onSwitchMode={(nextMode) => navigateTo(nextMode)}
          />
        ) : (
          <>
            {/* Section 1: Hero */}
            <HeroSection whatsapp={store.whatsapp} />
            {/* Section 2: Features */}
            <FeaturesSection />
            {/* Section 3: Products */}
            <ProductsSection
              products={store.products}
              whatsapp={store.whatsapp}
              selectedWeights={selectedWeights}
              onSelectWeight={handleSelectWeight}
              onAddToCart={handleAddToCart}
            />
            {/* Section 4: About Apiary + License + Apiary Environment & Videos */}
            <AboutTrustSection />
            <DiarySection entries={store.diary} />
            <VideosSection />
            {/* Section 5: Reviews */}
            <ReviewsSection />
            {/* Section 6: FAQ */}
            <FaqSection whatsapp={store.whatsapp} />
            {/* Section 7: Contact, Delivery & Bank Transfer + Direct Order Form */}
            <DeliverySection onShowToast={showToast} />
            <QuickOrderSection
              products={store.products}
              whatsapp={store.whatsapp}
              onShowToast={showToast}
            />
          </>
        )}
      </main>

      {/* Section 8: Unified Footer */}
      <footer className="relative z-[1] glass-twilight text-[#FFF8EE]/90 pt-10 pb-20 md:pb-10 border-t border-[#F3D598]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 pb-6 border-b border-white/15">
            {/* Brand Logo + Quick Links */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <img
                src={CLEANED_APIARY_LOGO}
                alt="شعار مناحل بنت المدينة للعسل الطبيعي"
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-full object-cover bg-[#FFF9F0] border border-[#F5D38C]/70 shrink-0"
              />
              <nav
                aria-label="روابط التذييل السريعة"
                className="flex flex-wrap items-center justify-center gap-5 text-xs sm:text-sm font-bold"
              >
                <a
                  href="#story"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('home', 'story');
                  }}
                  className="hover:text-[#F7D78C] transition-colors whitespace-nowrap"
                >
                  الرئيسية
                </a>
                <a
                  href="#products"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('home', 'products');
                  }}
                  className="hover:text-[#F7D78C] transition-colors whitespace-nowrap"
                >
                  منتجاتنا
                </a>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('home', 'about');
                  }}
                  className="hover:text-[#F7D78C] transition-colors whitespace-nowrap"
                >
                  من نحن
                </a>
                <a
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('home', 'faq');
                  }}
                  className="hover:text-[#F7D78C] transition-colors whitespace-nowrap"
                >
                  الأسئلة الشائعة
                </a>
                <span aria-hidden="true" className="text-white/30">
                  |
                </span>
                <a
                  href="#/privacy"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('privacy');
                  }}
                  className="hover:text-[#F7D78C] underline underline-offset-4 transition-colors whitespace-nowrap"
                >
                  سياسة الخصوصية
                </a>
                <a
                  href="#/terms"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('terms');
                  }}
                  className="hover:text-[#F7D78C] underline underline-offset-4 transition-colors whitespace-nowrap"
                >
                  شروط الاستخدام
                </a>
              </nav>
            </div>

            {/* Contact Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm">
              <a
                href={generalWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[40px] px-4 py-1.5 rounded-xl btn-honey-glow text-white font-bold transition whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>واتساب:</span>
                <span dir="ltr" className="tabular-nums">
                  {formatDisplayPhone(store.whatsapp)}
                </span>
              </a>

              <button
                type="button"
                onClick={() => setIsAdminOpen(true)}
                className="inline-flex items-center gap-1.5 text-[#F7D78C] hover:text-[#FFF8EE] underline underline-offset-4 cursor-pointer whitespace-nowrap"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>إدارة المنحل</span>
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-[#F5E4D3]/80 leading-relaxed">
            مناحل آمنة عبد الكريم © 2026 — جميع الحقوق محفوظة — المدينة المنورة —
            ترخيص معتمد من وزارة البيئة والمياه والزراعة
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Bottom WhatsApp Bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-30 h-[54px] glass-twilight border-t border-[#F3D598]/35 px-4 flex items-center justify-between gap-3">
        <span className="text-xs font-bold text-[#FFF8EE] truncate">
          عسل طبيعي 100% · توصيل فوري بالمدينة
        </span>
        <a
          href={generalWhatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[38px] px-4 py-1.5 rounded-xl btn-honey-glow text-white font-bold text-xs inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap"
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
          <span>اطلب عبر واتساب</span>
        </a>
      </div>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        whatsapp={store.whatsapp}
        onChangeQty={handleChangeCartQty}
        onShowToast={showToast}
      />

      <HoneyAssistant store={store} />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        store={store}
        onSaveStore={handleSaveStore}
        onShowToast={showToast}
      />
    </div>
  );
}
