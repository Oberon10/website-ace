'use client';

import React from 'react';
import Image from 'next/image';
import { Plane, Ship, Truck, Package, TrainTrack, Home, CheckCircle2, ArrowRight, ShieldCheck, Clock, Zap } from 'lucide-react';
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
      id: 'air-freight',
      title: 'Air Freight',
      tagline: 'Priority Air Cargo Worldwide',
      desc: 'Fast and secure air cargo solutions for urgent, high-value, and time-critical global shipments.',
      image: '/images/services/air-freight.jpg',
      imageAlt: 'Commercial cargo airliner in flight for air freight logistics',
      icon: Plane,
      badge: 'Fastest Transit',
      features: ['24-72h Global Reach', 'Express Customs Clearance', 'Charter & Scheduled Flights', 'Temperature Controlled'],
      details: 'Priority air freight forwarding across 180+ global airports with dedicated flight capacity, door-to-airport or door-to-door handling, and express clearance.',
    },
    {
      id: 'sea-freight',
      title: 'Sea Freight',
      tagline: 'Global Maritime & Ocean Cargo',
      desc: 'Cost-effective ocean shipping solutions for full containers, heavy machinery, and consolidation.',
      image: '/images/services/sea-freight.jpg',
      imageAlt: 'Large container ship at sea loaded with intermodal shipping containers',
      icon: Ship,
      badge: 'Cost-Effective',
      features: ['FCL & LCL Consolidation', 'Breakbulk & Heavy Lift', 'Port Drayage & Haulage', 'Customs Brokerage'],
      details: 'Full Container Load (FCL) and Less than Container Load (LCL) consolidation across all major maritime trade lanes with port handling and inland connections.',
    },
    {
      id: 'road-transport',
      title: 'Road Transport',
      tagline: 'Reliable Overland & Fleet Haulage',
      desc: 'Flexible and secure overland trucking network providing scheduled line-hauls and cross-border transport.',
      image: '/images/services/road-transport.jpg',
      imageAlt: 'Blue semi-truck long-haul carrier for road transport',
      icon: Truck,
      badge: 'High Flexibility',
      features: ['GPS Fleet Telematics', 'FTL & LTL Line-Haul', 'Cross-Border Permits', 'Real-Time Driver Tracking'],
      details: 'Modern GPS-tracked fleet, specialized dry van and refrigerated haulage, and scheduled nationwide regional distribution connecting major industrial corridors.',
    },
    {
      id: 'warehousing',
      title: 'Warehousing',
      tagline: 'Safe & Modern Storage Facilities',
      desc: 'Bonded high-bay storage facilities with inventory management, fulfillment, and 24/7 security.',
      image: '/images/services/warehousing.jpg',
      imageAlt: 'Logistics warehouse interior with stacked pallet boxes and inventory workers',
      icon: Package,
      badge: '24/7 Monitored',
      features: ['Automated WMS Tracking', 'Bonded & Secure Facilities', 'Pick, Pack & Dispatch', 'Climate Regulated'],
      details: 'Strategically located fulfillment centers equipped with automated pallet racking, barcode scanning, and multi-tier climate-controlled storage zones.',
    },
    {
      id: 'freight-forwarding',
      title: 'Freight Forwarding',
      tagline: 'End-to-End Intermodal Logistics',
      desc: 'Multimodal freight coordination connecting rail, ocean, air, and road under a single bill of lading.',
      image: '/images/services/freight-forwarding.jpg',
      imageAlt: 'Freight train locomotive hauling cargo containers on rail tracks',
      icon: TrainTrack,
      badge: 'Multimodal',
      features: ['Rail & Intermodal Routes', 'Customs & Documentation', 'Cargo Insurance Coverage', 'Global Partner Network'],
      details: 'Comprehensive end-to-end multimodal documentation, rail freight corridors, export/import tariffs, and complete international supply chain orchestration.',
    },
    {
      id: 'door-to-door',
      title: 'Door-to-Door Delivery',
      tagline: 'From Pickup to Delivery, We Got You Covered',
      desc: 'Seamless last-mile courier delivery from origin directly to your recipient’s doorstep with electronic proof of delivery.',
      image: '/images/services/door-to-door.jpg',
      imageAlt: 'Courier delivering package to residential front door',
      icon: Home,
      badge: 'Direct Delivery',
      features: ['Direct Sender Pickup', 'Electronic Proof of Delivery', 'Scheduled Time Windows', 'White-Glove Handling'],
      details: 'Eliminate intermediate handling with dedicated direct-to-door courier dispatch, signature confirmation, and instant customer milestone notifications.',
    },
  ];

  const handleBookService = () => {
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#070d17] transition-colors selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* 1. Header / Hero Banner matching mockup with cinematic port dusk imagery */}
        <section className="relative w-full min-h-[320px] sm:min-h-[380px] lg:min-h-[420px] flex items-center overflow-hidden bg-[#071324]">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/port-dusk-banner.jpg"
              alt="ACE Global Logistics port cranes and terminal containers at dusk"
              fill
              priority
              className="object-cover object-center opacity-85"
              sizes="100vw"
            />
            {/* Cinematic dark overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#071324]/95 via-[#071324]/80 to-transparent lg:w-3/5 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071324]/60 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
            <div className="max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-sm">
                <Zap className="w-3.5 h-3.5 text-blue-400" />
                <span>Enterprise Global Logistics</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4 drop-shadow-md">
                Our Services
              </h1>
              <p className="text-base sm:text-lg text-slate-200/90 leading-relaxed font-normal max-w-xl drop-shadow">
                Comprehensive, tech-driven supply chain and logistics solutions tailored to keep your business ahead.
              </p>
            </div>
          </div>
        </section>

        {/* 2. 6-Card Services Grid with Photographic Imagery */}
        <section className="py-16 sm:py-20 bg-slate-50/80 dark:bg-[#09111e] transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <span className="text-blue-600 dark:text-blue-400 font-bold text-xs sm:text-sm tracking-widest uppercase">
                What We Deliver
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-2">
                Engineered for Speed, Reliability & Scale
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3">
                Select any service below to request an instant quote, schedule cargo dispatch, or explore customized transport contracts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="group bg-white dark:bg-[#0e1726] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
                  >
                    {/* Top Photographic Header */}
                    <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-950">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

                      {/* Floating Category Pill */}
                      <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-xs font-bold text-slate-900 dark:text-white shadow-md">
                        <Icon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>{item.title}</span>
                      </div>

                      {/* Badge / Trait */}
                      <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-600/90 text-white text-[11px] font-semibold backdrop-blur-sm shadow-md">
                        <ShieldCheck className="w-3 h-3" />
                        <span>{item.badge}</span>
                      </div>

                      {/* Bottom overlay title */}
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
                          {item.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                          {item.desc}
                        </p>

                        {/* Feature Checklist */}
                        <div className="grid grid-cols-2 gap-2 mb-6 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                          {item.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                              <span className="truncate">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <button
                          onClick={handleBookService}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 uppercase tracking-wider group-hover:translate-x-1 transition-all"
                        >
                          <span>Request Quote</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                          Active Dispatch
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. Bottom Section: "Why Choose Our Services?" matching mockup */}
        <section className="py-16 sm:py-20 bg-white dark:bg-[#070d17] transition-colors border-t border-slate-100 dark:border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: 3 Value Checkmarks matching mockup */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-xs sm:text-sm tracking-widest uppercase">
                    ACE Global Advantage
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                    Why Choose Our Services?
                  </h2>
                </div>

                <div className="space-y-4 pt-2">
                  {[
                    { title: 'Reliable & On-Time Delivery', desc: 'Over 99.4% on-schedule fulfillment rate backed by automated dispatch telematics.' },
                    { title: 'Secure & Professional Handling', desc: 'ISO 9001 and IATA cargo-certified handling protocols with comprehensive marine cover.' },
                    { title: 'Competitive Pricing', desc: 'Direct carrier volume tariffs without intermediary markups or hidden fees.' },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3.5 group">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors mt-0.5">
                        <CheckCircle2 className="w-4 h-4 fill-current text-white dark:text-slate-900 group-hover:text-white" />
                      </div>
                      <div>
                        <span className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200 block">
                          {item.title}
                        </span>
                        <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-normal block">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed pt-2 max-w-md">
                  From critical aerospace equipment to containerized maritime trade, our dedicated operations center delivers precision coordination 24 hours a day, 7 days a week.
                </p>
              </div>

              {/* Right Column: Global Partner Card with Airplane Photo matching mockup */}
              <div className="lg:col-span-6">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[300px] sm:h-[340px] flex items-center p-8 sm:p-12 border border-slate-200 dark:border-slate-800">
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
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 text-xs font-semibold mb-3">
                      <Clock className="w-3.5 h-3.5" />
                      <span>24/7 Global Forwarding</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black leading-snug mb-2">
                      Your Global Logistics Partner
                    </h3>
                    <p className="text-sm text-slate-200 mb-6 font-normal">
                      Moving your business forward, always.
                    </p>
                    <button
                      onClick={() => setIsBookingOpen(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition active:scale-[0.98] group"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
