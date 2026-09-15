export function PreviewBanner({
  business,
  tone,
}: {
  business: string;
  tone: "dark" | "light";
}) {
  const styles =
    tone === "dark"
      ? "bg-black/60 text-white/55 border-white/10"
      : "bg-black/[0.03] text-black/45 border-black/10";

  return (
    <div className={`border-b px-4 py-2 text-center text-xs ${styles}`}>
      Free preview made for {business}. This is not their official website.
    </div>
  );
}
