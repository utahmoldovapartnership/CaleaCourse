export function ProgressBar({
  value,
  large,
  onAccent,
  className = "",
}: {
  value: number;
  large?: boolean;
  onAccent?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`w-full overflow-hidden rounded-full ${
        onAccent ? "bg-calea-off-white/30" : "bg-calea-border-light"
      } ${large ? "h-3" : "h-2.5"} ${className}`}
    >
      <div
        className={`h-full rounded-full ${onAccent ? "bg-calea-off-white" : "bg-[var(--page-accent,var(--calea-orange))]"}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
