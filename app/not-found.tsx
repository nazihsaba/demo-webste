import Link from "next/link";

export default function NotFound() {
  return (
    <main className="t-general font-body flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--bg)] px-6 text-center text-[var(--ink)]">
      <h1 className="font-display text-3xl font-bold tracking-tight">No preview here</h1>
      <p className="max-w-sm text-[var(--muted)]">This link doesn&apos;t match any business we&apos;ve built a preview for.</p>
      <Link href="/" className="font-medium text-[var(--accent)] underline underline-offset-4">
        See all previews
      </Link>
    </main>
  );
}
