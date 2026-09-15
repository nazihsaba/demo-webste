export function WhatsAppButton({
  phone,
  business,
  className = "",
  children,
}: {
  phone?: string;
  business: string;
  className?: string;
  children?: React.ReactNode;
}) {
  if (!phone) return null;

  const text = encodeURIComponent(`Hi ${business}, I'd like to ask about `);

  return (
    <a
      href={`https://wa.me/${phone}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children ?? "Message us on WhatsApp"}
    </a>
  );
}
