import { ShoppingBag } from 'lucide-react';
import { CLEANED_APIARY_LOGO } from '../data/defaultStore';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigateHome: () => void;
}

export function Header({
  cartCount,
  onOpenCart,
  onNavigateHome,
}: HeaderProps) {
  const handleSectionLink = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId?: string
  ) => {
    onNavigateHome();
    if (sectionId) {
      e.preventDefault();
      window.location.hash = '';
      window.setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 40);
    }
  };

  return (
    <header className="sticky top-0 z-40 glass-twilight border-b w-full max-w-full">
      <div className="topbar max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-8">
        {/* Zone 1: Brand Wordmark with Cleaned Logo */}
        <a
          href="#/"
          onClick={(e) => handleSectionLink(e)}
          className="brand-title inline-flex items-center gap-2 sm:gap-3 font-display text-[16px] sm:text-xl font-extrabold text-[#FFF8F0] whitespace-nowrap min-w-0 hover:text-[#F5D38C] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5D38C] rounded-lg"
        >
          <img
            src={CLEANED_APIARY_LOGO}
            alt="شعار مناحل بنت المدينة للعسل الطبيعي"
            referrerPolicy="no-referrer"
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover bg-[#FFF9F0] border border-[#F5D38C]/75 shadow-sm shrink-0"
          />
          <span className="truncate">مناحل آمنة عبد الكريم</span>
        </a>

        {/* Zone 2: Clean Single-Line Nav Links */}
        <nav
          aria-label="التنقل الرئيسي"
          className="hidden md:flex items-center gap-7 text-sm font-bold text-[#F9EAD9]"
        >
          <a
            href="#story"
            onClick={(e) => handleSectionLink(e, 'story')}
            className="whitespace-nowrap shrink-0 hover:text-[#F5D38C] hover:underline underline-offset-8 transition-colors"
          >
            الرئيسية
          </a>
          <a
            href="#products"
            onClick={(e) => handleSectionLink(e, 'products')}
            className="whitespace-nowrap shrink-0 hover:text-[#F5D38C] hover:underline underline-offset-8 transition-colors"
          >
            منتجاتنا
          </a>
          <a
            href="#about"
            onClick={(e) => handleSectionLink(e, 'about')}
            className="whitespace-nowrap shrink-0 hover:text-[#F5D38C] hover:underline underline-offset-8 transition-colors"
          >
            من نحن
          </a>
          <a
            href="#faq"
            onClick={(e) => handleSectionLink(e, 'faq')}
            className="whitespace-nowrap shrink-0 hover:text-[#F5D38C] hover:underline underline-offset-8 transition-colors"
          >
            الأسئلة الشائعة
          </a>
        </nav>

        {/* Zone 3: Primary Cart Action */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            className="cart-btn inline-flex items-center gap-2 min-h-[38px] sm:min-h-[42px] px-3 py-1.5 sm:px-5 sm:py-2 rounded-xl btn-honey-glow text-white font-bold text-[13px] sm:text-sm active:scale-[0.98] transition cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5D38C]"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span>السلة</span>
            <span className="tabular-nums bg-[#331B16] text-[#FFF8F0] text-xs font-bold px-2 py-0.5 rounded-md">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
