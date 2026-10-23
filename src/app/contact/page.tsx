'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import BookingModal from '@/components/BookingModal';
import TrackingModal from '@/components/TrackingModal';
import { useApp } from '@/lib/store';

export default function ContactPage() {
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
      subject: subject || 'General Inquiry',
      message,
    });

    setSubmitted(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 dark:bg-[#070d17] transition-colors selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1">
        
        {/* 1. Header Banner matching Panel 4 */}
        <section className="relative w-full min-h-[280px] sm:min-h-[340px] flex items-center overflow-hidden bg-[#071324]">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/port-dusk-banner.jpg"
              alt="ACE Global Logistics container port and harbor cranes"
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
                Contact Us
              </h1>
              <p className="text-base sm:text-lg text-slate-200/90 leading-relaxed font-normal max-w-xl drop-shadow">
                We&apos;re here to help. Get in touch with us today.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Contact Core Section (2-Column Grid matching mockup) */}
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Send Us a Message Card */}
              <div className="lg:col-span-7 bg-white dark:bg-[#0e1726] rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">
                  Send Us a Message
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-8">
                  Have a question or need assistance? Fill out the form below.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#070d17] border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#070d17] border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#070d17] border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                      <option value="">Select a subject</option>
                      <option value="General Logistics Inquiry">General Logistics Inquiry</option>
                      <option value="Freight Rate Quotation">Freight Rate Quotation</option>
                      <option value="Customs Clearance Support">Customs Clearance Support</option>
                      <option value="Cargo Tracking & Telematics">Cargo Tracking &amp; Telematics</option>
                      <option value="Warehousing Contract">Warehousing Contract</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your message or inquiry here..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#070d17] border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow transition active:scale-[0.98]"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </button>

                  {submitted && (
                    <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>Thank you! Your message has been sent to our dispatch support desk.</span>
                    </div>
                  )}
                </form>
              </div>

              {/* Right Column: Our Contact Information Card */}
              <div className="lg:col-span-5 bg-white dark:bg-[#0e1726] rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                    Our Contact Information
                  </h3>

                  <div className="space-y-6 text-sm">
                    {/* Address */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">
                          123 Logistics Way, Lagos, Nigeria
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <a href="tel:+2347001234567" className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 transition">
                          +234 700 123 4567
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <a href="mailto:info@acelogistics.co" className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 transition">
                          info@acelogistics.co
                        </a>
                      </div>
                    </div>

                    {/* Working Hours */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5 text-xs text-slate-600 dark:text-slate-300">
                        <p className="font-semibold text-slate-900 dark:text-white">
                          Mon – Fri: 8:00 AM – 6:00 PM
                        </p>
                        <p>Sat: 9:00 AM – 1:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Follow Us Social Icons matching Panel 4 */}
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Follow Us
                  </h4>

                  <div className="flex items-center gap-3">
                    {/* LinkedIn */}
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-600 dark:bg-slate-800 text-slate-700 hover:text-white dark:text-slate-300 flex items-center justify-center transition-colors"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      </svg>
                    </a>

                    {/* X (Twitter) */}
                    <a
                      href="https://x.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="X (Twitter)"
                      className="w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-500 dark:bg-slate-800 text-slate-700 hover:text-white dark:text-slate-300 flex items-center justify-center transition-colors"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>

                    {/* Facebook */}
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Facebook"
                      className="w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-700 dark:bg-slate-800 text-slate-700 hover:text-white dark:text-slate-300 flex items-center justify-center transition-colors"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3V2.5h-4a5 5 0 0 0-5 5v2.01h-2v3.98h2v8.01z" />
                      </svg>
                    </a>

                    {/* Instagram */}
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                      className="w-10 h-10 rounded-full bg-slate-100 hover:bg-pink-600 dark:bg-slate-800 text-slate-700 hover:text-white dark:text-slate-300 flex items-center justify-center transition-colors"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>

                    {/* YouTube */}
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="YouTube"
                      className="w-10 h-10 rounded-full bg-slate-100 hover:bg-red-600 dark:bg-slate-800 text-slate-700 hover:text-white dark:text-slate-300 flex items-center justify-center transition-colors"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
      <BookingModal />
      <AuthModal />
      <TrackingModal />
    </div>
  );
}
