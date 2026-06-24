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

export default function AttentionWave() {
  const ref = useRef()

  const activeRegion =
    useCivilizationStore(
      (state) => state.activeRegion
    )

  useFrame(() => {
    if (!ref.current) return

    if (!activeRegion) {
      ref.current.visible = false
      return
    }

    ref.current.visible = true

    const elapsed =
      (Date.now() -
        activeRegion.timestamp) /
      1000

    // EXPAND WAVE
    const scale =
      1 + elapsed * 3

    ref.current.scale.set(
      scale,
      scale,
      scale
    )

    // FADE OUT
    ref.current.material.opacity =
      Math.max(
        0,
        0.5 - elapsed * 0.35
      )

    if (elapsed > 1.5) {
      ref.current.visible = false
    }
  })

  if (!activeRegion) return null

  const position =
    latLonToPosition(
      activeRegion.lat,
      activeRegion.lon,
      2.31
    )

  return (
    <mesh
      ref={ref}
      position={position}
    >
      <ringGeometry
        args={[0.02, 0.04, 64]}
      />

      <meshBasicMaterial
        color="#38bdf8"
        transparent
        opacity={0.5}
        side={2}
      />
    </mesh>
  )
}