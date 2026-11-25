import { useId } from 'react';

interface EnchantedMotionLayerProps {
  variant?: 'hero' | 'ambient';
}

function BlossomSvg({ className = '' }: { className?: string }) {
  const gradId = useId();
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g opacity="0.92">
        <ellipse cx="60" cy="28" rx="16" ry="26" fill={`url(#${gradId})`} />
        <ellipse
          cx="60"
          cy="28"
          rx="16"
          ry="26"
          transform="rotate(72 60 60)"
          fill={`url(#${gradId})`}
        />
        <ellipse
          cx="60"
          cy="28"
          rx="16"
          ry="26"
          transform="rotate(144 60 60)"
          fill={`url(#${gradId})`}
        />
        <ellipse
          cx="60"
          cy="28"
          rx="16"
          ry="26"
          transform="rotate(216 60 60)"
          fill={`url(#${gradId})`}
        />
        <ellipse
          cx="60"
          cy="28"
          rx="16"
          ry="26"
          transform="rotate(288 60 60)"
          fill={`url(#${gradId})`}
        />
        <circle cx="60" cy="60" r="10" fill="#F9D77E" />
        <circle cx="60" cy="60" r="5.5" fill="#D4882A" />
      </g>
      <defs>
        <radialGradient id={gradId} cx="0.5" cy="0.3" r="0.75">
          <stop offset="0%" stopColor="#FFF4EC" />
          <stop offset="55%" stopColor="#F9C1B6" />
          <stop offset="100%" stopColor="#E6958C" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function ButterflySvg({ className = '' }: { className?: string }) {
  const wingId = useId();
  return (
    <svg
      viewBox="0 0 64 52"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M32 25C25 10 8 4 6 16C4 26 18 31 30 28C19 32 10 40 16 46C22 50 29 39 32 30C35 39 42 50 48 46C54 40 45 32 34 28C46 31 60 26 58 16C56 4 39 10 32 25Z"
        fill={`url(#${wingId})`}
        stroke="#FFF4CF"
        strokeWidth="1"
      />
      <rect x="30.8" y="18" width="2.4" height="17" rx="1.2" fill="#FFF3C4" />
      <defs>
        <linearGradient id={wingId} x1="6" y1="8" x2="58" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFEFA8" stopOpacity="0.92" />
          <stop offset="50%" stopColor="#F7C96E" stopOpacity="0.82" />
          <stop offset="100%" stopColor="#F9B59E" stopOpacity="0.88" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function EnchantedMotionLayer({
  variant = 'hero',
}: EnchantedMotionLayerProps) {
  const isHero = variant === 'hero';

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
    >
      {/* 1. Animated Golden Honey Flowing from the Palace */}
      <div
        className={`absolute ${
          isHero
            ? 'left-[20%] sm:left-[32.5%] top-[24%] w-[16%] sm:w-[9%] h-[42%]'
            : 'left-[20%] sm:left-[33%] top-[24%] w-[15%] sm:w-[8.5%] h-[40%]'
        }`}
      >
        {/* Warm radiant palace gate glow */}
        <div
          className="absolute -top-4 inset-x-0 h-14 rounded-full blur-xl animate-palace-glow"
          style={{
            background:
              'radial-gradient(circle, rgba(255,227,138,0.85) 0%, rgba(235,162,48,0.35) 60%, transparent 100%)',
          }}
        />

        {/* Continuous streaming honey waterfall ribbons */}
        <div className="relative w-full h-full overflow-hidden rounded-b-full opacity-90">
          <div
            className="absolute inset-x-[15%] -top-1/2 h-[200%] animate-honey-stream"
            style={{
              background:
                'repeating-linear-gradient(180deg, rgba(255,232,148,0.08) 0px, rgba(255,220,115,0.65) 28px, rgba(230,149,38,0.48) 56px, rgba(255,236,168,0.12) 84px)',
              filter: 'blur(2px)',
            }}
          />
          <div
            className="absolute inset-x-[32%] -top-1/2 h-[200%] animate-honey-stream-slow"
            style={{
              animationDelay: '-1.5s',
              background:
                'repeating-linear-gradient(180deg, rgba(255,248,204,0.05) 0px, rgba(255,242,175,0.75) 22px, rgba(242,177,64,0.38) 48px, rgba(255,245,190,0.08) 72px)',
              filter: 'blur(1px)',
            }}
          />

          {/* Shimmering falling honey droplets */}
          <span
            className="absolute left-[28%] top-[10%] w-1.5 h-4 rounded-full bg-[#FFE89C] blur-[0.5px] animate-honey-drop"
            style={{ animationDelay: '0s' }}
          />
          <span
            className="absolute left-[58%] top-[6%] w-1.5 h-3.5 rounded-full bg-[#FFD269] blur-[0.5px] animate-honey-drop"
            style={{ animationDelay: '1.1s' }}
          />
          <span
            className="absolute left-[44%] top-[14%] w-1 h-3 rounded-full bg-[#FFF4C4] animate-honey-drop"
            style={{ animationDelay: '2.0s' }}
          />
        </div>

        {/* Golden splash & concentric ripples in the honey pool below */}
        <div className="absolute -bottom-3 -inset-x-6 h-8 flex items-center justify-center">
          <span
            className="absolute w-full h-5 rounded-full border border-[#FFE596]/70 animate-honey-ripple"
            style={{ animationDelay: '0s' }}
          />
          <span
            className="absolute w-full h-5 rounded-full border border-[#F7C55D]/60 animate-honey-ripple"
            style={{ animationDelay: '1.6s' }}
          />
        </div>
      </div>

      {/* 2. Animated Swaying Background Flowers (Left & Right & Lower Foreground) */}
      <div className="absolute -left-4 sm:left-2 bottom-[10%] sm:bottom-[8%] w-24 sm:w-32 h-24 sm:h-32 animate-flower-sway opacity-85">
        <BlossomSvg className="w-full h-full drop-shadow-[0_4px_14px_rgba(255,194,178,0.45)]" />
      </div>

      <div
        className="absolute left-[10%] sm:left-[14%] bottom-[2%] w-16 sm:w-22 h-16 sm:h-22 animate-flower-sway-alt opacity-80"
        style={{ animationDelay: '-2.1s' }}
      >
        <BlossomSvg className="w-full h-full drop-shadow-[0_4px_12px_rgba(255,194,178,0.4)]" />
      </div>

      <div
        className="hidden sm:block absolute left-[3%] top-[36%] w-20 h-20 animate-flower-sway-alt opacity-75"
        style={{ animationDelay: '-1.3s' }}
      >
        <BlossomSvg className="w-full h-full drop-shadow-[0_4px_12px_rgba(255,194,178,0.4)]" />
      </div>

      <div
        className="absolute -right-4 sm:right-3 bottom-[12%] sm:bottom-[10%] w-24 sm:w-32 h-24 sm:h-32 animate-flower-sway-alt opacity-85"
        style={{ animationDelay: '-0.9s' }}
      >
        <BlossomSvg className="w-full h-full drop-shadow-[0_4px_14px_rgba(255,194,178,0.45)]" />
      </div>

      <div
        className="absolute right-[10%] sm:right-[15%] top-[20%] sm:top-[22%] w-16 sm:w-22 h-16 sm:h-22 animate-flower-sway opacity-80"
        style={{ animationDelay: '-3.4s' }}
      >
        <BlossomSvg className="w-full h-full drop-shadow-[0_4px_12px_rgba(255,194,178,0.4)]" />
      </div>

      <div
        className="hidden md:block absolute right-[4%] top-[44%] w-20 h-20 animate-flower-sway opacity-75"
        style={{ animationDelay: '-4.2s' }}
      >
        <BlossomSvg className="w-full h-full drop-shadow-[0_4px_12px_rgba(255,194,178,0.4)]" />
      </div>

      {/* 3. Soft Drifting Flower Petals */}
      <span
        className="absolute left-[14%] top-[24%] w-3.5 h-2.5 rounded-full bg-gradient-to-br from-[#FFF2EA] to-[#F4ACA2] animate-petal-drift"
        style={{ animationDelay: '0s' }}
      />
      <span
        className="absolute left-[24%] top-[36%] w-3 h-2 rounded-full bg-gradient-to-br from-[#FFF5ED] to-[#F7BAAD] animate-petal-drift"
        style={{ animationDelay: '3.2s' }}
      />
      <span
        className="absolute right-[18%] top-[18%] w-3.5 h-2.5 rounded-full bg-gradient-to-br from-[#FFF2EA] to-[#F4ACA2] animate-petal-drift"
        style={{ animationDelay: '1.8s' }}
      />
      <span
        className="absolute right-[12%] top-[42%] w-3 h-2 rounded-full bg-gradient-to-br from-[#FFF5ED] to-[#F7BAAD] animate-petal-drift"
        style={{ animationDelay: '5.1s' }}
      />

      {/* 4. Floating Golden Butterflies */}
      <ButterflySvg
        className="absolute left-[18%] top-[32%] w-7 sm:w-9 h-7 sm:h-9 animate-butterfly-float opacity-85"
      />
      <div
        className="hidden sm:block absolute right-[17%] top-[26%] w-8 h-8 animate-butterfly-float opacity-85"
        style={{ animationDelay: '-2.6s' }}
      >
        <ButterflySvg className="w-full h-full" />
      </div>
    </div>
  );
}
