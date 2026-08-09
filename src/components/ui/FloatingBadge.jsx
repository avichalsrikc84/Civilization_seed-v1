export default function FloatingBadge({
  children,
}) {
  return (
    <div
      className="
      px-4
      py-2

      rounded-full

      bg-slate-900/60

      border

      border-white/10

      backdrop-blur-xl

      text-sm

      text-slate-300

      shadow-lg
      "
    >
      {children}
    </div>
  );
}