import { useCivilizationStore } from '../../store/civilizationStore'

import IdentityLayer from './IdentityLayer'
import KnowledgeLayer from './KnowledgeLayer'
import ProjectLayer from './ProjectLayer'
import NetworkLayer from './NetworkLayer'
import ImpactLayer from './ImpactLayer'
import UniverseLayer from './UniverseLayer'

export default function StageManager() {
  const stage =
    useCivilizationStore(
      (s) => s.stage
    )

  switch (stage) {
    case 1:
      return <IdentityLayer />

    case 2:
      return <KnowledgeLayer />

    case 3:
      return <ProjectLayer />

    case 4:
      return <NetworkLayer />

    case 5:
      return <ImpactLayer />

    case 6:
      return <UniverseLayer />

    default:
      return <IdentityLayer />
  }
}