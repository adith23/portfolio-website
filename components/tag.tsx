export function Tag({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-full border border-[var(--line)] bg-white/70 px-3 py-1 text-xs font-medium text-[var(--muted)]">
      {label}
    </span>
  );
}
