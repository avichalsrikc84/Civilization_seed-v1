import { useCivilizationStore } from '../../store/civilizationStore'

import SkillConstellation from '../constellations/SkillConstellation'
import CivilizationNodes from '../world/CivilizationNodes'

export default function KnowledgeLayer() {
  const stage =
    useCivilizationStore(
      (s) => s.stage
    )

  return (
    <group visible={stage === 2}>
      <CivilizationNodes />
      <SkillConstellation />
    </group>
  )
}