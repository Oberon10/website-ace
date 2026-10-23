'use client';

import React, { useState } from 'react';
import { Briefcase, CheckCircle2, Clock, MapPin, Search, Edit3, ArrowRight, MessageSquare, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TrackingModal from '@/components/TrackingModal';
import AuthModal from '@/components/AuthModal';
import { useApp } from '@/lib/store';
import { Shipment, ShipmentStatus } from '@/lib/types';

export default function StaffPortalPage() {
  const { 
    currentUser, 
    shipments, 
    updateShipmentStatus, 
    quotations, 
    updateQuotationStatus, 
    inquiries, 
    updateInquiryStatus,
    openTrackingModal 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'dispatch' | 'quotes' | 'inquiries'>('dispatch');
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);

  // Status update form states
  const [newStatus, setNewStatus] = useState<ShipmentStatus>('in_transit');
  const [newLocation, setNewLocation] = useState('');
  const [checkpointNotes, setCheckpointNotes] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleOpenStatusModal = (s: Shipment) => {
    setSelectedShipment(s);
    setNewStatus(s.status);
    setNewLocation(s.current_location);
    setCheckpointNotes('');
    setUpdateSuccess(false);
  };

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShipment || !newLocation) return;

    updateShipmentStatus(
      selectedShipment.id,
      newStatus,
      newLocation,
      checkpointNotes || `Checkpoint processed by dispatcher ${currentUser.full_name}.`
    );

    setUpdateSuccess(true);
    setTimeout(() => {
      setSelectedShipment(null);
      setUpdateSuccess(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#070d17] text-slate-900 dark:text-white transition-colors">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                Staff / Dispatch Console
              </span>
              <span className="text-xs text-slate-400">Station: London Gateway Terminal</span>
            </div>
            <h1 className="text-3xl font-black mt-1">
              Operations Control Board
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Logged in as Dispatch Officer: <span className="font-semibold text-slate-900 dark:text-white">{currentUser.full_name}</span> ({currentUser.email})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Radar Online
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center space-x-4 border-b border-slate-200 dark:border-slate-800 my-8">
          <button
            onClick={() => setActiveTab('dispatch')}
            className={`pb-3 text-sm font-bold border-b-2 transition ${
              activeTab === 'dispatch'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Active Fleet Queue ({shipments.length})
          </button>
          <button
            onClick={() => setActiveTab('quotes')}
            className={`pb-3 text-sm font-bold border-b-2 transition ${
              activeTab === 'quotes'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Quotation Approvals ({quotations.length})
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`pb-3 text-sm font-bold border-b-2 transition ${
              activeTab === 'inquiries'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Customer Inquiries ({inquiries.length})
          </button>
        </div>

        {/* DISPATCH QUEUE */}
        {activeTab === 'dispatch' && (
          <div className="space-y-4">
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e1726] shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-[#070d17] text-slate-500 uppercase text-xs border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Waybill Number</th>
                    <th className="px-6 py-4">Freight Mode</th>
                    <th className="px-6 py-4">Routing</th>
                    <th className="px-6 py-4">Current Status</th>
                    <th className="px-6 py-4">Last Checkpoint Location</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {shipments.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                      <td className="px-6 py-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                        {s.tracking_number}
                      </td>
                      <td className="px-6 py-4 uppercase text-xs font-semibold">
                        {s.service_type}
                      </td>
                      <td className="px-6 py-4 text-xs">
                        <span className="font-semibold">{s.origin}</span>
                        <span className="text-slate-400 mx-1">→</span>
                        <span>{s.destination}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                          {s.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">
                        📍 {s.current_location}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenStatusModal(s)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs shadow-sm"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Update</span>
                        </button>
                        <button
                          onClick={() => openTrackingModal(s.tracking_number)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* QUOTATIONS MANAGEMENT */}
        {activeTab === 'quotes' && (
          <div className="space-y-4">
            {quotations.map((q) => (
              <div
                key={q.id}
                className="p-6 rounded-2xl bg-white dark:bg-[#0e1726] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      REF: {q.id}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/60 uppercase">
                      {q.service_type}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                    {q.customer_name} ({q.customer_email})
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {q.origin} → {q.destination} • {q.weight_kg} kg • {q.cargo_description}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-lg font-black text-slate-900 dark:text-white">
                    ${q.estimated_price.toFixed(2)}
                  </span>
                  {q.status === 'pending' ? (
                    <button
                      onClick={() => updateQuotationStatus(q.id, 'quoted')}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow"
                    >
                      Approve Quote
                    </button>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                      {q.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            {inquiries.map((inq) => (
              <div
                key={inq.id}
                className="p-6 rounded-2xl bg-white dark:bg-[#0e1726] border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {inq.subject}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      From: <span className="font-semibold">{inq.name}</span> ({inq.email})
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    inq.status === 'new'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/60'
                      : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60'
                  }`}>
                    {inq.status}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 p-3 bg-slate-50 dark:bg-[#070d17] rounded-xl border border-slate-100 dark:border-slate-800">
                  {inq.message}
                </p>
                <div className="mt-3 flex justify-end gap-2">
                  <button
                    onClick={() => updateInquiryStatus(inq.id, 'resolved')}
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold"
                  >
                    Mark as Resolved
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Status Update Modal for Dispatcher */}
        {selectedShipment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-lg bg-white dark:bg-[#0e1726] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                Update Consignment Checkpoint
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-4">
                Waybill: {selectedShipment.tracking_number}
              </p>

              <form onSubmit={handleSaveStatus} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    New Shipment Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as ShipmentStatus)}
                    className="w-full mt-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070d17] border border-slate-200 dark:border-slate-700 text-sm font-semibold"
                  >
                    <option value="picked_up">Picked Up</option>
                    <option value="in_transit">In Transit</option>
                    <option value="customs_clearance">Customs Clearance</option>
                    <option value="out_for_delivery">Out For Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="delayed">Delayed</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Current Checkpoint / Location
                  </label>
                  <input
                    type="text"
                    required
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. Frankfurt Cargo Terminal 2"
                    className="w-full mt-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070d17] border border-slate-200 dark:border-slate-700 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Dispatcher Notes
                  </label>
                  <textarea
                    rows={3}
                    value={checkpointNotes}
                    onChange={(e) => setCheckpointNotes(e.target.value)}
                    placeholder="e.g. Scanned into sorting bay 4; departure flight confirmed."
                    className="w-full mt-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070d17] border border-slate-200 dark:border-slate-700 text-sm"
                  />
                </div>

                {updateSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Checkpoint successfully logged to global tracking system!</span>
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedShipment(null)}
                    className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm shadow transition"
                  >
                    Save Checkpoint
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </main>

      <Footer />
      <TrackingModal />
      <AuthModal />
    </div>
  );
}
