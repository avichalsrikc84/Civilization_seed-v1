import { Torus } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export default function CivilizationRing() {
  const ringRef = useRef()

  useFrame(() => {
    if (!ringRef.current) return

    ringRef.current.rotation.x += 0.001
    ringRef.current.rotation.y += 0.0015
  })

  return (
    <Torus
      ref={ringRef}
      args={[3.3, 0.01, 16, 200]}
      rotation={[Math.PI / 2.4, 0, 0]}
    >
      <meshBasicMaterial
        color="#60a5fa"
        transparent
        opacity={0.4}
      />
    </Torus>
  )
}