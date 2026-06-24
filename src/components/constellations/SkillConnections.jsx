import { Line } from '@react-three/drei'

import {
  useDigitalDNAStore,
} from '../../store/digitalDNAStore'

import {
  useCivilizationStore,
} from '../../store/civilizationStore'

import { useMemo } from 'react'

export default function SkillConnections() {
  const stage =
    useCivilizationStore(
      (s) => s.stage
    )

  const skills =
    useDigitalDNAStore(
      (s) => s.skills
    )

  if (stage < 2)
    return null

  const radius = 5.2

  const positions = useMemo(() => {
    const map = {}

    skills.forEach(
      (skill, index) => {
        const angle =
          (index /
            skills.length) *
          Math.PI *
          2

        map[skill.name] = [
          Math.cos(angle) *
            radius,

          Math.sin(
            angle * 1.5
          ) * 1.5,

          Math.sin(angle) *
            radius,
        ]
      }
    )

    return map
  }, [skills])

  const connections = [
    ['Python', 'Machine Learning'],

    ['Python', 'SQL'],

    ['SQL', 'Power BI'],

    ['React', 'Three.js'],
  ]

  return (
    <>
      {connections.map(
        ([a, b], i) => {
          if (
            !positions[a] ||
            !positions[b]
          )
            return null

          return (
            <AnimatedConnection
              key={i}
              start={positions[a]}
              end={positions[b]}
            />
          )
        }
      )}
    </>
  )
}

function AnimatedConnection({
  start,
  end,
}) {
  return (
    <Line
      points={[
        start,
        end,
      ]}
      color="#22d3ee"
      transparent
      opacity={0.35}
      lineWidth={1.5}
    />
  )
}