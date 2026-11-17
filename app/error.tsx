'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RotateCcw, Home, AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Error Boundary caught error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-ethiopia-obsidian text-ethiopia-linen flex flex-col items-center justify-center p-6 space-y-6">
      <div className="w-16 h-16 rounded-full bg-ethiopia-clay-950 border border-ethiopia-clay-500 flex items-center justify-center text-ethiopia-clay-400">
        <AlertCircle className="w-8 h-8" />
      </div>

      <div className="text-center space-y-2 max-w-md">
        <h2 className="text-2xl font-bold serif-display text-ethiopia-linen">
          An Unexpected Interruption Occurred
        </h2>
        <p className="text-xs text-ethiopia-earth-300 leading-relaxed">
          The hearth encountered a momentary glitch. You can retry loading the experience or return to the main hall.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => reset()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ethiopia-teff-500 text-ethiopia-obsidian font-bold text-xs shadow-lg hover:scale-105 transition-transform"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
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
