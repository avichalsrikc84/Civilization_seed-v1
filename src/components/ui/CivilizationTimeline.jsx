import { useCivilizationStore }
  from '../../store/civilizationStore'

const stages = [
  'Identity',
  'Knowledge',
  'Projects',
  'Network',
  'Impact',
  'Universe',
]

export default function CivilizationTimeline() {
  const stage =
    useCivilizationStore(
      (state) => state.stage
    )

  const setStage =
    useCivilizationStore(
      (state) => state.setStage
    )

  const nodes =
    useCivilizationStore(
      (state) => state.nodes
    )

  return (
    <>
      {/* TIMELINE */}
      <div
        className="
          absolute
          bottom-8
          left-1/2
          -translate-x-1/2
          z-50
          flex
          gap-3
          backdrop-blur-xl
          bg-black/30
          border
          border-white/10
          px-5
          py-3
          rounded-2xl
        "
      >
        {stages.map((label, i) => {
          const value = i + 1

          return (
            <button
              key={label}
              onClick={() =>
                setStage(value)
              }
              className={`
                px-3
                py-1
                rounded-xl
                text-sm
                transition-all
                duration-300
                ${
                  stage >= value
                    ? 'bg-cyan-400 text-black'
                    : 'text-white/40'
                }
              `}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* SEED COUNTER */}
      <div
        className="
          absolute
          top-6
          right-6
          z-50
          backdrop-blur-xl
          bg-black/30
          border
          border-cyan-400/20
          rounded-2xl
          px-5
          py-3
          text-cyan-100
        "
      >
        <div className="text-xs opacity-60 tracking-[0.2em]">
          DIGITAL GROWTH
        </div>

        <div className="mt-1 text-3xl font-bold">
          {
  stage >= 6
    ? nodes.length
    : Math.min(
        100,
        Math.floor(
          nodes.length * 0.7
        )
      )
}
        </div>

        <div className="text-xs opacity-50">
          {
  stage >= 6
    ? 'neural nodes'
    : 'knowledge index'
}
        </div>
      </div>
    </>
  )
}