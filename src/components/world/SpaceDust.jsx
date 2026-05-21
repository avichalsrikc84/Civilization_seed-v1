import { Points, PointMaterial } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'

export default function SpaceDust() {
  const ref = useRef()

  const particles = useMemo(() => {
    const positions = []

    for (let i = 0; i < 25000; i++) {
      positions.push((Math.random() - 0.5) * 250)
      positions.push((Math.random() - 0.5) * 250)
      positions.push((Math.random() - 0.5) * 250)
    }

    return new Float32Array(positions)
  }, [])

  useFrame(() => {
    if (!ref.current) return

    ref.current.rotation.y += 0.00008
  })

  return (
    <group>
      {/* FAR STAR LAYER */}
      <Points
        ref={ref}
        positions={particles}
        stride={3}
      >
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.06}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>

      {/* MID STAR LAYER */}
      <Points
        positions={particles}
        stride={3}
        scale={0.7}
      >
        <PointMaterial
          transparent
          color="#93c5fd"
          size={0.04}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>

      {/* NEAR STAR LAYER */}
      <Points
        positions={particles}
        stride={3}
        scale={0.45}
      >
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.08}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  )
}