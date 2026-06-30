import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

import SkillStar from './SkillStar'

import { useDigitalDNAStore } from '../../store/digitalDNAStore'
import { useCivilizationStore } from '../../store/civilizationStore'

export default function SkillConstellation() {
  const groupRef = useRef()

  const skills = useDigitalDNAStore((s) => s.skills)

  const stage = useCivilizationStore((s) => s.stage)

  const stars = useMemo(() => {
    const radius = 5.2

    return skills.map((skill, index) => {
      const angle =
        (index / skills.length) *
        Math.PI *
        2

      return {
        skill,
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle * 1.5) * 1.2,
          Math.sin(angle) * radius,
        ],
      }
    })
  }, [skills])

  useFrame((_, delta) => {
    if (!groupRef.current) return

    groupRef.current.rotation.y +=
      delta * 0.003
  })

  return (
    <group
      ref={groupRef}
      visible={stage === 2}
    >
      {stars.map((star) => (
        <SkillStar
          key={star.skill.name}
          skill={star.skill}
          position={star.position}
        />
      ))}
    </group>
  )
}