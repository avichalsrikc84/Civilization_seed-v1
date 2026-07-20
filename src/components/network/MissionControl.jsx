import {
  AnimatePresence,
  motion,
} from 'framer-motion'

import MissionControlItem from './MissionControlItem'

import { useDigitalDNAStore } from '../../store/digitalDNAStore'
import { useMissionControlStore } from '../../store/missionControlStore'
import { useNetworkStore } from '../../store/networkStore'

import { runAgentRuntime } from '../../runtime/AgentRuntime'

export default function MissionControl() {
  const agents =
    useDigitalDNAStore(
      (s) => s.agents
    )

  const {
    isOpen,
    closePanel,
    setFocusedAgent,
  } =
    useMissionControlStore()

  const {
    setSelectedProject,
  } =
    useNetworkStore()

  async function handleSelect(agent) {
    setFocusedAgent(agent)

    setSelectedProject(agent)

    try {
      await runAgentRuntime(
        agent.source
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{
            x: -420,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          exit={{
            x: -420,
            opacity: 0,
          }}
          transition={{
            duration: 0.45,
          }}
          className="
          absolute
          left-6
          top-20
          bottom-6

          w-[360px]

          rounded-[32px]

          border
          border-cyan-500/20

          bg-slate-950/70

          backdrop-blur-3xl

          p-6

          z-[99]

          overflow-y-auto

          shadow-[0_0_80px_rgba(34,211,238,.08)]
        "
        >
          {/* HEADER */}

          <div className="flex items-center justify-between">

            <div>
              <div className="text-xs tracking-[0.35em] text-cyan-400">
                ATHENA
              </div>

              <h2 className="mt-2 text-2xl font-bold text-white">
                Mission Control
              </h2>
            </div>

            <button
              onClick={closePanel}
              className="
              h-10
              w-10

              rounded-full

              bg-white/5

              text-white/60

              transition

              hover:bg-red-500/20

              hover:text-red-400
            "
            >
              ✕
            </button>
          </div>

          {/* Divider */}

          <div className="my-6 h-px bg-cyan-500/10" />

          {/* AGENTS */}

          <div className="space-y-3">
            {agents.map((agent) => (
              <MissionControlItem
                key={agent.id}
                agent={agent}
                onClick={() =>
                  handleSelect(agent)
                }
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}