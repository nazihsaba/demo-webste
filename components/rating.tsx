export function Rating({
  rating,
  reviews,
  className = "",
}: {
  rating?: number;
  reviews?: number;
  className?: string;
}) {
  if (typeof rating !== "number") return null;

  const rounded = Math.round(rating);

  return (
    <span className={className}>
      <span aria-hidden="true">
        {"\u2605".repeat(rounded)}
        {"\u2606".repeat(Math.max(0, 5 - rounded))}
      </span>{" "}
      <span className="sr-only">Rated {rating} out of 5.</span>
      {rating.toFixed(1)}
      {typeof reviews === "number" ? ` from ${reviews} reviews` : null}
    </span>
  );
}
