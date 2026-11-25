import { Award, CheckCircle2, Droplets, Eye, Shield } from 'lucide-react';
import {
  APIARY_FRAME_IMAGE,
  TRUST_CERT_IMAGE,
} from '../data/defaultStore';
import { ResilientImage } from './ResilientImage';

const CORE_VALUES = [
  {
    id: 'honesty',
    icon: Shield,
    title: 'الأمانة',
    desc: 'الالتزام الكامل بصدق المصدر ونقاء العسل دون أي خلط أو غش.',
  },
  {
    id: 'fieldwork',
    icon: Eye,
    title: 'المتابعة الميدانية',
    desc: 'تفقد شخصي ومستمر للخلايا في مواقع تزهير السدر والطلح والسمرة.',
  },
  {
    id: 'extraction',
    icon: Droplets,
    title: 'الفرز الطبيعي',
    desc: 'فرز على البارد يحفظ الإنزيمات واللون والطعم البلدي الأصيل.',
  },
  {
    id: 'purity',
    icon: CheckCircle2,
    title: 'الجودة دون إضافات',
    desc: 'عسل صافي 100% خالٍ من التغذية الصناعية أو المواد الحافظة.',
  },
];

export function AboutTrustSection() {
  return (
    <section
      id="about"
      className="py-16 sm:py-24 border-b border-[#F3D598]/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Descriptive Text + Core Values */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <p className="text-xs sm:text-sm font-bold text-[#F7D78C]">
                عن المنحل والثقة الرسمية
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#FFF9F2] leading-snug drop-shadow-xs">
                من نحن — قصة تبدأ من خلية وتصل إلى مائدتك
              </h2>
              <p className="text-sm sm:text-base text-[#F7E8D6] leading-relaxed">
                في قلب المدينة المنورة، تُشرف النحّالة{' '}
                <strong className="text-[#FFF9F2]">آمنة عبد الكريم</strong> ميدانياً على
                خلايا النحل في مواسم التزهير الطبيعية، برعاية أمينة وترخيص رسمي معتمد
                من <strong className="text-[#FFF9F2]">وزارة البيئة والمياه والزراعة</strong>{' '}
                لضمان وصول عسل بلدي صافي وموثوق إلى كل بيت.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {CORE_VALUES.map((val) => {
                const Icon = val.icon;
                return (
                  <div
                    key={val.id}
                    className="rounded-2xl glass-enchanted p-4 space-y-1.5"
                  >
                    <div className="flex items-center gap-2 font-display font-bold text-sm sm:text-base text-inkDark">
                      <Icon className="w-4 h-4 text-honeyGold shrink-0" />
                      <span>{val.title}</span>
                    </div>
                    <p className="text-xs text-inkMuted leading-relaxed">{val.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="rounded-2xl glass-enchanted p-4 flex items-center gap-3 text-xs sm:text-sm text-inkDark">
              <Award className="w-5 h-5 text-honeyGold shrink-0" />
              <span>
                <strong>الجهة الصادرة للترخيص:</strong> وزارة البيئة والمياه والزراعة —
                رخصة نحال ومنحل متنقل معتمدة (مع حجب البيانات الشخصية الحساسة).
              </span>
            </div>
          </div>

          {/* Visual Side: Apiary Honeycomb Frame + Official License Side by Side */}
          <div className="lg:col-span-6 grid sm:grid-cols-2 gap-5 items-stretch">
            <div className="rounded-2xl overflow-hidden glass-enchanted flex flex-col">
              <div className="aspect-[4/3] sm:aspect-auto sm:flex-1 overflow-hidden">
                <ResilientImage
                  src={APIARY_FRAME_IMAGE}
                  alt="إطار شمع العسل الذهبي داخل خلية نحل خشبية في مناحل آمنة عبد الكريم بالمدينة المنورة"
                  fallbackTitle="خلايا وإنتاج المنحل"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 border-t border-[#DFB27D]/45 bg-[#FFF7EE]/85">
                <p className="font-display text-sm font-bold text-inkDark">
                  خلايا وإنتاج المنحل
                </p>
                <p className="text-xs text-inkMuted mt-0.5">
                  عسل شمعي صافي من مراعي المدينة المنورة
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden glass-enchanted flex flex-col">
              <div className="aspect-[4/3] sm:aspect-auto sm:flex-1 overflow-hidden">
                <ResilientImage
                  src={TRUST_CERT_IMAGE}
                  alt="وثيقة الترخيص المعتمد من وزارة البيئة والمياه والزراعة لمناحل آمنة عبد الكريم مع حجب البيانات الحساسة"
                  fallbackTitle="الترخيص الرسمي المعتمد"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 border-t border-[#DFB27D]/45 bg-[#FFF7EE]/85">
                <p className="font-display text-sm font-bold text-inkDark">
                  الترخيص الرسمي المعتمد
                </p>
                <p className="text-xs text-inkMuted mt-0.5">
                  وزارة البيئة والمياه والزراعة
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
