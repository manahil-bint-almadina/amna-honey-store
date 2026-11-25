export type WeightKey = 'quarter' | 'half' | 'kilo';

export type DeliveryZone = 'inside' | 'outside';

export type PaymentMethod =
  | 'الدفع عند الاستلام (داخل المدينة المنورة)'
  | 'تحويل بنكي (مصرف الراجحي)';

export interface ProductDetails {
  taste: string;
  color: string;
  benefits: string;
  season: string;
  usageAndStorage: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  available: boolean;
  image: string;
  imageAlt?: string;
  prices: Record<WeightKey, number>;
  details?: ProductDetails;
}

export interface DiaryEntry {
  id: string;
  tag: string;
  title: string;
  desc: string;
  image: string;
  imageAlt?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  city: string;
  product: string;
  quote: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface CartItem {
  key: string;
  productId: string;
  name: string;
  weight: WeightKey;
  weightLabel: string;
  unitPrice: number;
  qty: number;
}

export interface GpsCoords {
  lat: string;
  lng: string;
  url: string;
}

export interface StoreState {
  whatsapp: string;
  adminPass: string;
  products: Product[];
  diary: DiaryEntry[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  isError?: boolean;
}
