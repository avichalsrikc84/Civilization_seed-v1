import { Points, PointMaterial } from '@react-three/drei'
import { useMemo } from 'react'

export default function CityLights() {
  const particles = useMemo(() => {
    const positions = []

    for (let i = 0; i < 1500; i++) {
      const radius = 2.33

      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(
        2 * Math.random() - 1
      )

      positions.push(
        radius * Math.sin(phi) * Math.cos(theta)
      )

      positions.push(
        radius * Math.sin(phi) * Math.sin(theta)
      )

      positions.push(
        radius * Math.cos(phi)
      )
    }

    return new Float32Array(positions)
  }, [])

  return (
    <Points
      positions={particles}
      stride={3}
    >
      <PointMaterial
        transparent
        color="#60a5fa"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  )
}