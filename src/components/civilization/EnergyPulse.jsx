import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export default function EnergyPulse() {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return

    const scale =
      1 + Math.sin(state.clock.elapsedTime * 2) * 0.08

    ref.current.scale.set(scale, scale, scale)
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2.45, 64, 64]} />

      <meshBasicMaterial
        color="#60a5fa"
        transparent
        opacity={0.03}
      />
    </mesh>
  )
}