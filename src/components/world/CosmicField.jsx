import { Points, PointMaterial }
  from '@react-three/drei'

import { useMemo }
  from 'react'

export default function CosmicField() {
  const particles = useMemo(() => {
    const positions = []

    for (let i = 0; i < 4000; i++) {
      positions.push(
        (Math.random() - 0.5) * 80
      )

      positions.push(
        (Math.random() - 0.5) * 80
      )

      positions.push(
        (Math.random() - 0.5) * 80
      )
    }

    return new Float32Array(
      positions
    )
  }, [])

  return (
    <Points
      positions={particles}
      stride={3}
    >
      <PointMaterial
        transparent
        color="#facc15"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  )
}