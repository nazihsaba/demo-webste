import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F2F3EF] px-6 text-center font-[family-name:var(--font-space)] text-[#221C18]">
      <h1 className="text-3xl font-bold tracking-tight">No preview here</h1>
      <p className="text-[#221C18]/60">
        This link does not match any business we have built a preview for.
      </p>
      <Link href="/" className="font-medium text-[#0F6E5C] underline">
        Back to the list
      </Link>
    </main>
  );
}
