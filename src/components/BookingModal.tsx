'use client';

import React, { useState } from 'react';
import { X, Plane, Ship, Truck, Package, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/lib/store';
import { ServiceType } from '@/lib/types';

export default function BookingModal() {
  const { isBookingOpen, setIsBookingOpen, createShipment, openTrackingModal } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [createdTracking, setCreatedTracking] = useState<string | null>(null);

  // Form states
  const [senderName, setSenderName] = useState('Sarah Jenkins');
  const [senderCity, setSenderCity] = useState('London, UK');
  const [senderAddress, setSenderAddress] = useState('12 King William Street');

  const [recipientName, setRecipientName] = useState('Acme Global Imports');
  const [recipientCity, setRecipientCity] = useState('New York, USA');
  const [recipientAddress, setRecipientAddress] = useState('450 5th Avenue, Suite 800');

  const [serviceType, setServiceType] = useState<ServiceType>('air');
  const [weightKg, setWeightKg] = useState(45);
  const [pieces, setPieces] = useState(2);
  const [dimensions, setDimensions] = useState('60x40x40 cm');

  if (!isBookingOpen) return null;

  // Pricing calculation
  const getRatePerKg = () => {
    switch (serviceType) {
      case 'air': return 8.5;
      case 'sea': return 2.2;
      case 'road': return 3.4;
      default: return 1.8;
    }
  };

  const calculatedCost = Math.round(weightKg * getRatePerKg() + 50);

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const trackingNumber = `ACE${randomDigits}`;

    createShipment({
      tracking_number: trackingNumber,
      sender_name: senderName,
      sender_address: senderAddress,
      sender_city: senderCity,
      recipient_name: recipientName,
      recipient_address: recipientAddress,
      recipient_city: recipientCity,
      origin: senderCity,
      destination: recipientCity,
      service_type: serviceType,
      status: 'picked_up',
      weight_kg: Number(weightKg),
      pieces: Number(pieces),
      dimensions: dimensions,
      price: calculatedCost,
      currency: 'USD',
      estimated_delivery: new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0] + ' 18:00',
      current_location: `${senderCity} Regional Depot`,
    });

    setCreatedTracking(trackingNumber);
    setStep(3);
  };

  const resetAndClose = () => {
    setIsBookingOpen(false);
    setStep(1);
    setCreatedTracking(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0e1726] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Step Indicator */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
            step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
          }`}>
            1
          </div>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Route &amp; Contact</span>
          <span className="text-slate-300 dark:text-slate-700">───</span>

          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
            step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
          }`}>
            2
          </div>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Cargo &amp; Freight</span>
          <span className="text-slate-300 dark:text-slate-700">───</span>

          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
            step === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
          }`}>
            3
          </div>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Confirmed</span>
        </div>

        {/* STEP 1: Route & Contacts */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Origin &amp; Destination Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Sender */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#070d17] border border-slate-200 dark:border-slate-800 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Origin (Shipper)
                </p>
                <div>
                  <label className="text-xs text-slate-500 font-medium">Shipper / Sender Name</label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-white dark:bg-[#0e1726] border border-slate-200 dark:border-slate-700 text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 font-medium">Origin City &amp; Country</label>
                  <input
                    type="text"
                    value={senderCity}
                    onChange={(e) => setSenderCity(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-white dark:bg-[#0e1726] border border-slate-200 dark:border-slate-700 text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 font-medium">Pickup Street Address</label>
                  <input
                    type="text"
                    value={senderAddress}
                    onChange={(e) => setSenderAddress(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-white dark:bg-[#0e1726] border border-slate-200 dark:border-slate-700 text-sm"
                  />
                </div>
              </div>

              {/* Recipient */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#070d17] border border-slate-200 dark:border-slate-800 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Destination (Consignee)
                </p>
                <div>
                  <label className="text-xs text-slate-500 font-medium">Recipient / Company Name</label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-white dark:bg-[#0e1726] border border-slate-200 dark:border-slate-700 text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 font-medium">Destination City &amp; Country</label>
                  <input
                    type="text"
                    value={recipientCity}
                    onChange={(e) => setRecipientCity(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-white dark:bg-[#0e1726] border border-slate-200 dark:border-slate-700 text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 font-medium">Delivery Street Address</label>
                  <input
                    type="text"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-white dark:bg-[#0e1726] border border-slate-200 dark:border-slate-700 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow transition"
              >
                <span>Continue to Cargo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Cargo & Service Type */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Cargo Specifications &amp; Transport Mode
            </h3>

            {/* Freight mode selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { type: 'air' as ServiceType, label: 'Air Freight', icon: Plane },
                { type: 'sea' as ServiceType, label: 'Sea Freight', icon: Ship },
                { type: 'road' as ServiceType, label: 'Road Transport', icon: Truck },
                { type: 'warehousing' as ServiceType, label: 'Warehousing', icon: Package },
              ].map((opt) => {
                const Icon = opt.icon;
                const isSelected = serviceType === opt.type;
                return (
                  <button
                    key={opt.type}
                    type="button"
                    onClick={() => setServiceType(opt.type)}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-xs">{opt.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Weights & dimensions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="text-xs text-slate-500 font-medium">Weight (kg)</label>
                <input
                  type="number"
                  min="1"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-white dark:bg-[#070d17] border border-slate-200 dark:border-slate-700 text-sm font-semibold"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 font-medium">No. of Packages</label>
                <input
                  type="number"
                  min="1"
                  value={pieces}
                  onChange={(e) => setPieces(Number(e.target.value))}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-white dark:bg-[#070d17] border border-slate-200 dark:border-slate-700 text-sm font-semibold"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 font-medium">Dimensions (LxWxH cm)</label>
                <input
                  type="text"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-white dark:bg-[#070d17] border border-slate-200 dark:border-slate-700 text-sm font-semibold"
                />
              </div>
            </div>

            {/* Instant Price estimate pill */}
            <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Guaranteed All-Inclusive Quote</p>
                <p className="text-2xl font-black text-blue-600 dark:text-blue-400">
                  ${calculatedCost} <span className="text-xs text-slate-500 font-normal">USD</span>
                </p>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-blue-600 text-white font-semibold">
                Fuel + Customs Included
              </span>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleCompleteBooking}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow transition"
              >
                Confirm &amp; Generate Waybill
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Success Confirmation */}
        {step === 3 && createdTracking && (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Shipment Successfully Booked!
            </h3>

            <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto">
              Your consignment is booked with ACE Global Logistics. A pickup driver has been automatically scheduled.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#070d17] border border-slate-200 dark:border-slate-800 max-w-sm mx-auto">
              <p className="text-xs text-slate-400 uppercase font-bold">Your Tracking Number</p>
              <p className="text-2xl font-mono font-black text-blue-600 dark:text-blue-400 mt-1">
                {createdTracking}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  resetAndClose();
                  openTrackingModal(createdTracking);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow transition"
              >
                Open Live Tracking View
              </button>
              <button
                type="button"
                onClick={resetAndClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
