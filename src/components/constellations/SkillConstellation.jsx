import { useMemo } from 'react'

import SkillStar
  from './SkillStar'

import {
  useDigitalDNAStore,
} from '../../store/digitalDNAStore'

import {
  useCivilizationStore,
} from '../../store/civilizationStore'



export default function SkillConstellation() {
  const skills =
    useDigitalDNAStore(
      (s) => s.skills
    )

  const stage =
    useCivilizationStore(
      (s) => s.stage
    )

  const stars = useMemo(() => {
    const radius = 5.2

    return skills.map(
      (skill, index) => {
        const angle =
          (index /
            skills.length) *
          Math.PI *
          2

        return {
          skill,

          position: [
            Math.cos(angle) *
              radius,

            Math.sin(
              angle * 1.5
            ) * 1.5,

            Math.sin(angle) *
              radius,
          ],
        }
      }
    )
  }, [skills])

  if (stage < 2)
    return null

  return (
    <>
      {stars.map((star) => (
        <SkillStar
          key={
            star.skill.name
          }
          skill={star.skill}
          position={
            star.position
          }
        />
      ))}
    </>
  )
}