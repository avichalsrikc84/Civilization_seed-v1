import { motion } from "framer-motion";

export default function GlassCard({
  children,
  className = "",
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
        scale: 0.97,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      whileHover={{
        y: -4,
        transition: {
          duration: 0.2,
        },
      }}
      className={`
        relative
        overflow-hidden

        rounded-[30px]

        border border-white/10

        bg-slate-900/45

        backdrop-blur-3xl

        shadow-[0_25px_80px_rgba(0,0,0,.45)]

        ${className}
      `}
    >
      {/* reflection */}

      <div
        className="
        absolute
        inset-0

        bg-gradient-to-br

        from-white/8

        via-transparent

        to-transparent

        pointer-events-none
      "
      />

      {/* cyan highlight */}

      <div
        className="
        absolute

        top-0

        left-10

        right-10

        h-px

        bg-gradient-to-r

        from-transparent

        via-cyan-300

        to-transparent
      "
      />

      <div className="relative h-full">
        {children}
      </div>
    </motion.div>
  );
}