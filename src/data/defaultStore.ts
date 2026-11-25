import heroWideImg from '../assets/images/hero_madinah_apiary_wide_1795431021299.jpg';
import sidrJarImg from '../assets/images/real_sidr_enhanced_1795621718975.jpg';
import talhJarImg from '../assets/images/real_talh_enhanced_1795621719067.jpg';
import samraJarImg from '../assets/images/real_trio_roses_enhanced_1795621720113.jpg';
import duoTreeJarsImg from '../assets/images/real_duo_tree_enhanced_1795621721821.jpg';
import apiaryFrameImg from '../assets/images/apiary_honeycomb_hives_craft_1795431311283.jpg';
import trustCertImg from '../assets/images/trust_certificate_honey_gold_1795430456485.jpg';
import apiaryCoverImg from '../assets/images/cover_madinah_honey_gold_1795430455728.jpg';
import cleanedLogoImg from '../assets/images/cleaned_apiary_logo_1795612732935.jpg';
import enchantedBackdropImg from '../assets/images/enchanted_honey_backdrop_1795612734466.jpg';
import type { FaqItem, Product, ReviewItem, StoreState, WeightKey } from '../types';

export const STORAGE_KEY = 'amna_honey_store_v1';
export const DEFAULT_IBAN = 'SA09 8000 0272 6080 1030 2900';
export const BENEFICIARY_NAME = 'آمنة عبد الكريم';

export const CLEANED_APIARY_LOGO = cleanedLogoImg;
export const ENCHANTED_BACKDROP_IMAGE = enchantedBackdropImg;
export const ENCHANTED_SHOWCASE_IMAGE = duoTreeJarsImg;

export const HERO_SHOWCASE_IMAGE = enchantedBackdropImg || heroWideImg;
export const APIARY_FRAME_IMAGE = apiaryFrameImg;
export const TRUST_CERT_IMAGE = trustCertImg;
export const APIARY_ENVIRONMENT_IMAGE = apiaryCoverImg;
export const FAQ_HONEY_IMAGE = duoTreeJarsImg;
export const DIARY_DEFAULT_IMAGE = samraJarImg;

export const WEIGHT_LABELS: Record<WeightKey, string> = {
  quarter: 'ربع كيلو',
  half: 'نصف كيلو',
  kilo: 'كيلو',
};

export const WEIGHT_ORDER: WeightKey[] = ['quarter', 'half', 'kilo'];

export const CUSTOMER_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'أبو عبد الرحمن الجهني',
    city: 'المدينة المنورة',
    product: 'عسل سدرة بلدي · كيلو',
    quote:
      'طلبت عسل السدرة ووصلني خلال ساعات داخل المدينة، القوام ثقيل والرائحة بلدية أصيلة وطعمه واضح أنه صافي من الخلية.',
  },
  {
    id: 'rev-2',
    author: 'أم سارة الحربي',
    city: 'جدة',
    product: 'عسل طلح بلدي · نصف كيلو',
    quote:
      'ثاني مرة أطلب عسل الطلح للوالدة؛ التغليف محكم جداً والشحن وصل سريعاً، والأجمل المصداقية والوضوح في التعامل عبر الواتساب.',
  },
  {
    id: 'rev-3',
    author: 'فيصل العتيبي',
    city: 'الرياض',
    product: 'عسل سمرة بلدي · كيلو',
    quote:
      'ما شاء الله تبارك الله، عسل السمرة غني جداً ومناسب لروتين الصباح، والالتزام بالمعايير والترخيص يعطي راحة بال كبيرة.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-natural',
    question: 'هل العسل طبيعي 100%؟',
    answer:
      'نعم، جميع أنواع العسل طبيعية 100% من مناحلنا مباشرة في المدينة المنورة دون أي إضافات أو تسخين أو تغذية صناعية، وبترخيص معتمد من وزارة البيئة والمياه والزراعة.',
  },
  {
    id: 'faq-delivery-payment',
    question: 'كيف تتم عملية التوصيل والدفع؟',
    answer:
      'داخل المدينة المنورة التوصيل فوري ويتوفر الدفع عند الاستلام أو التحويل البنكي. وخارج المدينة المنورة يتم الشحن حسب المنطقة والدفع بالتحويل البنكي المسبق فقط.',
  },
  {
    id: 'faq-refund',
    question: 'ما سياسة الاسترجاع والاسترداد؟',
    answer:
      'نضمن لك نقاء وجودة العسل 100%؛ وفي حال عدم الرضا أو وجود أي ملاحظة على جودة المنتج يحق لك استرجاعه واسترداد المبلغ كاملاً.',
  },
];

