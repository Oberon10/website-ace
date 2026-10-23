'use client';

import React from 'react';
import { X, CheckCircle2, Clock, AlertCircle, Plane, Ship, Truck, Package, ArrowRight, Printer, Share2 } from 'lucide-react';
import { useApp } from '@/lib/store';
import { ShipmentStatus } from '@/lib/types';

export default function TrackingModal() {
  const { trackingModalNumber, closeTrackingModal, getShipmentByTracking } = useApp();

  if (!trackingModalNumber) return null;

  const shipment = getShipmentByTracking(trackingModalNumber);

  const getStatusColor = (status: ShipmentStatus) => {
    switch (status) {
      case 'delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800';
      case 'in_transit':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-400 dark:border-blue-800';
      case 'out_for_delivery':
        return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-400 dark:border-purple-800';
      case 'customs_clearance':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-400 dark:border-amber-800';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'air': return <Plane className="w-5 h-5 text-sky-500" />;
      case 'sea': return <Ship className="w-5 h-5 text-blue-500" />;
      case 'road': return <Truck className="w-5 h-5 text-indigo-500" />;
      default: return <Package className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0e1726] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={closeTrackingModal}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {!shipment ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-950/60 flex items-center justify-center text-red-600 dark:text-red-400">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Shipment Not Found
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto mb-6">
              We couldn&apos;t locate any active consignment matching <span className="font-mono font-bold text-blue-600">{trackingModalNumber}</span>. Please verify your number or contact 24/7 support.
            </p>
            <button
              onClick={closeTrackingModal}
              className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                    Global Waybill Number
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                    Verified
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono tracking-tight flex items-center gap-3">
                  {shipment.tracking_number}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border uppercase tracking-wide flex items-center gap-1.5 ${getStatusColor(shipment.status)}`}>
                  <span className="w-2 h-2 rounded-full bg-current animate-ping" />
                  {shipment.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Origin & Destination route */}
            <div className="my-6 p-5 rounded-2xl bg-slate-50 dark:bg-[#070d17] border border-slate-100 dark:border-slate-800/80">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold">Origin</p>
                  <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{shipment.origin}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{shipment.sender_name}</p>
                </div>

                <div className="flex flex-col items-center justify-center py-2 sm:py-0">
                  <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 w-full justify-center">
                    <span className="h-[2px] bg-slate-200 dark:bg-slate-700 flex-1" />
                    <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800">
                      {getServiceIcon(shipment.service_type)}
                    </div>
                    <span className="h-[2px] bg-slate-200 dark:bg-slate-700 flex-1" />
                  </div>
                  <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 mt-1 uppercase">
                    {shipment.service_type} freight
                  </span>
                </div>

                <div className="sm:text-right">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold">Destination</p>
                  <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{shipment.destination}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{shipment.recipient_name}</p>
                </div>
              </div>

              {/* Status details line */}
              <div className="mt-4 pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-600 dark:text-slate-300 gap-2">
                <div>
                  <span className="text-slate-400">Current Position: </span>
                  <span className="font-semibold text-slate-900 dark:text-white">{shipment.current_location}</span>
                </div>
                <div>
                  <span className="text-slate-400">Estimated Delivery: </span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">{shipment.estimated_delivery}</span>
                </div>
              </div>
            </div>

            {/* Checkpoint Timeline */}
            <div className="mb-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" /> Checkpoint Audit Trail
              </h4>

              <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-200 dark:before:bg-blue-900">
                {shipment.checkpoints.map((cp, idx) => (
                  <div key={cp.id} className="relative flex items-start gap-4 pl-8 group">
                    {/* Timeline bullet */}
                    <span className={`absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-[#0e1726] ${
                      idx === 0 ? 'bg-blue-600 ring-4 ring-blue-100 dark:ring-blue-900/40' : 'bg-slate-400 dark:bg-slate-600'
                    }`} />

                    <div className="flex-1 bg-slate-50 dark:bg-[#070d17]/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          {cp.title}
                        </p>
                        <span className="text-xs text-slate-400 font-mono">
                          {cp.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-0.5">
                        📍 {cp.location}
                      </p>
                      {cp.notes && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 italic bg-white dark:bg-[#0e1726] p-2 rounded border border-slate-100 dark:border-slate-800">
                          {cp.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Consignment summary specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-50 dark:bg-[#070d17] border border-slate-200 dark:border-slate-800 text-xs">
              <div>
                <p className="text-slate-400">Total Weight</p>
                <p className="font-bold text-slate-900 dark:text-white text-sm">{shipment.weight_kg} kg</p>
              </div>
              <div>
                <p className="text-slate-400">Package Units</p>
                <p className="font-bold text-slate-900 dark:text-white text-sm">{shipment.pieces} Pieces</p>
              </div>
              <div>
                <p className="text-slate-400">Dimensions</p>
                <p className="font-bold text-slate-900 dark:text-white text-sm">{shipment.dimensions || 'Standard'}</p>
              </div>
              <div>
                <p className="text-slate-400">Declared Value</p>
                <p className="font-bold text-slate-900 dark:text-white text-sm">${shipment.price.toFixed(2)} USD</p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition"
              >
                <Printer className="w-4 h-4" /> Print Waybill Summary
              </button>
              <button
                onClick={closeTrackingModal}
                className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow transition"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
