import React from 'react';

/**
 * Custom SVG Logo matching the brand brief:
 * "Cream circle with two smiling magnet characters, text 'TWO IDIOTS STUDIO – Fridge Magnets'"
 * Also supports displaying a custom uploaded logo image when the owner tests their real asset.
 */
export const TwoIdiotsLogo: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  customLogoUrl?: string | null;
}> = ({ size = 'md', customLogoUrl }) => {
  const dimensions =
    size === 'sm' ? 'w-10 h-10' : size === 'lg' ? 'w-20 h-20' : 'w-12 h-12';

  if (customLogoUrl) {
    return (
      <img
        src={customLogoUrl}
        alt="Two Idiots Studio Logo"
        referrerPolicy="no-referrer"
        className={`${dimensions} rounded-full object-cover border-2 border-[#5B3A29] bg-[#FAF3EA] shrink-0`}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 120 120"
      className={`${dimensions} shrink-0 select-none`}
      role="img"
      aria-label="Two Idiots Studio – Two smiling magnet characters logo"
    >
      {/* Outer Cream Circle with Warm Brown Border */}
      <circle
        cx="60"
        cy="60"
        r="56"
        fill="#FAF3EA"
        stroke="#5B3A29"
        strokeWidth="4"
      />
      {/* Dashed inner stitch ring */}
      <circle
        cx="60"
        cy="60"
        r="49"
        fill="none"
        stroke="#C9714F"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        opacity="0.55"
      />

      {/* Character 1: Left Smiling Square Photo Magnet (tilted left) */}
      <g transform="translate(22, 33) rotate(-8)">
        <rect
          x="0"
          y="0"
          width="36"
          height="42"
          rx="6"
          fill="#F4B6C2"
          stroke="#5B3A29"
          strokeWidth="3"
        />
        <rect
          x="5"
          y="5"
          width="26"
          height="24"
          rx="3"
          fill="#FAF3EA"
          stroke="#5B3A29"
          strokeWidth="2"
        />
        {/* Cute eyes & happy smile */}
        <circle cx="13" cy="15" r="2.2" fill="#5B3A29" />
        <circle cx="23" cy="15" r="2.2" fill="#5B3A29" />
        {/* Rosy cheeks */}
        <circle cx="10" cy="18.5" r="2" fill="#C9714F" opacity="0.6" />
        <circle cx="26" cy="18.5" r="2" fill="#C9714F" opacity="0.6" />
        <path
          d="M 14 19 Q 18 23.5 22 19"
          fill="none"
          stroke="#5B3A29"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </g>

      {/* Character 2: Right Smiling U-Shaped / Polaroid Magnet Character (tilted right) */}
      <g transform="translate(58, 30) rotate(9)">
        <rect
          x="0"
          y="0"
          width="36"
          height="42"
          rx="6"
          fill="#8FA58B"
          stroke="#5B3A29"
          strokeWidth="3"
        />
        <rect
          x="5"
          y="5"
          width="26"
          height="24"
          rx="3"
          fill="#FAF3EA"
          stroke="#5B3A29"
          strokeWidth="2"
        />
        {/* Winking & smiling face */}
        <path
          d="M 10.5 15 Q 13 12.5 15.5 15"
          fill="none"
          stroke="#5B3A29"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="23" cy="15" r="2.2" fill="#5B3A29" />
        <circle cx="10" cy="18.5" r="2" fill="#C9714F" opacity="0.6" />
        <circle cx="26" cy="18.5" r="2" fill="#C9714F" opacity="0.6" />
        <path
          d="M 13.5 19.5 Q 18 24 22.5 19.5"
          fill="none"
          stroke="#5B3A29"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </g>

      {/* Little magnetic heart spark between the two characters */}
      <path
        d="M 60 24 C 58 21, 53 21, 53 25 C 53 28, 60 32, 60 32 C 60 32, 67 28, 67 25 C 67 21, 62 21, 60 24 Z"
        fill="#C9714F"
      />

      {/* Bottom Banner Ribbon inside circle */}
      <rect
        x="16"
        y="80"
        width="88"
        height="18"
        rx="9"
        fill="#5B3A29"
      />
      <text
        x="60"
        y="92"
        textAnchor="middle"
        fill="#FAF3EA"
        fontSize="8.5"
        fontWeight="700"
        fontFamily="Fredoka, sans-serif"
        letterSpacing="0.06em"
      >
        FRIDGE MAGNETS
      </text>
    </svg>
  );
};

/**
 * Hand-drawn squiggly underline SVG for key phrases
 */
export const DoodleUnderline: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-36 h-3',
  color = '#C9714F',
}) => (
  <svg
    viewBox="0 0 200 18"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M3 13C42 4 85 16 126 7C154 2 178 13 197 8"
      stroke={color}
      strokeWidth="4.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Hand-drawn curly arrow pointing toward interactive elements
 */
export const DoodleArrow: React.FC<{ className?: string }> = ({
  className = 'w-12 h-12',
}) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M12 18 C 35 12, 55 24, 58 54"
      stroke="#5B3A29"
      strokeWidth="3"
      strokeLinecap="round"
      strokeDasharray="4 4"
    />
    <path
      d="M48 48 L 58 57 L 66 46"
      stroke="#5B3A29"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Daisy Petal SVG Frame used in the "Try It Yourself" Customizer and Hero Fridge
 */
export const DaisyMagnetFrame: React.FC<{
  imageSrc: string;
  petalColor?: string;
  size?: number;
  caption?: string;
  className?: string;
}> = ({
  imageSrc,
  petalColor = '#F4B6C2',
  size = 240,
  className = '',
}) => {
  const clipId = React.useId();
  const petals = Array.from({ length: 12 }, (_, i) => i * 30);

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 240 240"
        className="w-full h-full drop-shadow-[0_6px_0_rgba(91,58,41,0.85)]"
      >
        <defs>
          <clipPath id={clipId}>
            <circle cx="120" cy="120" r="56" />
          </clipPath>
          <radialGradient id={`${clipId}-gloss`} cx="35%" cy="25%" r="65%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.0)" />
            <stop offset="100%" stopColor="rgba(91,58,41,0.12)" />
          </radialGradient>
        </defs>

        {/* 12 Blooming Daisy Petals */}
        <g>
          {petals.map((angle) => (
            <g key={angle} transform={`rotate(${angle} 120 120)`}>
              <ellipse
                cx="120"
                cy="42"
                rx="22"
                ry="36"
                fill={petalColor}
                stroke="#5B3A29"
                strokeWidth="3.5"
              />
              {/* Subtle petal crease */}
              <line
                x1="120"
                y1="52"
                x2="120"
                y2="72"
                stroke="#5B3A29"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.35"
              />
            </g>
          ))}
        </g>

        {/* Center Photo Frame Ring */}
        <circle
          cx="120"
          cy="120"
          r="60"
          fill="#FAF3EA"
          stroke="#5B3A29"
          strokeWidth="4"
        />

        {/* User Photo inside Center Circle */}
        <image
          href={imageSrc}
          x="64"
          y="64"
          width="112"
          height="112"
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#${clipId})`}
        />

        {/* Glossy Magnet Lamination Sheen */}
        <circle
          cx="120"
          cy="120"
          r="56"
          fill={`url(#${clipId}-gloss)`}
          pointerEvents="none"
        />
      </svg>
    </div>
  );
};
