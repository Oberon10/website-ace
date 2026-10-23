'use client';

import React, { useState } from 'react';
import { X, User, Briefcase, Shield, LogIn } from 'lucide-react';
import { useApp } from '@/lib/store';
import { UserRole } from '@/lib/types';

export default function AuthModal() {
  const { isAuthOpen, setIsAuthOpen, loginAs } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs(selectedRole);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-[#0e1726] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <LogIn className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            Log In to ACE Portal
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Access your shipments, dispatch boards, or administrative analytics.
          </p>
        </div>

        {/* 1-Click Role Switcher Tabs */}
        <div className="mb-6">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            Select Role / 1-Click Fast Login
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => { setSelectedRole('customer'); loginAs('customer'); }}
              className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition ${
                selectedRole === 'customer'
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <User className="w-5 h-5" />
              <span className="text-[11px]">Customer</span>
            </button>

            <button
              type="button"
              onClick={() => { setSelectedRole('staff'); loginAs('staff'); }}
              className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition ${
                selectedRole === 'staff'
                  ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 font-bold'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Briefcase className="w-5 h-5" />
              <span className="text-[11px]">Staff / Dispatch</span>
            </button>

            <button
              type="button"
              onClick={() => { setSelectedRole('admin'); loginAs('admin'); }}
              className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition ${
                selectedRole === 'admin'
                  ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 font-bold'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Shield className="w-5 h-5" />
              <span className="text-[11px]">Admin</span>
            </button>
          </div>
        </div>

        {/* Regular Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-600 dark:text-slate-300 font-medium">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={selectedRole === 'admin' ? 'director@ace-logistics.com' : selectedRole === 'staff' ? 'dispatcher.mark@ace-logistics.com' : 'client@globaltrading.com'}
              className="w-full mt-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070d17] border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-600 dark:text-slate-300 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#070d17] border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition active:scale-[0.98]"
          >
            Sign In as {selectedRole.toUpperCase()}
          </button>
        </form>

      </div>
    </div>
  );
}