const OLD_ASSET_MARKERS = [
  'unsplash.com',
  '/src/assets/images/',
  'beekeeper_amna_portrait',
  'beekeeper_amna_work_portrait',
  'hero_honey_showcase',
  'product_sidr_honey',
  'product_talh_honey',
  'product_samra_honey',
  'product_sidr_jar_',
  'product_talh_jar_',
  'product_samra_jar_',
  'products_trio_gold_brown',
  'diary_apiary_hives',
  'diary_honey_harvest',
  'faq_honey_clarity_visual_',
  'enchanted_honey_showcase_',
];

export const defaultStoreState: StoreState = {
  whatsapp: '966597176168',
  adminPass: '1234',
  products: [
    {
      id: 'sidr',
      name: 'عسل سدرة بلدي',
      subtitle: 'كهرماني ذهبي · قوام غني ونكهة أصيلة',
      description:
        'عسل سدرة طبيعي مختار بعناية من أزهار السدر البري، يتميز بقوامه الغني ولونه الذهبي الصافي ونكهته الفاخرة.',
      available: true,
      image: sidrJarImg,
      imageAlt: 'عبوة عسل سدرة المدينة المنورة بلدي صافي من مناحل آمنة عبد الكريم',
      prices: {
        quarter: 150,
        half: 250,
        kilo: 400,
      },
      details: {
        taste: 'حلاوة متوازنة مع نفحة أزهار السدر الدافئة وعبق عطري مميز',
        color: 'كهرماني ذهبي صافي يزداد عمقاً مع النضج الطبيعي',
        benefits: 'يمد الجسم بطاقة صباحية لطيفة ويدعم المناعة اليومية والنشاط العام',
        season: 'موسم تزهير أشجار السدر البري في الأودية والشعاب',
        usageAndStorage:
          'ملعقة على الريق أو مع ماء دافئ صباحاً؛ يُحفظ في عبوة زجاجية محكمة بدرجة حرارة الغرفة بعيداً عن الشمس.',
      },
    },
    {
      id: 'talh',
      name: 'عسل طلح بلدي',
      subtitle: 'عنبر محمر · نكهة برية مميزة',
      description:
        'عسل طلح أصلي بنكهته البرية الواضحة ولونه العنبري الدافئ، خيار محبب للاستخدام اليومي المتواصل.',
      available: true,
      image: talhJarImg,
      imageAlt: 'عبوة عسل طلح أصلي من مناحل بلدية طبيعية في المدينة المنورة',
      prices: {
        quarter: 150,
        half: 250,
        kilo: 400,
      },
      details: {
        taste: 'نكهة برية واضحة بلمسة خشبية لطيفة وحلاوة معتدلة غير لاذعة',
        color: 'عنبر محمر دافئ بصفاء طبيعي لافت',
        benefits: 'مناسب للاستخدام اليومي، يريح المعدة والقولون ويساعد على توازن الحيوية',
        season: 'موسم إزهار أشجار الطلح البري في أواخر الربيع وبداية الصيف',
        usageAndStorage:
          'ملعقة صباحاً قبل الإفطار بربع ساعة؛ يُخزن في مكان جاف ومظلم ولا يُعرض للحرارة المباشرة.',
      },
    },
    {
      id: 'samra',
      name: 'عسل سمرة بلدي',
      subtitle: 'بني داكن ياقوتي · طابع جبلي أصيل',
      description:
        'عسل سمرة طبيعي ذو لون بني داكن غني وحضور مميز، يجمع بين العراقة الجبلية والعناية المباشرة بالخلايا.',
      available: true,
      image: samraJarImg,
      imageAlt: 'عبوة عسل سمرة طبيعي داكن من مناحل بلدية معتمدة في المدينة المنورة',
      prices: {
        quarter: 150,
        half: 250,
        kilo: 400,
      },
      details: {
        taste: 'مذاق مركز عميق بنكهة السمرة الشوكية الأصيلة وقوام متماسك',
        color: 'بني داكن يميل إلى الياقوتي الداكن تحت الإضاءة',
        benefits: 'غني بالمعادن ومضادات الأكسدة الطبيعية، مفضل للنشاط البدني ومواسم البرد',
        season: 'موسم رعي النحل على أزهار شجر السمر الجبلي والصحراوي',
        usageAndStorage:
          'ملعقة على الريق أو مع الماء الدافئ أو ماء زمزم؛ يُحفظ محكم الإغلاق بعيداً عن الرطوبة والضوء.',
      },
    },
  ],
  diary: [
    {
      id: 'd1',
      tag: 'رعاية النحل',
      title: 'تفقد الخلايا وتهيئة بيئة النحل',
      desc: 'متابعة دورية لخلايا النحل في المدينة المنورة والاطمئنان على نشاطها وصحتها لضمان موسم إنتاج نظيف ومتوازن.',
      image: apiaryCoverImg,
      imageAlt: 'خلايا مناحل بلدية في البيئة الطبيعية بالمدينة المنورة بإشراف آمنة عبد الكريم',
    },
    {
      id: 'd2',
      tag: 'فرز وتعبئة',
      title: 'فرز العسل وتعبئته بأمانة',
      desc: 'الاهتمام بنظافة الأدوات والعبوات والحفاظ على خصائص العسل الطبيعية دون تدخل يخل بجودته.',
      image: duoTreeJarsImg,
      imageAlt: 'عبوات عسل مناحل بنت المدينة المعبأة بأمانة ونقاء',
    },
    {
      id: 'd3',
      tag: 'خدمة العملاء',
      title: 'تجهيز الطلبات وتوصيلها بسرعة',
      desc: 'توصيل فوري داخل المدينة المنورة مع إمكانية الدفع عند الاستلام، وشحن منظم لخارج المدينة.',
      image: samraJarImg,
      imageAlt: 'تجهيز عبوات عسل مناحل بنت المدينة للتوصيل الفوري',
    },
  ],
};

