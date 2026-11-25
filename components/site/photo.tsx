import Image from "next/image";

/** One colour treatment per template, defined in globals.css. */
export type Grade = "restaurant" | "coffee" | "general" | "appt" | "quote" | "events" | "edu";

/**
 * One photo, resized by Next.js for the screen it's shown on.
 * `grade` applies the template's colour treatment (see globals.css) so
 * six customer photos taken on six phones look like one set.
 */
export function Photo({
  src,
  sizes,
  grade,
  priority = false,
  className = "",
}: {
  src: string;
  sizes: string;
  grade: Grade;
  priority?: boolean;
  className?: string;
}) {
  // Callers may position the photo themselves (e.g. a full-bleed hero).
  const position = /\babsolute\b/.test(className) ? "" : "relative";
  return (
    <div className={`photo grade-${grade} ${position} overflow-hidden ${className}`}>
      <Image src={src} alt="" fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
