import React from 'react';
import Link from 'next/link';
import { Compass, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ethiopia-obsidian text-ethiopia-linen flex flex-col items-center justify-center p-6 space-y-6 text-center">
      <div className="w-20 h-20 rounded-full bg-ethiopia-earth-900 border border-ethiopia-teff-500/40 flex items-center justify-center text-ethiopia-teff-400">
        <span className="text-3xl font-bold font-mono">404</span>
      </div>

      <div className="space-y-2 max-w-md">
        <h2 className="text-3xl font-bold serif-display text-ethiopia-linen">
          Path Beyond the Hearth
        </h2>
        <p className="text-xs sm:text-sm text-ethiopia-earth-300 leading-relaxed">
          The cultural section you are seeking has not yet been transcribed or has moved to another province of our archive.
        </p>
      </div>

      <div className="flex gap-3">
        <Link
          href="/journey"
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-ethiopia-clay-500 to-ethiopia-teff-500 text-ethiopia-linen font-bold text-xs shadow-lg hover:scale-105 transition-transform"
        >
          <Compass className="w-4 h-4" />
          <span>The 10-Stage Journey</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ethiopia-earth-800 text-ethiopia-linen font-semibold text-xs border border-ethiopia-earth-700 hover:bg-ethiopia-earth-700 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
