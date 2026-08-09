import { motion } from "framer-motion";

import { useCivilizationStore } from "../../store/civilizationStore";

import { useVoice } from "../../voice/contexts/VoiceContext";

const stages = [
  "Identity",
  "Knowledge",
  "Projects",
  "Network",
  "Impact",
  "Universe",
];

export default function CivilizationTimeline() {
  // =========================================================
  // CIVILIZATION STATE
  // =========================================================

  const stage = useCivilizationStore(
    (state) => state.stage
  );

  const setStage = useCivilizationStore(
    (state) => state.setStage
  );

  // =========================================================
  // ATHENA STATE
  // =========================================================

  const {
    athenaBooting,
    athenaAwake,
  } = useVoice();

  // =========================================================
  // TIMELINE
  // =========================================================

  return (
    <div
      className="
        relative
        flex
        items-center
        gap-1
        rounded-2xl
        border
        border-cyan-400/10
        bg-black/50
        px-2
        py-2
        backdrop-blur-xl
        shadow-2xl
      "
    >
      {/* =====================================================
          ATHENA ENERGY SWEEP
      ===================================================== */}

      {athenaBooting && (
        <motion.div
          initial={{
            x: "-120%",
            opacity: 0,
          }}
          animate={{
            x: "120%",
            opacity: [
              0,
              1,
              1,
              0,
            ],
          }}
          transition={{
            duration: 1.4,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute
            inset-y-0
            left-0
            z-20
            w-24
            bg-gradient-to-r
            from-transparent
            via-cyan-300/60
            to-transparent
            blur-md
          "
        />
      )}

      {/* =====================================================
          PHASES
      ===================================================== */}

      {stages.map(
        (label, i) => {
          const value = i + 1;

          const active =
            stage >= value;

          const current =
            stage === value;

          return (
            <motion.button
              key={label}
              onClick={() =>
                setStage(value)
              }
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.96,
              }}
              animate={
                current &&
                athenaBooting
                  ? {
                      boxShadow: [
                        "0 0 0px rgba(34,211,238,0)",
                        "0 0 20px rgba(34,211,238,0.8)",
                        "0 0 8px rgba(34,211,238,0.3)",
                      ],
                    }
                  : {
                      boxShadow:
                        "0 0 0px rgba(34,211,238,0)",
                    }
              }
              transition={{
                duration: 0.8,
                repeat:
                  current &&
                  athenaBooting
                    ? Infinity
                    : 0,
              }}
              className={`
                relative
                z-10
                overflow-hidden
                rounded-xl
                px-3
                py-1
                text-sm
                transition-all
                duration-300

                ${
                  active
                    ? `
                      bg-cyan-400
                      text-black
                    `
                    : `
                      text-white/40
                      hover:text-white
                    `
                }

                ${
                  current &&
                  athenaAwake
                    ? `
                      ring-1
                      ring-cyan-300/40
                    `
                    : ""
                }
              `}
            >
              {/* =================================================
                  CURRENT PHASE ENERGY
              ================================================= */}

              {current &&
                athenaBooting && (
                  <motion.span
                    initial={{
                      x: "-100%",
                    }}
                    animate={{
                      x: "100%",
                    }}
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="
                      absolute
                      inset-0
                      bg-white/30
                      blur-sm
                    "
                  />
                )}

              <span className="relative z-10">
                {label}
              </span>
            </motion.button>
          );
        }
      )}

      {/* =====================================================
          ATHENA ONLINE INDICATOR
      ===================================================== */}

      {athenaAwake && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="
            ml-2
            flex
            items-center
            gap-1.5
            rounded-full
            border
            border-cyan-400/20
            bg-cyan-400/5
            px-2
            py-1
          "
        >
          <motion.span
            animate={{
              opacity: [
                0.4,
                1,
                0.4,
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-cyan-300
              shadow-[0_0_8px_rgba(34,211,238,0.9)]
            "
          />

          <span
            className="
              font-mono
              text-[8px]
              tracking-[0.2em]
              text-cyan-300/80
            "
          >
            ATHENA
          </span>
        </motion.div>
      )}
    </div>
  );
}