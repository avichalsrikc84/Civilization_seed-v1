import { useFrame }
  from '@react-three/fiber'

import { useRef }
  from 'react'

import { useCivilizationStore }
  from '../../store/civilizationStore'

export default function PlanetaryPulse() {
  const ref = useRef()

  const stage =
    useCivilizationStore(
      (state) => state.stage
    )

  useFrame((state) => {
    if (!ref.current) return

    // ONLY INTERSTELLAR
    if (stage < 6) {
      ref.current.visible = false
      return
    }

    ref.current.visible = true

    const t =
      state.clock.elapsedTime

    // breathing pulse
    const scale =
      1 +
      Math.sin(t * 1.2) * 0.035

    ref.current.scale.set(
      scale,
      scale,
      scale
    )

    // opacity pulse
    ref.current.material.opacity =
      0.05 +
      Math.sin(t * 1.2) * 0.02
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry
        args={[2.5, 128, 128]}
      />

      <meshBasicMaterial
        color="#60a5fa"
        transparent
        opacity={0.05}
      />
    </mesh>
  )
}