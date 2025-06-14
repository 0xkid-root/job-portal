import React from 'react';
import { Circle } from 'lucide-react';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex items-center space-x-2 ${className || ''}`}>
      {/* Icon: Stylized "C" with a central dot */}
      <div className="relative flex items-center justify-center w-10 h-10">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="CorpConnect Talent Logo"
        >
          {/* Outer "C" shape with gradient */}
          <path
            d="M32 20C32 12.268 26.732 6 20 6C13.268 6 8 12.268 8 20C8 27.732 13.268 34 20 34"
            stroke="url(#grad)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Central dot */}
          <circle cx="20" cy="20" r="3" fill="#F97316" />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="grad" x1="8" y1="6" x2="32" y2="34" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1E3A8A" />
              <stop offset="1" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {/* Company Name */}
      <span className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
      HireSphere IT
      </span>
    </div>
  );
};

export default Logo;