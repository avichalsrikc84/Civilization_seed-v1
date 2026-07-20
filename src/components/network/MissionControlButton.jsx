import { motion } from 'framer-motion'

import {
  Cpu,
  ChevronRight,
} from 'lucide-react'

import {
  useMissionControlStore,
} from '../../store/missionControlStore'

export default function MissionControlButton() {
  const {
    togglePanel,
    isOpen,
  } =
    useMissionControlStore()

  return (
    <motion.div
      initial={{
        x: -40,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.8,
      }}
      className="
      absolute

      left-5

      top-1/2

      -translate-y-1/2

      z-[100]
    "
    >
      <motion.button
        whileHover={{
          scale: 1.08,
        }}

        whileTap={{
          scale: 0.95,
        }}

        animate={{
          boxShadow: [
            '0 0 15px rgba(34,211,238,.25)',
            '0 0 35px rgba(34,211,238,.6)',
            '0 0 15px rgba(34,211,238,.25)',
          ],
        }}

        transition={{
          duration: 2,
          repeat: Infinity,
        }}

        onClick={togglePanel}

        className="
        relative

        flex

        items-center

        gap-4

        rounded-full

        border

        border-cyan-400/30

        bg-slate-950/80

        px-4

        py-4

        backdrop-blur-3xl
      "
      >
        {/* Core */}

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="
          flex

          h-12

          w-12

          items-center

          justify-center

          rounded-full

          border

          border-cyan-400/30

          bg-cyan-500/10
        "
        >
          <Cpu
            size={24}
            className="
            text-cyan-300
          "
          />
        </motion.div>

        {!isOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="
            flex

            flex-col

            items-start
          "
          >
            <span
              className="
              text-xs

              tracking-[0.35em]

              text-cyan-400
            "
            >
              ATHENA
            </span>

            <span
              className="
              text-sm

              text-white/80
            "
            >
              Mission Control
            </span>
          </motion.div>
        )}

        <ChevronRight
          className={`
          transition-transform

          duration-300

          ${
            isOpen
              ? 'rotate-180'
              : ''
          }

          text-cyan-300
        `}
        />
      </motion.button>
    </motion.div>
  )
}