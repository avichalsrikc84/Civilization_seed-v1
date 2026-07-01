import OrbitRing from './OrbitRing'
import ProjectSatellite from './ProjectSatellite'
import AIHub from './AIHub'

import { useDigitalDNAStore } from '../../store/digitalDNAStore'

export default function SatelliteNetwork() {
  // ⭐ Network Phase now uses AI Agents
  const agents = useDigitalDNAStore(
    (s) => s.agents
  )

  return (
    <>
      <AIHub />

      <OrbitRing
        radius={3.2}
        tilt={0}
      />

      <OrbitRing
        radius={4.3}
        tilt={0.4}
      />

      <OrbitRing
        radius={5.4}
        tilt={-0.45}
      />

      {agents.map((agent, index) => {
        let radius = 3.2
        let speed = 0.35
        let tilt = 0

        switch (index % 3) {
          case 1:
            radius = 4.3
            speed = 0.25
            tilt = 0.4
            break

          case 2:
            radius = 5.4
            speed = 0.18
            tilt = -0.45
            break

          default:
            break
        }

        return (
          <ProjectSatellite
            key={agent.id}
            project={agent}   // We keep the prop name "project"
            radius={radius}
            speed={speed}
            orbitTilt={tilt}
            angleOffset={
              (Math.PI * 2 * index) /
              agents.length
            }
          />
        )
      })}
    </>
  )
}