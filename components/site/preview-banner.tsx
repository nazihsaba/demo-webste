/** Honest from the first line: this is a preview, not their real site. */
export function PreviewBanner({ business, className }: { business: string; className: string }) {
  const name = business.replace(/\s*[-–]\s*[\u0590-\u08FF].*$/, "");
  return (
    <div className={`px-4 py-2 text-center text-xs ${className}`}>
      A free website preview made for {name}. This is not their official site.
    </div>
  );
}
