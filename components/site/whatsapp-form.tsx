"use client";

import { useId, useState } from "react";
import type { FormField } from "@/lib/categories";

/**
 * A short request form that becomes one WhatsApp message.
 * No server, no database: it opens WhatsApp with the answers typed in,
 * and the visitor presses send. Landlines get a call button instead,
 * because a wa.me link to a landline silently fails.
 */
export function WhatsAppForm({
  phone,
  greeting,
  fields,
  submit,
  callLabel,
  classes,
}: {
  phone: { full: string; display: string; isMobile: boolean };
  greeting: string;
  fields: FormField[];
  submit: string;
  callLabel: string;
  classes: { label: string; input: string; button: string };
}) {
  const id = useId();
  const [values, setValues] = useState<Record<string, string>>({});

  if (!phone.isMobile) {
    return (
      <a href={`tel:+${phone.full}`} className={`block text-center ${classes.button}`}>
        {callLabel}: {phone.display}
      </a>
    );
  }

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = fields
      .map((f) => [f.label, values[f.id]?.trim()] as const)
      .filter(([, v]) => v)
      .map(([label, v]) => `${label.replace(/\?$/, "")}: ${v}`);
    const text = [greeting.trim(), "", ...lines].join("\n");
    window.open(`https://wa.me/${phone.full}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  };

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  return (
    <form onSubmit={send} className="grid gap-4">
      {fields.map((f) => {
        const fid = `${id}-${f.id}`;
        return (
          <div key={f.id} className="grid gap-1.5">
            <label htmlFor={fid} className={classes.label}>
              {f.label}
            </label>
            {f.type === "textarea" ? (
              <textarea id={fid} rows={3} required={f.required} placeholder={f.placeholder} value={values[f.id] ?? ""} onChange={set(f.id)} className={`resize-y ${classes.input}`} />
            ) : f.type === "select" ? (
              <select id={fid} required={f.required} value={values[f.id] ?? ""} onChange={set(f.id)} className={classes.input}>
                <option value="">Choose one</option>
                {f.options?.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input
                id={fid}
                type={f.type}
                min={f.type === "number" ? 1 : undefined}
                required={f.required}
                placeholder={f.placeholder}
                value={values[f.id] ?? ""}
                onChange={set(f.id)}
                className={classes.input}
              />
            )}
          </div>
        );
      })}
      <button type="submit" className={classes.button}>
        {submit}
      </button>
    </form>
  );
}
