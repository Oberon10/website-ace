'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, MapPin } from 'lucide-react';
import { useApp } from '@/lib/store';

export default function HeroSection() {
  const { setIsBookingOpen } = useApp();

  const scrollToTracking = () => {
    const el = document.getElementById('tracking-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden bg-[#071324]">
      {/* Background Logistics Image (Airplane, Cargo Ship, White Truck) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-logistics.jpg"
          alt="ACE Global Logistics multimodal shipping fleet with ship, truck, and air cargo"
          fill
          priority
          className="object-cover object-center lg:object-[center_right] opacity-95"
          sizes="100vw"
        />
        {/* Cinematic gradient overlay matching reference design */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071324]/95 via-[#071324]/80 to-transparent lg:w-3/5 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071324]/60 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-xl text-left">
          
          {/* Subtitle tag */}
          <p className="text-xs sm:text-sm font-bold tracking-[0.2em] text-blue-200/90 uppercase mb-4 drop-shadow-sm">
            INTERNATIONAL &amp; LOCAL LOGISTICS SOLUTIONS
          </p>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-md">
            Your Cargo,<br />
            <span className="text-[#2b82f6] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">
              Our Priority
            </span>
          </h1>

          {/* Body Paragraph */}
          <p className="text-base sm:text-lg text-slate-200/90 leading-relaxed font-normal mb-8 max-w-lg drop-shadow">
            ACE Global Logistics provides fast, reliable and secure shipping solutions for individuals and businesses, locally and internationally.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Primary Button */}
            <button
              onClick={() => setIsBookingOpen(true)}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-blue-900/40 hover:shadow-blue-600/30 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Book a Shipment</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Secondary Button */}
            <button
              onClick={scrollToTracking}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#0b1c34]/80 hover:bg-[#122849] text-white border border-slate-600/60 hover:border-blue-400 font-semibold text-sm sm:text-base backdrop-blur-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>Track Your Shipment</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
