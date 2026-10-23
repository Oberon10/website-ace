'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, Menu, X, Shield, User, Briefcase, LayoutDashboard } from 'lucide-react';
import Logo from './Logo';
import { useApp } from '@/lib/store';

export default function Navbar() {
  const pathname = usePathname();
  const { 
    isDark, 
    toggleTheme, 
    setIsAuthOpen, 
    setIsBookingOpen, 
    currentRole, 
    loginAs, 
    currentUser 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/#services' },
    { label: 'Tracking', href: '/#tracking' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#070d17]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Logo />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href === '/' && pathname === '/');
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`relative py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          
          {/* Role Switcher Pill (Quick preview across Customer, Staff, Admin) */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition"
              title="Switch demo interface roles"
            >
              {currentRole === 'customer' && <User className="w-3.5 h-3.5 text-blue-500" />}
              {currentRole === 'staff' && <Briefcase className="w-3.5 h-3.5 text-amber-500" />}
              {currentRole === 'admin' && <Shield className="w-3.5 h-3.5 text-purple-500" />}
              <span className="capitalize">{currentRole} View</span>
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#0e1726] rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 text-xs">
                <div className="px-3 py-1 font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
                  Switch Portal Interface
                </div>
                <button
                  onClick={() => { loginAs('customer'); setRoleMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                >
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-500" /> Customer Portal
                  </span>
                  {currentRole === 'customer' && <span className="text-blue-500 font-bold">✓</span>}
                </button>
                <button
                  onClick={() => { loginAs('staff'); setRoleMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                >
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-amber-500" /> Staff / Dispatch
                  </span>
                  {currentRole === 'staff' && <span className="text-amber-500 font-bold">✓</span>}
                </button>
                <button
                  onClick={() => { loginAs('admin'); setRoleMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                >
                  <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-purple-500" /> Admin Console
                  </span>
                  {currentRole === 'admin' && <span className="text-purple-500 font-bold">✓</span>}
                </button>
                <div className="border-t border-slate-200 dark:border-slate-800 my-1"></div>
                <Link
                  href={currentRole === 'customer' ? '/portal' : currentRole === 'staff' ? '/staff' : '/admin'}
                  onClick={() => setRoleMenuOpen(false)}
                  className="w-full text-left px-3 py-2 flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 font-medium"
                >
                  <LayoutDashboard className="w-4 h-4" /> Open Dedicated Dashboard
                </Link>
              </div>
            )}
          </div>

          {/* Theme Toggle Button (Crescent Moon) */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700" />
            )}
          </button>

          {/* Login Button */}
          <button
            onClick={() => setIsAuthOpen(true)}
            className="px-5 py-2 text-sm font-semibold text-slate-800 dark:text-white rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {currentUser.full_name ? currentUser.full_name.split(' ')[0] : 'Login'}
          </button>

          {/* Get Started Button */}
          <button
            onClick={() => setIsBookingOpen(true)}
            className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow-md transition active:scale-[0.98]"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-600 dark:text-slate-300"
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 dark:text-slate-200"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-6 bg-white dark:bg-[#070d17] border-b border-slate-200 dark:border-slate-800 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-slate-700 dark:text-slate-200"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <Link
              href={currentRole === 'customer' ? '/portal' : currentRole === 'staff' ? '/staff' : '/admin'}
              className="w-full text-center py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-semibold"
            >
              Open {currentRole} Dashboard
            </Link>
            <button
              onClick={() => { setIsBookingOpen(true); setMobileMenuOpen(false); }}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-blue-600 rounded-lg"
            >
              Book Shipment
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
