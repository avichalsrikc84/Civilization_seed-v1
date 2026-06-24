import { Sphere }
  from '@react-three/drei'

import { useFrame }
  from '@react-three/fiber'

import { useRef }
  from 'react'

import { useCivilizationStore }
  from '../../store/civilizationStore'

function latLonToPosition(
  lat,
  lon,
  radius
) {
  const phi =
    (90 - lat) *
    (Math.PI / 180)

  const theta =
    (lon + 180) *
    (Math.PI / 180)

  const x =
    -radius *
    Math.sin(phi) *
    Math.cos(theta)

  const z =
    radius *
    Math.sin(phi) *
    Math.sin(theta)

  const y =
    radius *
    Math.cos(phi)

  return [x, y, z]
}

export default function CivilizationNode({
  lat,
  lon,
  index,
}) {
  const ref = useRef()

  const stage =
    useCivilizationStore(
      (state) => state.stage
    )

  const activeRegion =
    useCivilizationStore(
      (state) => state.activeRegion
    )

  const position =
    latLonToPosition(
      lat,
      lon,
      2.304
    )

  useFrame((state) => {
    if (!ref.current) return

    let intensity = 2

    // INTERSTELLAR AI SYNCHRONIZATION
    if (stage >= 6) {
      const pulse =
        Math.sin(
          state.clock.elapsedTime *
            2.5 -
            index * 0.08
        )

      intensity =
        2 +
        Math.max(0, pulse) * 6
    }

    // USER ATTENTION REACTION
    if (activeRegion) {
      const dist =
        Math.sqrt(
          (lat -
            activeRegion.lat) **
            2 +
            (lon -
              activeRegion.lon) **
              2
        )

      if (dist < 18) {
        intensity +=
          (18 - dist) * 0.7
      }
    }

    ref.current.material.emissiveIntensity =
      intensity

    ref.current.scale.setScalar(
      1 + intensity * 0.03
    )
  })

  return (
    <Sphere
      ref={ref}
      args={[0.018, 10, 10]}
      position={position}
    >
      <meshStandardMaterial
        color="#fde047"
        emissive="#38bdf8"
        emissiveIntensity={2}
        toneMapped={false}
      />
    </Sphere>
  )
}