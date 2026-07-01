import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export default function NavigationLights() {
  const blue = useRef()
  const red = useRef()
  const green = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime

    if (blue.current)
      blue.current.material.opacity =
        0.5 + Math.sin(t * 5) * 0.5

    if (red.current)
      red.current.material.opacity =
        0.5 +
        Math.sin(t * 4 + 1.3) * 0.5

    if (green.current)
      green.current.material.opacity =
        0.5 +
        Math.sin(t * 6 + 2.1) * 0.5
  })

  return (
    <>
      {/* TOP */}

      <mesh
        ref={blue}
        position={[0, 0.22, 0]}
      >
        <sphereGeometry
          args={[0.02, 12, 12]}
        />

        <meshBasicMaterial
          color="#38bdf8"
          transparent
        />
      </mesh>

      {/* LEFT */}

      <mesh
        ref={red}
        position={[-0.12, 0, 0]}
      >
        <sphereGeometry
          args={[0.015, 10, 10]}
        />

        <meshBasicMaterial
          color="#ef4444"
          transparent
        />
      </mesh>

      {/* RIGHT */}

      <mesh
        ref={green}
        position={[0.12, 0, 0]}
      >
        <sphereGeometry
          args={[0.015, 10, 10]}
        />

        <meshBasicMaterial
          color="#22c55e"
          transparent
        />
      </mesh>
    </>
  )
}