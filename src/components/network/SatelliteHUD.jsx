import {
  AnimatePresence,
  motion,
} from 'framer-motion'

import {
  useEffect,
  useState,
} from 'react'

import { useNetworkStore } from '../../store/networkStore'

export default function SatelliteHUD({
  project,
}) {
  const [step, setStep] =
    useState(0)

  const clearSelection =
    useNetworkStore(
      (s) => s.clearSelection
    )

  useEffect(() => {
    if (!project) {
      setStep(0)
      return
    }

    setStep(0)

    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 700),
      setTimeout(() => setStep(3), 1100),
      setTimeout(() => setStep(4), 1500),
    ]

    return () =>
      timers.forEach(clearTimeout)
  }, [project])

  // ESC KEY

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        clearSelection()
      }
    }

    window.addEventListener(
      'keydown',
      handler
    )

    return () =>
      window.removeEventListener(
        'keydown',
        handler
      )
  }, [clearSelection])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{
            opacity: 0,
            x: 80,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: 80,
          }}
          transition={{
            duration: 0.45,
          }}
          className="
          absolute
          top-24
          right-8

          w-[380px]

          rounded-3xl

          border
          border-cyan-500/20

          bg-black/80

          backdrop-blur-2xl

          p-6

          z-50
        "
        >
          {/* CLOSE BUTTON */}

          <button
            onClick={clearSelection}
            className="
            absolute

            right-4
            top-4

            text-xl

            text-white/50

            hover:text-white

            transition
          "
          >
            ✕
          </button>

          <div className="text-cyan-400 tracking-[0.25em] text-xs">
            AI MISSION CONTROL
          </div>

          <h2 className="mt-3 text-2xl font-bold text-white">
            {project.name}
          </h2>

          <div className="mt-6 space-y-3">
            <Status
              visible={step >= 1}
              text="Scanning Project..."
            />

            <Status
              visible={step >= 2}
              text="Analyzing Architecture..."
            />

            <Status
              visible={step >= 3}
              text="Evaluating Tech Stack..."
            />

            <Status
              visible={step >= 4}
              text="Mission Ready"
            />
          </div>

          {step >= 4 && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              className="mt-8"
            >
              <p className="text-sm text-white/60">
                {project.description}
              </p>

              <div className="mt-6 flex justify-between">
                <span className="text-white/50">
                  Recruiter Score
                </span>

                <span className="font-bold text-green-400">
                  {project.score}/100
                </span>
              </div>

              <div className="mt-6">
                <div className="text-sm text-cyan-300">
                  Tech Stack
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map(
                    (tech) => (
                      <span
                        key={tech}
                        className="
                        rounded-full

                        bg-cyan-500/10

                        px-3

                        py-1

                        text-xs

                        text-cyan-300
                      "
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Status({
  visible,
  text,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -15,
      }}
      animate={{
        opacity: visible
          ? 1
          : 0,
        x: visible
          ? 0
          : -15,
      }}
      className="flex items-center gap-3"
    >
      <div className="h-2 w-2 rounded-full bg-cyan-400" />

      <div className="text-sm text-white/80">
        {text}
      </div>
    </motion.div>
  )
}