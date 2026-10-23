'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, Search, CheckCircle2, Clock, Truck, Package, ArrowRight, Printer } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TrackingModal from '@/components/TrackingModal';
import BookingModal from '@/components/BookingModal';
import AuthModal from '@/components/AuthModal';
import { useApp } from '@/lib/store';
import { Shipment } from '@/lib/types';

export default function TrackingPage() {
  const { getShipmentByTracking, openTrackingModal } = useApp();

  const [trackingInput, setTrackingInput] = useState('ACE123456');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeShipment, setActiveShipment] = useState<Shipment | null>(() => getShipmentByTracking('ACE123456') || null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = trackingInput.trim().toUpperCase();
    if (!clean) {
      setErrorMsg('Please enter a valid tracking number.');
      return;
    }

    const found = getShipmentByTracking(clean);
    if (!found) {
      setErrorMsg(`Tracking number '${clean}' not found. Please try one of our demo numbers: ACE123456, ACE789012, or ACE456789.`);
      setActiveShipment(null);
      return;
    }

    setErrorMsg('');
    setActiveShipment(found);
  };

  const handleSelectSample = (num: string) => {
    setTrackingInput(num);
    setErrorMsg('');
    const found = getShipmentByTracking(num);
    if (found) {
      setActiveShipment(found);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 dark:bg-[#070d17] transition-colors selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1">
        
        {/* 1. Header Banner matching Panel 3 */}
        <section className="relative w-full min-h-[280px] sm:min-h-[340px] flex items-center overflow-hidden bg-[#071324]">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/port-dusk-banner.jpg"
              alt="ACE Global Logistics container terminal cranes and shipping containers"
              fill
              priority
              className="object-cover object-center opacity-90"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071324]/90 via-[#071324]/75 to-transparent lg:w-3/5 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071324]/50 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
            <div className="max-w-2xl text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4 drop-shadow-md">
                Track Your Shipment
              </h1>
              <p className="text-base sm:text-lg text-slate-200/90 leading-relaxed font-normal max-w-xl drop-shadow">
                Get real-time updates on your shipment status.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Tracking Core Section (2-Column Grid matching mockup) */}
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Enter Tracking Details Card */}
              <div className="lg:col-span-7 bg-white dark:bg-[#0e1726] rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                      Enter Tracking Details
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Enter your tracking number below to check the status of your shipment.
                    </p>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleTrack} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      value={trackingInput}
                      onChange={(e) => {
                        setTrackingInput(e.target.value);
                        if (errorMsg) setErrorMsg('');
                      }}
                      placeholder="Enter tracking number (e.g. ACE123456)"
                      className="w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-[#070d17] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base font-mono"
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-xs sm:text-sm text-red-600 dark:text-red-400 font-medium">
                      {errorMsg}
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow transition active:scale-[0.98]"
                    >
                      Track Shipment
                    </button>

                    {/* Presets */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                      <span className="font-semibold text-slate-400">Samples:</span>
                      <button
                        type="button"
                        onClick={() => handleSelectSample('ACE123456')}
                        className="px-2 py-1 rounded bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-blue-950/60 font-mono text-blue-600 dark:text-blue-400 transition"
                      >
                        ACE123456
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectSample('ACE789012')}
                        className="px-2 py-1 rounded bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-blue-950/60 font-mono text-blue-600 dark:text-blue-400 transition"
                      >
                        ACE789012
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectSample('ACE456789')}
                        className="px-2 py-1 rounded bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-blue-950/60 font-mono text-blue-600 dark:text-blue-400 transition"
                      >
                        ACE456789
                      </button>
                    </div>
                  </div>
                </form>

                {/* Live Shipment Details Card (when active) */}
                {activeShipment && (
                  <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div>
                        <span className="text-xs uppercase font-bold text-slate-400">Waybill Consignment</span>
                        <h3 className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white">
                          {activeShipment.tracking_number}
                        </h3>
                      </div>
                      <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                        {activeShipment.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#070d17] border border-slate-200 dark:border-slate-800/80 mb-6">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                        <div>
                          <p className="text-slate-400">Origin</p>
                          <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{activeShipment.origin}</p>
                        </div>
                        <div className="text-center font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider text-[11px]">
                          {activeShipment.service_type} FREIGHT
                        </div>
                        <div className="sm:text-right">
                          <p className="text-slate-400">Destination</p>
                          <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{activeShipment.destination}</p>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                        <span>Current: <strong className="text-slate-900 dark:text-white">{activeShipment.current_location}</strong></span>
                        <span>ETA: <strong className="text-blue-600 dark:text-blue-400">{activeShipment.estimated_delivery}</strong></span>
                      </div>
                    </div>

                    {/* Timeline Preview */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Recent Checkpoint History
                      </h4>
                      {activeShipment.checkpoints.slice(0, 3).map((cp) => (
                        <div key={cp.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#070d17] text-xs">
                          <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                          <div className="flex-1">
                            <p className="font-bold text-slate-900 dark:text-white">{cp.title}</p>
                            <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">{cp.location} • {cp.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={() => openTrackingModal(activeShipment.tracking_number)}
                        className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 transition"
                      >
                        <span>View Full Interactive Modal &amp; Print Waybill</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Right Column: Shipment Status Guide matching Panel 3 */}
              <div className="lg:col-span-5 bg-white dark:bg-[#0e1726] rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                  Shipment Status Guide
                </h3>

                {/* Vertical Step-by-Step Tracker matching mockup */}
                <div className="space-y-8 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-blue-100 dark:before:bg-blue-900/60">
                  
                  {/* Step 1: Shipment Received */}
                  <div className="relative flex items-start gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md ring-4 ring-blue-50 dark:ring-blue-950/60 z-10">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        Shipment Received
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Your shipment has been received.
                      </p>
                    </div>
                  </div>

                  {/* Step 2: In Transit */}
                  <div className="relative flex items-start gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md ring-4 ring-blue-50 dark:ring-blue-950/60 z-10">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        In Transit
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Your shipment is on the move.
                      </p>
                    </div>
                  </div>

                  {/* Step 3: Out for Delivery */}
                  <div className="relative flex items-start gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border-2 border-blue-600 flex items-center justify-center shrink-0 shadow-sm z-10">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        Out for Delivery
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Your shipment is out for delivery.
                      </p>
                    </div>
                  </div>

                  {/* Step 4: Delivered */}
                  <div className="relative flex items-start gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center shrink-0 shadow-sm z-10">
                      <Package className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-700 dark:text-slate-300">
                        Delivered
                      </h4>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                        Your shipment has been delivered.
                      </p>
                    </div>
                  </div>

                </div>

                {/* Additional Help Callout */}
                <div className="mt-10 p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 text-xs">
                  <p className="font-bold text-blue-900 dark:text-blue-300 mb-1">
                    Need Custom Clearance Assistance?
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    If your shipment has a customs hold notification, contact our port dispatch team with your waybill number at <span className="font-semibold text-blue-600 dark:text-blue-400">customs@ace-logistics.com</span>.
                  </p>
                </div>

              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
      <TrackingModal />
      <BookingModal />
      <AuthModal />
    </div>
  );
}
