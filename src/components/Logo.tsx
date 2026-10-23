'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark' | 'auto';
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group ${className}`}>
      {/* ACE Graphic Symbol */}
      <div className="relative flex items-center justify-center">
        <svg
          viewBox="0 0 160 55"
          className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stylized ACE with speed forward streak */}
          <path
            d="M5 45L22 8H35L48 45H36L32.5 35H18.5L16 45H5ZM21.5 26.5H29.5L25.5 15.5L21.5 26.5Z"
            fill="#1877F2"
          />
          {/* C with forward arrow cut */}
          <path
            d="M78 18C74 10 65 7 56 9C45 11 39 21 39 30C39 39 46 47 57 47C65 47 72 43 76 36L66 31C64 34 60 37 56 37C49 37 46 32 46 28C46 23 50 18 56 18C60 18 64 21 66 24L78 18Z"
            fill="#0F284E"
            className="dark:fill-white"
          />
          {/* Dynamic forward arrow across C */}
          <path
            d="M32 27L82 27L74 21H60L72 27L60 33H74L82 27"
            fill="#1877F2"
          />
          {/* E */}
          <path
            d="M84 9H114V17H94V23H110V31H94V37H115V45H84V9Z"
            fill="#0F284E"
            className="dark:fill-white"
          />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col leading-tight select-none">
        <span className="text-xl font-extrabold tracking-tight text-[#0b1a30] dark:text-white">
          Global Logistics
        </span>
        <span className="text-[10px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
          Fast / Reliable / Secure
        </span>
      </div>
    </Link>
  );
}
