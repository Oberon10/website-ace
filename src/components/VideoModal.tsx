'use client';

import React from 'react';
import { X, Play, Shield, Globe, Award } from 'lucide-react';
import { useApp } from '@/lib/store';

export default function VideoModal() {
  const { isVideoModalOpen, setIsVideoModalOpen } = useApp();

  if (!isVideoModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#0e1726] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => setIsVideoModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Corporate Documentary
          </span>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            Logistics That Moves Your World
          </h3>
        </div>

        {/* Video Player Mockup / Stream Container */}
        <div className="relative aspect-video rounded-2xl bg-slate-900 overflow-hidden flex flex-col items-center justify-center text-center p-6 border border-slate-800 shadow-inner">
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#1877f2_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-xl animate-pulse">
              <Play className="w-8 h-8 fill-current ml-1" />
            </div>
            <p className="text-lg font-bold text-white mb-2">
              ACE Global Network Showcase (2026)
            </p>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
              Connecting 140+ sea routes, 85 cargo air corridors, and 12,000 multimodal ground fleets 24 hours a day.
            </p>
          </div>
        </div>

        {/* Global Statistics Strip */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
          <div>
            <div className="flex items-center justify-center gap-1.5 text-blue-600 dark:text-blue-400 mb-1">
              <Globe className="w-4 h-4" />
              <span className="text-lg font-black text-slate-900 dark:text-white">120+</span>
            </div>
            <p className="text-xs text-slate-500">Countries Connected</p>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1.5 text-blue-600 dark:text-blue-400 mb-1">
              <Shield className="w-4 h-4" />
              <span className="text-lg font-black text-slate-900 dark:text-white">99.8%</span>
            </div>
            <p className="text-xs text-slate-500">On-Time Reliability</p>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1.5 text-blue-600 dark:text-blue-400 mb-1">
              <Award className="w-4 h-4" />
              <span className="text-lg font-black text-slate-900 dark:text-white">50k+</span>
            </div>
            <p className="text-xs text-slate-500">Global Enterprises</p>
          </div>
        </div>

      </div>
    </div>
  );
}
