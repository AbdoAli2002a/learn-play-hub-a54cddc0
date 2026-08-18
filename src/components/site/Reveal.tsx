import { useState, type ReactNode } from "react";

export function Reveal({
  children,
  label = "Show solution",
}: {
  children: ReactNode;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded-lg border border-primary/40 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
      >
        {open ? "Hide solution" : label}
      </button>
      {open ? (
        <div className="mt-3 rounded-lg bg-secondary/70 p-4 text-sm/7">{children}</div>
      ) : null}
    </div>
  );
}
