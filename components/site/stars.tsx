/** Five stars, filled to the exact rating: 4.6 fills 92%. */
export function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  return (
    <span className={`relative inline-block leading-none tracking-[0.12em] ${className}`} aria-label={`${rating.toFixed(1)} out of 5`}>
      <span className="opacity-25">★★★★★</span>
      <span className="absolute inset-0 overflow-hidden whitespace-nowrap" style={{ width: `${pct}%` }} aria-hidden="true">
        ★★★★★
      </span>
    </span>
  );
}
