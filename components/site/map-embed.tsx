/**
 * A real map with a pin on the business. OpenStreetMap, so no API key
 * and no billing. `look` recolours it to sit inside each template.
 */
export function MapEmbed({
  lat,
  lng,
  title,
  look,
  className = "",
}: {
  lat: number;
  lng: number;
  title: string;
  look: "dark" | "warm" | "plain";
  className?: string;
}) {
  const dx = 0.0065;
  const dy = 0.0045;
  const bbox = [lng - dx, lat - dy, lng + dx, lat + dy].map((n) => n.toFixed(5)).join("%2C");
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat.toFixed(5)}%2C${lng.toFixed(5)}`;

  const filter = {
    dark: "grayscale(1) invert(0.92) contrast(0.85) brightness(0.95)",
    warm: "grayscale(0.55) sepia(0.18) contrast(0.95)",
    plain: "grayscale(0.85) contrast(1.02)",
  }[look];

  return (
    <div className={`overflow-hidden ${className}`}>
      <iframe
        title={`Map showing ${title}`}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer"
        className="h-full w-full border-0"
        style={{ filter }}
      />
    </div>
  );
}
