import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function NeuralNode({
  position,
}) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return

    const pulse =
      1 +
      Math.sin(
        state.clock.elapsedTime * 2 +
          position[0]
      ) *
        0.08

    ref.current.scale.setScalar(
      pulse
    )
  })

  return (
    <mesh
      ref={ref}
      position={position}
    >
      <sphereGeometry
        args={[
          0.11,
          12,
          12,
        ]}
      />

      <meshBasicMaterial
        color="#67e8f9"
      />
    </mesh>
  )
}