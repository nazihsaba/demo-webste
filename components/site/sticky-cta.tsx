import type { View } from "@/lib/view";

/**
 * On a phone, the main action stays within thumb reach the whole time.
 * Hidden from tablet width up, where the hero button is always visible.
 */
export function StickyCta({ cta, barClass, buttonClass }: { cta: View["cta"]; barClass: string; buttonClass: string }) {
  if (!cta) return null;
  return (
    <div className={`sticky bottom-0 z-20 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden ${barClass}`}>
      <a
        href={cta.href}
        target={cta.kind === "whatsapp" ? "_blank" : undefined}
        rel={cta.kind === "whatsapp" ? "noopener noreferrer" : undefined}
        className={`block rounded-full py-3.5 text-center font-medium ${buttonClass}`}
      >
        {cta.label}
      </a>
    </div>
  );
}
