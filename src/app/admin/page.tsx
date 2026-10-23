'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Users, DollarSign, TrendingUp, Activity, Database, CheckCircle, RefreshCw } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useApp } from '@/lib/store';
import { DEMO_USERS } from '@/lib/mockData';
import { UserProfile, UserRole } from '@/lib/types';

export default function AdminPage() {
  const { shipments, quotations, inquiries } = useApp();

  const [usersList, setUsersList] = useState<UserProfile[]>([
    DEMO_USERS.customer,
    DEMO_USERS.staff,
    DEMO_USERS.admin,
  ]);

  const totalRevenue = shipments.reduce((acc, curr) => acc + curr.price, 0);

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    setUsersList(prev =>
      prev.map(u => (u.id === userId ? { ...u, role: newRole } : u))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#070d17] text-slate-900 dark:text-white transition-colors">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300">
                Executive Admin Access
              </span>
              <span className="text-xs text-slate-400">Security Clearance Level 4</span>
            </div>
            <h1 className="text-3xl font-black mt-1">
              Global Logistics Administration
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              System governance, fleet analytics, user permissions, and API endpoints.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
              REST API &amp; DB Synced
            </span>
          </div>
        </div>

        {/* Global KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0e1726] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase">Total Freight Revenue</span>
              <DollarSign className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">
              ${totalRevenue.toLocaleString()}
            </p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +14.8% vs last month
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#0e1726] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase">Active Waybills</span>
              <Activity className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">
              {shipments.length}
            </p>
            <p className="text-xs text-slate-500 mt-2">
              100% telemetry tracking uptime
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#0e1726] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase">On-Time Performance</span>
              <CheckCircle className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">
              99.8%
            </p>
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-2 font-semibold">
              Industry benchmark: 94.2%
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#0e1726] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase">Pending Quotations</span>
              <Database className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">
              {quotations.length}
            </p>
            <p className="text-xs text-slate-500 mt-2">
              {inquiries.length} customer inquiries in CRM
            </p>
          </div>
        </div>

        {/* User Management & Role-Based Access Table */}
        <div className="my-10 bg-white dark:bg-[#0e1726] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-500" /> User Permissions &amp; Role-Based Access (RBAC)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Configure role scopes for Customer, Staff / Dispatcher, and System Administrator.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-[#070d17] text-slate-500 uppercase text-xs border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-3.5">User</th>
                  <th className="px-6 py-3.5">Email</th>
                  <th className="px-6 py-3.5">Affiliation</th>
                  <th className="px-6 py-3.5">Current Role</th>
                  <th className="px-6 py-3.5 text-right">Assign Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {usersList.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                      {u.full_name}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                      {u.email}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-600 dark:text-slate-300">
                      {u.company || 'Private Client'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        u.role === 'admin'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'
                          : u.role === 'staff'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value as UserRole)}
                        className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-[#070d17] border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                      >
                        <option value="customer">Customer</option>
                        <option value="staff">Staff / Dispatcher</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
