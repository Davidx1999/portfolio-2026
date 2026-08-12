import React from 'react';

export function ProjectSkeletonCard() {
  return (
    <div className="relative h-48 md:h-[13.5rem] border border-neutral-carvao/10 rounded-[2px] bg-background/50 overflow-hidden shadow-sm flex animate-pulse">
      {/* Left side info skeleton */}
      <div className="w-[45%] p-5 flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <div className="h-2 w-16 bg-neutral-carvao/15 rounded-sm" />
          <div className="h-5 w-28 bg-neutral-carvao/20 rounded-sm" />
          <div className="h-3 w-full bg-neutral-carvao/10 rounded-sm" />
          <div className="h-3 w-3/4 bg-neutral-carvao/10 rounded-sm" />
        </div>
        <div className="w-5 h-5 rounded-full bg-neutral-carvao/15" />
      </div>
      {/* Right side image/visual skeleton */}
      <div className="w-[55%] bg-neutral-carvao/10 border-l border-neutral-carvao/10 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border border-neutral-carvao/20 border-t-neutral-carvao animate-spin" />
      </div>
    </div>
  );
}

export function LoadingGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full py-8">
      {Array.from({ length: count }).map((_, i) => (
        <ProjectSkeletonCard key={i} />
      ))}
    </div>
  );
}

export function ErrorBanner({ message, onRetry }) {
  return (
    <div className="w-full py-8 px-6 my-4 border border-semantic-red/30 bg-semantic-red/5 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-carvao">
      <div className="flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-semantic-red" />
        <span>Notice: {message || 'Unable to connect to CMS. Displaying cached static portfolio projects.'}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-3 py-1.5 bg-neutral-carvao text-background rounded-sm uppercase tracking-wider font-bold hover:opacity-90 transition-opacity"
        >
          Retry CMS
        </button>
      )}
    </div>
  );
}
