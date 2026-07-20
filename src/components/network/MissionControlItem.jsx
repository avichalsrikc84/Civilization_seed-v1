import { motion } from 'framer-motion'

import { useMissionControlStore }
from '../../store/missionControlStore'

export default function MissionControlItem({
  agent,
  onClick,
}) {
  const {
    hoveredAgent,
    setHoveredAgent,
  } =
    useMissionControlStore()

  const active =
    hoveredAgent?.id ===
    agent.id

  return (
    <motion.button
      whileHover={{
        scale: 1.02,
      }}

      whileTap={{
        scale: 0.98,
      }}

      onMouseEnter={() =>
        setHoveredAgent(agent)
      }

      onMouseLeave={() =>
        setHoveredAgent(null)
      }

      onClick={onClick}

      className={`
      w-full

      rounded-2xl

      px-5

      py-4

      mb-3

      border

      transition-all

      ${
        active
          ? 'border-cyan-400 bg-cyan-500/10'
          : 'border-white/10 bg-white/5'
      }
    `}
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="font-semibold text-white">
            {agent.name}
          </div>

          <div className="text-xs text-white/50">
            {agent.type}
          </div>
        </div>

        <div
          className={`
          h-3
          w-3
          rounded-full

          ${
            agent.status ===
            'ONLINE'
              ? 'bg-green-400'
              : 'bg-yellow-400'
          }
        `}
        />
      </div>
    </motion.button>
  )
}