'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Clock, Globe, Headphones, Play } from 'lucide-react';
import { useApp } from '@/lib/store';

export default function WhyChooseUs() {
  const { setIsVideoModalOpen } = useApp();

  const features = [
    {
      title: 'Safe & Secure',
      desc: 'Your goods are always protected.',
      icon: ShieldCheck,
    },
    {
      title: 'On Time',
      desc: 'We keep our promises.',
      icon: Clock,
    },
    {
      title: 'Global Reach',
      desc: 'Connecting you to the world.',
      icon: Globe,
    },
    {
      title: '24/7 Support',
      desc: "We're here when you need us.",
      icon: Headphones,
    },
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-[#09111e] transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Why Choose ACE */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            <p className="text-xs sm:text-sm font-bold tracking-[0.15em] text-blue-600 dark:text-blue-400 uppercase mb-3">
              WHY CHOOSE ACE GLOBAL LOGISTICS
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-6">
              We Move More<br />
              Than <span className="text-blue-600 dark:text-blue-400">Just Packages</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-10 max-w-xl">
              With years of experience and a global network, we deliver more than cargo — we deliver trust, speed and peace of mind.
            </p>

            {/* 4 Feature Pillars Grid matching mockup */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-2">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="flex flex-col items-start text-left group">
                    <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-1">
                      {f.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                      {f.desc}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Terminal Worker Photo + Floating Glass Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800">
              
              {/* Main Worker Photograph */}
              <div className="relative h-[380px] sm:h-[460px] w-full">
                <Image
                  src="/images/worker-terminal.jpg"
                  alt="ACE Global Logistics terminal operations coordinator at container port"
                  fill
                  className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Floating Dark Glass Card matching user image */}
              <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 bg-[#0b1a30]/90 backdrop-blur-md border border-white/20 text-white p-6 rounded-2xl shadow-2xl max-w-xs transition-transform hover:scale-105">
                <p className="text-lg font-bold leading-snug mb-4">
                  Logistics that moves your world
                </p>

                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  className="inline-flex items-center gap-3 group text-sm font-semibold text-slate-200 hover:text-white transition-colors"
                >
                  <span className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center shadow group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </span>
                  <span>Watch Our Story</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
