'use client';

import React from 'react';
import { Plane, Ship, Truck, Package } from 'lucide-react';
import { useApp } from '@/lib/store';

export default function ServicesBar() {
  const { setIsBookingOpen } = useApp();

  const services = [
    {
      title: 'Air Freight',
      desc: 'Fast and secure air cargo for urgent deliveries.',
      icon: Plane,
      color: 'bg-sky-100 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400',
    },
    {
      title: 'Sea Freight',
      desc: 'Cost-effective shipping for large consignments.',
      icon: Ship,
      color: 'bg-sky-100 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400',
    },
    {
      title: 'Road Transport',
      desc: 'Reliable and flexible land transportation.',
      icon: Truck,
      color: 'bg-sky-100 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400',
    },
    {
      title: 'Warehousing',
      desc: 'Safe and modern storage for your goods.',
      icon: Package,
      color: 'bg-sky-100 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400',
    },
  ];

  return (
    <section id="services" className="relative z-20 py-10 bg-slate-50 dark:bg-[#070d17] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                onClick={() => setIsBookingOpen(true)}
                className="group p-6 rounded-2xl bg-white dark:bg-[#0e1726] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4 cursor-pointer transform hover:-translate-y-1"
              >
                {/* Circular Icon badge matching mockup */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
