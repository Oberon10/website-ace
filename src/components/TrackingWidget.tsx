'use client';

import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { useApp } from '@/lib/store';

export default function TrackingWidget() {
  const [trackingInput, setTrackingInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { openTrackingModal, getShipmentByTracking } = useApp();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = trackingInput.trim().toUpperCase();
    if (!clean) {
      setErrorMsg('Please enter a valid tracking number');
      return;
    }

    const found = getShipmentByTracking(clean);
    if (!found) {
      setErrorMsg(`Tracking #${clean} not found. Try one of our demo numbers: ACE123456, ACE789012, or ACE456789.`);
      return;
    }

    setErrorMsg('');
    openTrackingModal(clean);
  };

  const setSample = (num: string) => {
    setTrackingInput(num);
    setErrorMsg('');
    openTrackingModal(num);
  };

  return (
    <section id="tracking-section" className="relative z-20 py-8 bg-slate-50 dark:bg-[#070d17] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#eff6ff] to-[#f0f9ff] dark:from-[#0b1626] dark:to-[#0f213a] rounded-2xl p-6 sm:p-8 lg:p-10 border border-blue-100 dark:border-blue-900/40 shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Left information block */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 dark:bg-blue-500/20 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Track Your Shipment
                </h2>
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1 max-w-md">
                  Enter your tracking number to get real-time updates on your shipment status.
                </p>
              </div>
            </div>

            {/* Right input & action block */}
            <div className="w-full lg:max-w-xl">
              <form onSubmit={handleTrack} className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={trackingInput}
                    onChange={(e) => {
                      setTrackingInput(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="Enter tracking number (e.g. ACE123456)"
                    className="w-full px-5 py-3.5 rounded-xl bg-white dark:bg-[#070d17] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base shadow-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-md transition active:scale-[0.98]"
                >
                  <Search className="w-4 h-4" />
                  <span>Track Now</span>
                </button>
              </form>

              {/* Error message */}
              {errorMsg && (
                <p className="mt-2 text-xs sm:text-sm text-red-600 dark:text-red-400 font-medium">
                  {errorMsg}
                </p>
              )}

              {/* Demo quick links */}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-medium">Quick Demo Samples:</span>
                <button
                  type="button"
                  onClick={() => setSample('ACE123456')}
                  className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:underline font-mono"
                >
                  ACE123456 (Air)
                </button>
                <button
                  type="button"
                  onClick={() => setSample('ACE789012')}
                  className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:underline font-mono"
                >
                  ACE789012 (Sea)
                </button>
                <button
                  type="button"
                  onClick={() => setSample('ACE456789')}
                  className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:underline font-mono"
                >
                  ACE456789 (Road)
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
