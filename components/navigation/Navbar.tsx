'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SoundController } from '../audio/SoundController';
import { Menu, X, Compass, Flame, BookOpen, MapPin, Sparkles, HelpCircle, ShieldCheck } from 'lucide-react';
import { soundEngine } from '@/lib/audio/soundfx';

export function Navbar() {
  const { t, language } = useLanguage();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/journey', label: t('nav.journey'), icon: Compass },
    { href: '/make-injera', label: t('nav.makeInjera'), icon: Flame },
    { href: '/culture', label: t('nav.culture'), icon: BookOpen },
    { href: '/explore', label: t('nav.explore'), icon: MapPin },
    { href: '/stories', label: t('nav.stories'), icon: Sparkles },
    { href: '/learn', label: t('nav.learn'), icon: HelpCircle },
    { href: '/about', label: t('nav.about'), icon: ShieldCheck },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-ethiopia-obsidian/90 backdrop-blur-md border-b border-ethiopia-teff-500/20 py-3 shadow-lg'
          : 'bg-gradient-to-b from-ethiopia-obsidian/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          onClick={() => soundEngine.playTizitaChime && soundEngine.playTizitaChime(0)}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-ethiopia-clay-500 via-ethiopia-teff-500 to-ethiopia-mesob-straw flex items-center justify-center p-0.5 shadow-[0_0_12px_rgba(197,147,52,0.4)] group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-ethiopia-obsidian rounded-full flex items-center justify-center">
              <span className="text-ethiopia-teff-400 font-bold text-xs">ጤ</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-wider text-ethiopia-linen serif-display group-hover:text-ethiopia-teff-300 transition-colors">
                {language === 'am' ? 'እንጀራ' : 'INJERA'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-ethiopia-clay-500"></span>
            </div>
            <p className="text-[10px] text-ethiopia-earth-300 tracking-wider uppercase font-medium hidden sm:block">
              {language === 'am' ? 'ከጤፍ እስከ ማዕድ' : 'From Teff to Table'}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-ethiopia-earth-900/60 p-1.5 rounded-full border border-ethiopia-earth-700/50 backdrop-blur-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-ethiopia-teff-500/20 text-ethiopia-teff-300 border border-ethiopia-teff-500/40 shadow-sm'
                    : 'text-ethiopia-earth-200 hover:text-ethiopia-teff-300 hover:bg-ethiopia-earth-800/50'
                }`}
                onClick={() => soundEngine.playTizitaChime && soundEngine.playTizitaChime(1)}
              >
                <link.icon className="w-3.5 h-3.5 opacity-80" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Controls (Audio & Language) */}
        <div className="hidden sm:flex items-center gap-3">
          <SoundController />
          <LanguageSwitcher />
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <SoundController />
          <LanguageSwitcher />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-ethiopia-earth-900/80 border border-ethiopia-teff-500/30 text-ethiopia-linen hover:text-ethiopia-teff-400"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bg-ethiopia-obsidian/95 border-b border-ethiopia-teff-500/30 backdrop-blur-xl px-4 py-6 shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-1 gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-ethiopia-teff-500/20 text-ethiopia-teff-300 border border-ethiopia-teff-500/40'
                      : 'text-ethiopia-earth-200 hover:bg-ethiopia-earth-900/80 hover:text-ethiopia-teff-300'
                  }`}
                >
                  <link.icon className="w-4 h-4 text-ethiopia-teff-400" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
