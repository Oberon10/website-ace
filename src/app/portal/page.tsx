'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Package, Plus, MapPin, Search, ArrowRight, Clock, FileText, CheckCircle2, User, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TrackingModal from '@/components/TrackingModal';
import BookingModal from '@/components/BookingModal';
import AuthModal from '@/components/AuthModal';
import { useApp } from '@/lib/store';

export default function CustomerPortalPage() {
  const { 
    currentUser, 
    shipments, 
    quotations, 
    setIsBookingOpen, 
    openTrackingModal 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'shipments' | 'quotes' | 'addresses'>('shipments');

  // Filter shipments
  const filteredShipments = shipments.filter(s => 
    s.tracking_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.origin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#070d17] text-slate-900 dark:text-white transition-colors">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                Customer Account
              </span>
              <span className="text-xs text-slate-400">ID: {currentUser.id}</span>
            </div>
            <h1 className="text-3xl font-black mt-1">
              Welcome back, {currentUser.full_name}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Manage your active consignments, request quotations, and track shipments in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow transition"
            >
              <Plus className="w-4 h-4" />
              <span>Book New Shipment</span>
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1726] border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-xs text-slate-400 font-medium">Total Waybills</p>
            <p className="text-2xl font-black mt-1 text-slate-900 dark:text-white">{shipments.length}</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1726] border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-xs text-slate-400 font-medium">In Transit</p>
            <p className="text-2xl font-black mt-1 text-blue-600 dark:text-blue-400">
              {shipments.filter(s => s.status === 'in_transit' || s.status === 'out_for_delivery').length}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1726] border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-xs text-slate-400 font-medium">Delivered</p>
            <p className="text-2xl font-black mt-1 text-emerald-600 dark:text-emerald-400">
              {shipments.filter(s => s.status === 'delivered').length}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#0e1726] border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-xs text-slate-400 font-medium">Pending Quotes</p>
            <p className="text-2xl font-black mt-1 text-amber-500">
              {quotations.filter(q => q.status === 'pending' || q.status === 'quoted').length}
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center space-x-4 border-b border-slate-200 dark:border-slate-800 mb-6">
          <button
            onClick={() => setActiveTab('shipments')}
            className={`pb-3 text-sm font-bold border-b-2 transition ${
              activeTab === 'shipments'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            My Shipments ({shipments.length})
          </button>
          <button
            onClick={() => setActiveTab('quotes')}
            className={`pb-3 text-sm font-bold border-b-2 transition ${
              activeTab === 'quotes'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Quotation Requests ({quotations.length})
          </button>
        </div>

        {/* Search Bar */}
        {activeTab === 'shipments' && (
          <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by tracking number, origin, or destination..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-[#0e1726] border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* SHIPMENTS LIST */}
        {activeTab === 'shipments' && (
          <div className="space-y-4">
            {filteredShipments.map((s) => (
              <div
                key={s.id}
                className="p-6 rounded-2xl bg-white dark:bg-[#0e1726] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-lg font-black text-slate-900 dark:text-white">
                        {s.tracking_number}
                      </span>
                      <span className="text-xs uppercase font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                        {s.service_type}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">
                      {s.origin} <span className="text-blue-500">→</span> {s.destination}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Current: <span className="text-slate-600 dark:text-slate-300 font-medium">{s.current_location}</span> • ETA: {s.estimated_delivery}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-slate-400">Total Price</p>
                    <p className="text-base font-bold text-slate-900 dark:text-white">
                      ${s.price.toFixed(2)} USD
                    </p>
                  </div>

                  <span className="px-3.5 py-1.5 rounded-full text-xs font-bold border uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700">
                    {s.status.replace('_', ' ')}
                  </span>

                  <button
                    onClick={() => openTrackingModal(s.tracking_number)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow transition"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Track Live</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* QUOTES LIST */}
        {activeTab === 'quotes' && (
          <div className="space-y-4">
            {quotations.map((q) => (
              <div
                key={q.id}
                className="p-6 rounded-2xl bg-white dark:bg-[#0e1726] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-slate-500 dark:text-slate-400">
                      {q.id.toUpperCase()}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-slate-100 dark:bg-slate-800 uppercase">
                      {q.service_type}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                    {q.origin} → {q.destination}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {q.cargo_description} • {q.weight_kg} kg
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Quote Estimate</p>
                    <p className="text-xl font-black text-blue-600 dark:text-blue-400">
                      ${q.estimated_price.toFixed(2)}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                    {q.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      <Footer />
      <TrackingModal />
      <BookingModal />
      <AuthModal />
    </div>
  );
}
