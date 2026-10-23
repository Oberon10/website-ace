'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesBar from '@/components/ServicesBar';
import TrackingWidget from '@/components/TrackingWidget';
import WhyChooseUs from '@/components/WhyChooseUs';
import RateCalculator from '@/components/RateCalculator';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import TrackingModal from '@/components/TrackingModal';
import BookingModal from '@/components/BookingModal';
import AuthModal from '@/components/AuthModal';
import VideoModal from '@/components/VideoModal';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#070d17] transition-colors selection:bg-blue-600 selection:text-white">
      {/* 1. Brand Navbar */}
      <Navbar />

      {/* 2. Main Content Flow */}
      <main className="flex-1">
        {/* Exact match of uploaded mockup hero section */}
        <HeroSection />

        {/* 4 Quick Services Bar (Air, Sea, Road, Warehousing) */}
        <ServicesBar />

        {/* Track Your Shipment Interactive Widget */}
        <TrackingWidget />

        {/* Why Choose ACE Global Logistics + Terminal Operations Imagery */}
        <WhyChooseUs />

        {/* Interactive Instant Rate Calculator & Quotation Generator */}
        <RateCalculator />

        {/* 24/7 Global Support & Dispatch Inquiries */}
        <ContactSection />
      </main>

      {/* 3. Global Footer */}
      <Footer />

      {/* 4. Interactive Modals */}
      <TrackingModal />
      <BookingModal />
      <AuthModal />
      <VideoModal />
    </div>
  );
}
