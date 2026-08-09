export default function IconButton({
  icon,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-xl
        border
        border-white/10
        bg-white/5
        transition
        hover:border-cyan-400/30
        hover:bg-cyan-500/10
      "
    >
      {icon}
    </button>
  );
}