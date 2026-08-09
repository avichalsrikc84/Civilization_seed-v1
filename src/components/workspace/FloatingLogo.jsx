import { motion } from "framer-motion";

export default function FloatingLogo() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
      }}
      className="
        absolute
        top-8
        left-1/2
        -translate-x-1/2
        pointer-events-none
        z-50
      "
    >
      <div className="flex flex-col items-center">

        {/* AI Core */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            relative
            w-14
            h-14
            rounded-full
            bg-gradient-to-br
            from-cyan-300
            via-sky-400
            to-blue-500

            shadow-[0_0_35px_rgba(56,189,248,.45)]
          "
        >
          {/* inner core */}

          <div
            className="
              absolute
              inset-2
              rounded-full
              bg-slate-950
            "
          />

          {/* center */}

          <div
            className="
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2

              w-3
              h-3

              rounded-full

              bg-cyan-300
            "
          />
        </motion.div>

        {/* Title */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: .25,
          }}
          className="
            mt-5

            text-3xl

            font-bold

            tracking-[0.45em]

            text-white
          "
        >
          ATHENA
        </motion.h1>

        <p
          className="
            mt-2

            text-sm

            tracking-[0.3em]

            uppercase

            text-slate-400
          "
        >
          Personal Intelligence Workspace
        </p>

      </div>
    </motion.div>
  );
}