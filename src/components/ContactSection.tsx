'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/lib/store';

export default function ContactSection() {
  const { createInquiry } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    createInquiry({
      name,
      email,
      subject: subject || 'General Logistics Inquiry',
      message,
    });

    setSubmitted(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-[#09111e] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase">
                Global Helpdesk &amp; Support
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2">
                Get In Touch With Our Logistics Experts
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
                Have questions regarding customs clearance, sea containers, or urgent air charters? Our dedicated support dispatchers are available 24/7/365.
              </p>

              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-semibold">Global Headquarters</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Terminal Quay 4, Port Gateway, London E14</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-semibold">24/7 Priority Hotline</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">+44 (0) 20 7946 0192 / +1 800 555-ACE</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-semibold">Electronic Support</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">dispatch@ace-logistics.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0e1726] border border-slate-200 dark:border-slate-800 mt-8">
              <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">Emergency Cargo Hotline</p>
              <p className="text-lg font-black text-slate-900 dark:text-white mt-1">+1 (800) 555-ACE-HELP</p>
              <p className="text-xs text-slate-500 mt-1">Average response time: &lt; 90 seconds</p>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-[#0e1726] p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Send an Inquiry
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
              Fill in the form below and an ACE logistics coordinator will reach out shortly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-white dark:bg-[#070d17] border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Corporate Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. j.doe@company.com"
                    className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-white dark:bg-[#070d17] border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Sea Freight charter inquiry for Rotterdam"
                  className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-white dark:bg-[#070d17] border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Message / Consignment Details</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide cargo dimensions, desired transit dates, or warehousing requirements..."
                  className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-white dark:bg-[#070d17] border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow transition active:scale-[0.98]"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>

              {submitted && (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Thank you! Your inquiry has been logged into our dispatch CRM.</span>
                </div>
              )}
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
