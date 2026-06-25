import { useCivilizationStore } from '../../store/civilizationStore'

import ProjectSystem from '../projects/ProjectSystem'

export default function ProjectLayer() {
  const stage =
    useCivilizationStore(
      (s) => s.stage
    )

  return (
    <group visible={stage === 3}>
      <ProjectSystem />
    </group>
  )
}