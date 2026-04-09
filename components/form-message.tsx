import { cn } from "@/lib/utils";

export function FormMessage({
  children,
  tone = "neutral",
}: {
  children: string;
  tone?: "neutral" | "success" | "error";
}) {
  return (
    <p
      className={cn(
        "rounded-[var(--radius-sm)] border px-4 py-3 text-sm",
        tone === "success" && "border-emerald-200 bg-emerald-50 text-[var(--success)]",
        tone === "error" && "border-red-200 bg-red-50 text-[var(--danger)]",
        tone === "neutral" && "border-[var(--line)] bg-white/60 text-[var(--muted)]",
      )}
    >
      {children}
    </p>
  );
}
