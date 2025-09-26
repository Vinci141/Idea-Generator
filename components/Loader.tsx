
import React from 'react';

export const Loader: React.FC = () => (
  <div className="flex flex-col items-center justify-center my-12">
    <div className="relative flex items-center justify-center">
      <div className="absolute w-20 h-20 border-4 border-cyan-500/20 rounded-full"></div>
      <div className="absolute w-20 h-20 border-t-4 border-cyan-500 rounded-full animate-spin"></div>
    </div>
    <p className="mt-6 text-lg font-semibold text-cyan-400">Generating brilliant ideas...</p>
  </div>
);
