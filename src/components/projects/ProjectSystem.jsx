import ProjectPlanet from './ProjectPlanet'

import { useDigitalDNAStore } from '../../store/digitalDNAStore'
import { useCivilizationStore } from '../../store/civilizationStore'

export default function ProjectSystem() {
  const projects =
    useDigitalDNAStore(
      (s) => s.projects || []
    )

  const stage =
    useCivilizationStore(
      (s) => s.stage
    )

  return (
    <group visible={stage === 3}>
      {projects.map((project, index) => (
        <ProjectPlanet
          key={project.id}
          project={project}
          radius={5 + index * 1.4}
          speed={0.015 + index * 0.004}
          angleOffset={
            index *
            Math.PI *
            0.5
          }
        />
      ))}
    </group>
  )
}