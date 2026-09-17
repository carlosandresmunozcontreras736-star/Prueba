import React from 'react';

interface DavibankLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'color' | 'white';
}

export const DavibankLogo: React.FC<DavibankLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'color',
}) => {
  // Proportions matching the official Davibank logo image (435 x 195 viewBox)
  const sizeMap = {
    xs: { width: 70, height: 31 },
    sm: { width: 95, height: 42 },
    md: { width: 140, height: 63 },
    lg: { width: 190, height: 85 },
    xl: { width: 260, height: 116 },
  };

  const { width, height } = sizeMap[size];
  const redColor = variant === 'white' ? '#FFFFFF' : '#E10613';
  const bankColor = variant === 'white' ? '#F8FAFC' : '#33424B';

  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 435 195"
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto h-full max-h-full"
      >
        {/* Top row: DAVI in official Davibank red with fluid rounded strokes */}
        <g
          stroke={redColor}
          strokeWidth="17.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          {/* D: Open signature contour with roof overhang, right bowl and inner vertical bar */}
          <path d="M 22 29 C 40 25, 78 24, 106 26 C 136 28, 154 50, 154 71 C 154 94, 134 114, 102 114 C 74 114, 48 113, 36 107 C 30 102, 29 95, 29 84 L 29 48" />

          {/* A: Inverted chevron with rounded apex */}
          <path d="M 158 114 C 166 94, 188 38, 198 27 C 201 24, 207 24, 210 27 C 220 38, 242 94, 250 114" />

          {/* V: Rounded trough */}
          <path d="M 270 27 C 278 47, 300 103, 310 114 C 313 117, 319 117, 322 114 C 332 103, 354 47, 362 27" />

          {/* I: Straight vertical pillar */}
          <path d="M 396 27 L 396 114" />
        </g>

        {/* Bottom row: 'bank' aligned under V and I in corporate dark slate */}
        <text
          x="234"
          y="182"
          fill={bankColor}
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
          fontSize="68"
          fontWeight="800"
          letterSpacing="-1.5px"
        >
          bank
        </text>
      </svg>
    </div>
  );
};