export function deduplicateProducts(products: Product[]): Product[] {
  const seenIds = new Set<string>();
  const seenNames = new Set<string>();
  const result: Product[] = [];

  for (const prod of products) {
    const cleanId = (prod.id || '').trim().toLowerCase();
    const cleanName = (prod.name || '').trim();
    if (!cleanName || seenIds.has(cleanId) || seenNames.has(cleanName)) {
      continue;
    }
    seenIds.add(cleanId);
    seenNames.add(cleanName);
    result.push(prod);
  }

  return result;
}

export function formatDisplayPhone(waNumber?: string): string {
  const cleaned = (waNumber || '').replace(/\D/g, '');
  if (cleaned.startsWith('966') && cleaned.length === 12) {
    return '0' + cleaned.slice(3);
  }
  return cleaned || '0597176168';
}

export function buildWhatsappUrl(waNumber: string, text: string): string {
  const cleanWa = (waNumber || '966597176168').replace(/\D/g, '');
  return `https://wa.me/${cleanWa}?text=${encodeURIComponent(text)}`;
}

function shouldReplaceImagePath(image?: string): boolean {
  if (!image) return true;
  return OLD_ASSET_MARKERS.some((marker) => image.includes(marker));
}

export function loadStoreState(): StoreState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(defaultStoreState);
    const parsed = JSON.parse(raw) as Partial<StoreState>;

    const mergedProducts =
      Array.isArray(parsed.products) && parsed.products.length > 0
        ? parsed.products.map((p) => {
            const fallback = defaultStoreState.products.find((d) => d.id === p.id);
            return {
              ...(fallback ?? defaultStoreState.products[0]),
              ...p,
              details: p.details ?? fallback?.details,
              imageAlt: p.imageAlt ?? fallback?.imageAlt,
              image: shouldReplaceImagePath(p.image)
                ? fallback?.image ?? defaultStoreState.products[0].image
                : p.image,
            };
          })
        : structuredClone(defaultStoreState.products);

    const products = deduplicateProducts(mergedProducts);

    const diary =
      Array.isArray(parsed.diary) && parsed.diary.length > 0
        ? parsed.diary.map((d, idx) => {
            const fallback = defaultStoreState.diary[idx % defaultStoreState.diary.length];
            return {
              ...d,
              imageAlt: d.imageAlt ?? fallback.imageAlt,
              image: shouldReplaceImagePath(d.image) ? fallback.image : d.image,
            };
          })
        : structuredClone(defaultStoreState.diary);

    return {
      whatsapp: parsed.whatsapp || defaultStoreState.whatsapp,
      adminPass: parsed.adminPass || defaultStoreState.adminPass,
      products: products.length > 0 ? products : structuredClone(defaultStoreState.products),
      diary,
    };
  } catch {
    return structuredClone(defaultStoreState);
  }
}

export function saveStoreState(next: StoreState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore storage quota or privacy-mode restrictions
  }
}
