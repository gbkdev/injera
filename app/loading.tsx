import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-ethiopia-obsidian text-ethiopia-linen flex flex-col items-center justify-center p-6 space-y-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-2 border-ethiopia-teff-500 border-t-transparent animate-spin flex items-center justify-center"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-ethiopia-teff-400">ጤ</span>
        </div>
      </div>

      <div className="text-center space-y-1">
        <h3 className="text-base font-bold text-ethiopia-linen serif-display flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-ethiopia-clay-400" />
          <span>Preparing the Ethiopian Hearth...</span>
        </h3>
        <p className="text-xs text-ethiopia-earth-400 font-mono">
          Loading 3D environments & cultural archives
        </p>
      </div>
    </div>
  );
}
