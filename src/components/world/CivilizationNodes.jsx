import CivilizationNode
  from './CivilizationNode'

import { useCivilizationStore }
  from '../../store/civilizationStore'

export default function CivilizationNodes() {
  const nodes =
    useCivilizationStore(
      (state) => state.nodes
    )

  return (
    <>
      {nodes.map((node) => (
        <CivilizationNode
          key={node.id}
          lat={node.lat}
          lon={node.lon}
        />
      ))}
    </>
  )
}