import { Photo } from "./photo";

/**
 * Magazine-style layout for up to five photos.
 * Desktop: a 4x2 grid where the first photo takes a 2x2 block.
 * Phone: first photo wide, the rest in pairs, a lone last one goes wide.
 */
const DESKTOP: Record<number, string[]> = {
  1: ["sm:col-span-4 sm:row-span-2"],
  2: ["sm:col-span-2 sm:row-span-2", "sm:col-span-2 sm:row-span-2"],
  3: ["sm:col-span-2 sm:row-span-2", "sm:col-span-2", "sm:col-span-2"],
  4: ["sm:col-span-2 sm:row-span-2", "", "", "sm:col-span-2"],
  5: ["sm:col-span-2 sm:row-span-2", "", "", "", ""],
};

export function Mosaic({ photos, grade }: { photos: string[]; grade: "restaurant" | "coffee" | "general" }) {
  const list = photos.slice(0, 5);
  if (!list.length) return null;
  const rest = list.length - 1;

  return (
    <div className="grid grid-cols-2 gap-2 sm:h-[38rem] sm:grid-cols-4 sm:grid-rows-2 sm:gap-3">
      {list.map((src, i) => {
        const mobile =
          i === 0 ? "col-span-2 aspect-[4/3]" : rest % 2 === 1 && i === list.length - 1 ? "col-span-2 aspect-[16/9]" : "aspect-square";
        return (
          <Photo
            key={src}
            src={src}
            grade={grade}
            sizes={i === 0 ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 640px) 25vw, 50vw"}
            className={`${mobile} sm:aspect-auto ${DESKTOP[list.length][i]}`}
          />
        );
      })}
    </div>
  );
}
