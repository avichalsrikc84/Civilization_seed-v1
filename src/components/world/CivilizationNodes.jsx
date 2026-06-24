import CivilizationNode
  from './CivilizationNode'

import { useCivilizationStore }
  from '../../store/civilizationStore'

export default function CivilizationNodes() {
  const nodes =
    useCivilizationStore(
      (state) => state.nodes
    )

  const stage =
    useCivilizationStore(
      (state) => state.stage
    )

  // ONLY SHOW IN INTERSTELLAR
  if (stage < 6) return null

  return (
    <>
      {nodes.map(
        (node, index) => (
          <CivilizationNode
            key={node.id}
            lat={node.lat}
            lon={node.lon}
            index={index}
          />
        )
      )}
    </>
  )
}