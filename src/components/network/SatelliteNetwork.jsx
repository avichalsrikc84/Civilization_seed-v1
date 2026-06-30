import OrbitRing from './OrbitRing'
import ProjectSatellite from './ProjectSatellite'
import AIHub from './AIHub'
import { useDigitalDNAStore } from '../../store/digitalDNAStore'

export default function SatelliteNetwork() {
  const projects =
    useDigitalDNAStore(
      (s) => s.projects
    )

  return (
    <>
 <AIHub />
<OrbitRing radius={3.2} tilt={0} />
<OrbitRing radius={4.3} tilt={0.4} />
<OrbitRing radius={5.4} tilt={-0.45} />

      {projects.map(
        (project, index) => {
          let radius = 3.2
          let speed = 0.35
          let tilt = 0

          if (index % 3 === 1) {
            radius = 4.3
            speed = 0.25
            tilt = 0.4
          }

          if (index % 3 === 2) {
            radius = 5.4
            speed = 0.18
            tilt = -0.45
          }

          return (
            <ProjectSatellite
              key={project.id}
              project={project}
              radius={radius}
              speed={speed}
              orbitTilt={tilt}
              angleOffset={
                (Math.PI * 2 * index) /
                projects.length
              }
            />
          )
        }
      )}
    </>
  )
}