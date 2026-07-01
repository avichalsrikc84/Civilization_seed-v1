import {
  AnimatePresence,
  motion,
} from 'framer-motion'

import {
  useEffect,
  useState,
} from 'react'

import { useNetworkStore } from '../../store/networkStore'
import { useAgentTaskStore } from '../../store/agentTaskStore'

const AGENT_STEPS = {
  'GitHub Agent': [
    'Connecting to GitHub...',
    'Fetching repositories...',
    'Analyzing languages...',
    'Synchronization Complete',
  ],

  'LinkedIn Agent': [
    'Connecting to LinkedIn...',
    'Reading professional profile...',
    'Analyzing experience...',
    'Synchronization Complete',
  ],

  'Resume Agent': [
    'Loading Resume...',
    'Checking ATS compatibility...',
    'Finding missing keywords...',
    'Optimization Complete',
  ],

  'Recruiter Agent': [
    'Loading Candidate...',
    'Computing Recruiter Intelligence...',
    'Comparing Industry Benchmarks...',
    'Evaluation Complete',
  ],

  'Interview Agent': [
    'Loading Interview Engine...',
    'Selecting Adaptive Questions...',
    'Preparing Voice Session...',
    'Interview Ready',
  ],

  'Career Agent': [
    'Analyzing Skill Graph...',
    'Finding Skill Gaps...',
    'Generating Career Roadmap...',
    'Roadmap Ready',
  ],
}

export default function SatelliteHUD({
  project,
}) {
  const [step, setStep] =
    useState(0)

  const clearSelection =
    useNetworkStore(
      (s) => s.clearSelection
    )

  const runtime =
    useAgentTaskStore((s) =>
      project
        ? s.agents[project.source]
        : null
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

  const steps =
    AGENT_STEPS[project?.name] || [
      'Initializing...',
      'Loading...',
      'Analyzing...',
      'Ready',
    ]

  const statusClass =
    runtime?.status === 'READY'
      ? 'bg-violet-500/20 border border-violet-400/40 text-violet-300'
      : runtime?.status === 'SYNCING'
      ? 'bg-yellow-500/20 border border-yellow-400/40 text-yellow-300'
      : runtime?.status ===
        'ANALYZING'
      ? 'bg-cyan-500/20 border border-cyan-400/40 text-cyan-300'
      : 'bg-green-500/20 border border-green-400/40 text-green-300'

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
            ATHENA AI AGENT
          </div>

          <div className="mt-3 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              {project.name}
            </h2>

            <div
              className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}
            >
              {runtime?.status ??
                'OFFLINE'}
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {steps.map(
              (
                text,
                index
              ) => (
                <Status
                  key={text}
                  visible={
                    step >=
                    index + 1
                  }
                  text={text}
                />
              )
            )}
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

              <div className="mt-6 flex justify-between items-center">
                <span className="text-white/50">
                  Task Progress
                </span>

                <div className="w-40">
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full bg-cyan-400"
                      animate={{
                        width: `${runtime?.progress ?? 0}%`,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                    />
                  </div>

                  <div className="mt-1 text-right text-xs text-cyan-300">
                    {runtime?.progress ??
                      0}
                    %
                  </div>
                </div>
              </div>
                            <div className="mt-5">
                <div className="text-sm text-cyan-300">
                  Current Task
                </div>

                <div className="mt-2 text-sm text-white/70">
                  {runtime?.task ?? 'Idle'}
                </div>
              </div>

              <div className="mt-6">
                <div className="text-sm text-cyan-300">
                  Agent Services
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map(
                    (service) => (
                      <span
                        key={service}
                        className="
                          rounded-full
                          bg-cyan-500/10
                          px-3
                          py-1
                          text-xs
                          text-cyan-300
                        "
                      >
                        {service}
                      </span>
                    )
                  )}
                </div>
              </div>

              {project.recruiterNotes && (
                <div className="mt-6">
                  <div className="text-sm text-cyan-300">
                    Capabilities
                  </div>

                  <ul className="mt-3 space-y-2">
                    {project.recruiterNotes.map(
                      (note) => (
                        <li
                          key={note}
                          className="text-sm text-white/70"
                        >
                          • {note}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
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
        opacity: visible ? 1 : 0,
        x: visible ? 0 : -15,
      }}
      transition={{
        duration: 0.35,
      }}
      className="flex items-center gap-3"
    >
      <motion.div
        animate={{
          scale: visible
            ? [1, 1.4, 1]
            : 1,
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
        }}
        className="h-2 w-2 rounded-full bg-cyan-400"
      />

      <div className="text-sm text-white/80">
        {text}
      </div>
    </motion.div>
  )
}