import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export default function EngineThrusters() {
  const left = useRef()
  const right = useRef()

  useFrame((state) => {
    const pulse =
      0.8 +
      Math.sin(
        state.clock.elapsedTime * 8
      ) *
        0.25

    if (left.current)
      left.current.scale.y = pulse

    if (right.current)
      right.current.scale.y = pulse
  })

  return (
    <>
      <mesh
        ref={left}
        position={[-0.05, -0.06, -0.09]}
      >
        <coneGeometry
          args={[0.015, 0.08, 8]}
        />

        <meshBasicMaterial
          color="#38bdf8"
        />
      </mesh>

      <mesh
        ref={right}
        position={[0.05, -0.06, -0.09]}
      >
        <coneGeometry
          args={[0.015, 0.08, 8]}
        />

        <meshBasicMaterial
          color="#38bdf8"
        />
      </mesh>
    </>
  )
}