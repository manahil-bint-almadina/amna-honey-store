import { Quote } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/defaultStore';

export function ReviewsSection() {
  return (
    <section
      id="reviews"
      className="py-16 sm:py-24 border-b border-[#F3D598]/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <p className="text-xs sm:text-sm font-bold text-[#F7D78C]">
            تجارب عملائنا الكرام
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#FFF9F2] drop-shadow-xs">
            كلمات قالوها عنا — ثقة عملائنا أغلى ما نملك
          </h2>
          <p className="text-sm sm:text-base text-[#F7E8D6]">
            آراء حقيقية لعملاء جرّبوا عسل السدرة والطلح والسمرة داخل المدينة المنورة
            وخارجها.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {CUSTOMER_REVIEWS.map((review) => (
            <blockquote
              key={review.id}
              className="card rounded-2xl glass-enchanted p-6 flex flex-col justify-between gap-5"
            >
              <div className="space-y-3">
                <Quote className="w-5 h-5 text-[#F7D78C]" aria-hidden="true" />
                <p className="text-sm sm:text-base text-[#FFF9F2] leading-relaxed">
                  {review.quote}
                </p>
              </div>

              <footer className="pt-4 border-t border-[#F7D78C]/25 text-xs sm:text-sm space-y-0.5">
                <div className="font-display font-bold text-[#FFF9F2]">
                  {review.author}
                </div>
                <div className="text-xs text-[#F7E8D6]/85">
                  {review.city} <span aria-hidden="true">·</span> {review.product}
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
