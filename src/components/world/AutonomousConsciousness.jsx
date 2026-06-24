import { useEffect }
  from 'react'

import { useCivilizationStore }
  from '../../store/civilizationStore'

export default function AutonomousConsciousness() {
  const stage =
    useCivilizationStore(
      (state) => state.stage
    )

  const nodes =
    useCivilizationStore(
      (state) => state.nodes
    )

  const setActiveRegion =
    useCivilizationStore(
      (state) =>
        state.setActiveRegion
    )

  useEffect(() => {
    if (stage < 6) return

    const interval =
      setInterval(() => {
        if (nodes.length < 1)
          return

        // AI CHOOSES RANDOM HUB
        const target =
          nodes[
            Math.floor(
              Math.random() *
                nodes.length
            )
          ]

        if (!target) return

        setActiveRegion(
          target.lat,
          target.lon
        )
      }, 2200)

    return () =>
      clearInterval(interval)
  }, [
    stage,
    nodes,
    setActiveRegion,
  ])

  return null
}