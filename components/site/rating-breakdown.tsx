import type { ReviewsDistribution } from "@/lib/types";

const ROWS: [keyof ReviewsDistribution, string][] = [
  ["fiveStar", "5"],
  ["fourStar", "4"],
  ["threeStar", "3"],
  ["twoStar", "2"],
  ["oneStar", "1"],
];

/** The bar chart Google shows under a rating, in the template's colours. */
export function RatingBreakdown({
  distribution,
  barClass,
  trackClass,
  labelClass = "",
}: {
  distribution: ReviewsDistribution;
  barClass: string;
  trackClass: string;
  labelClass?: string;
}) {
  const total = ROWS.reduce((sum, [k]) => sum + (distribution[k] ?? 0), 0);
  if (!total) return null;

  return (
    <dl className="grid w-full gap-2.5">
      {ROWS.map(([key, label]) => {
        const count = distribution[key] ?? 0;
        return (
          <div key={key} className="grid grid-cols-[1.25rem_1fr_2.5rem] items-center gap-3 text-sm">
            <dt className={labelClass}>{label}★</dt>
            <dd className={`h-1.5 overflow-hidden rounded-full ${trackClass}`}>
              <div className={`h-full rounded-full ${barClass}`} style={{ width: `${(count / total) * 100}%` }} />
            </dd>
            <dd className={`text-right tabular-nums ${labelClass}`}>{count}</dd>
          </div>
        );
      })}
    </dl>
  );
}
