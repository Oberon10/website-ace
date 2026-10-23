'use client';

import React from 'react';
import Image from 'next/image';
import { Plane, Ship, Truck, Package, Globe, CheckCircle2, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import AuthModal from '@/components/AuthModal';
import TrackingModal from '@/components/TrackingModal';
import { useApp } from '@/lib/store';

export default function ServicesPage() {
  const { setIsBookingOpen } = useApp();

  const services = [
    {
      id: 'air',
      title: 'Air Freight',
      desc: 'Fast and secure air cargo worldwide.',
      icon: Plane,
      details: 'Priority air freight forwarding across 180+ global airports with temperature-controlled capacity and express customs clearance.',
    },
    {
      id: 'sea',
      title: 'Sea Freight',
      desc: 'Cost-effective ocean shipping solutions.',
      icon: Ship,
      details: 'Full Container Load (FCL) and Less than Container Load (LCL) consolidation across all major maritime trade lanes.',
    },
    {
      id: 'road',
      title: 'Road Transport',
      desc: 'Reliable and flexible land transport.',
      icon: Truck,
      details: 'Cross-border overland fleet, specialized haulage, GPS-tracked telematics, and scheduled nationwide regional distribution.',
    },
    {
      id: 'warehousing',
      title: 'Warehousing',
      desc: 'Safe and modern storage facilities.',
      icon: Package,
      details: 'Bonded and non-bonded high-bay fulfillment centers with inventory management systems, barcode tracking, and 24/7 security.',
    },
    {
      id: 'freight-forwarding',
      title: 'Freight Forwarding',
      desc: 'End-to-end logistics management.',
      icon: Globe,
      details: 'Comprehensive multimodal documentation, customs brokerage, bill of lading issuance, and global supply chain orchestration.',
    },
    {
      id: 'door-to-door',
      title: 'Door-to-Door Delivery',
      desc: "From pickup to delivery, we've got you covered.",
      icon: CheckCircle2,
      details: 'Seamless last-mile courier delivery directly to your recipient’s doorstep with real-time electronic proof of delivery.',
    },
  ];

  const handleLearnMore = () => {
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#070d17] transition-colors selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1">
        
        {/* 1. Header / Hero Banner matching panel 2 mockup */}
        <section className="relative w-full min-h-[300px] sm:min-h-[360px] lg:min-h-[400px] flex items-center overflow-hidden bg-[#071324]">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/port-dusk-banner.jpg"
              alt="ACE Global Logistics port cranes and terminal containers at dusk"
              fill
              priority
              className="object-cover object-center opacity-90"
              sizes="100vw"
            />
            {/* Cinematic dark overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#071324]/90 via-[#071324]/75 to-transparent lg:w-3/5 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071324]/50 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
            <div className="max-w-2xl text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4 drop-shadow-md">
                Our Services
              </h1>
              <p className="text-base sm:text-lg text-slate-200/90 leading-relaxed font-normal max-w-xl drop-shadow">
                Comprehensive logistics solutions tailored to your needs.
              </p>
            </div>
          </div>
        </section>

        {/* 2. 6-Card Services Grid (2 rows x 3 columns) */}
        <section className="py-16 sm:py-20 bg-slate-50/70 dark:bg-[#09111e] transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {services.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="group bg-white dark:bg-[#0e1726] rounded-2xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
                  >
                    <div>
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                        <Icon className="w-7 h-7" />
                      </div>

                      {/* Title & Desc */}
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        {item.desc}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 leading-normal mb-6">
                        {item.details}
                      </p>
                    </div>

                    {/* Learn More link */}
                    <div>
                      <button
                        onClick={handleLearnMore}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 uppercase tracking-wider group-hover:translate-x-1 transition-all"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. Bottom Section: "Why Choose Our Services?" */}
        <section className="py-16 sm:py-20 bg-white dark:bg-[#070d17] transition-colors border-t border-slate-100 dark:border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: 3 Value Checkmarks matching mockup */}
              <div className="lg:col-span-6 space-y-6">
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  Why Choose Our Services?
                </h2>

                <div className="space-y-4 pt-2">
                  {[
                    'Reliable & On-Time Delivery',
                    'Secure & Professional Handling',
                    'Competitive Pricing',
                  ].map((text) => (
                    <div key={text} className="flex items-center gap-3.5 group">
                      <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <CheckCircle2 className="w-4 h-4 fill-current text-white dark:text-slate-900 group-hover:text-white" />
                      </div>
                      <span className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200">
                        {text}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed pt-2 max-w-md">
                  From critical aerospace parts to regular commercial container logistics, our ISO-certified protocols guarantee precision handling from departure to destination.
                </p>
              </div>

              {/* Right Column: Global Partner Card with Airplane Photo */}
              <div className="lg:col-span-6">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[280px] sm:h-[320px] flex items-center p-8 sm:p-12 border border-slate-200 dark:border-slate-800">
                  {/* Background Airplane Photo */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src="/images/airplane-sky.jpg"
                      alt="Airplane soaring in sky representing global logistics reach"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#071730]/95 via-[#071730]/80 to-transparent" />
                  </div>

                  {/* Card Content matching mockup */}
                  <div className="relative z-10 max-w-sm text-white">
                    <h3 className="text-2xl sm:text-3xl font-black leading-snug mb-2">
                      Your Global Logistics Partner
                    </h3>
                    <p className="text-sm text-slate-200 mb-6 font-normal">
                      Moving your business forward, always.
                    </p>
                    <button
                      onClick={() => setIsBookingOpen(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition active:scale-[0.98]"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
      <BookingModal />
      <AuthModal />
      <TrackingModal />
    </div>
  );
}
