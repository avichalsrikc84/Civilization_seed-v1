import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export default function AIHub() {
  const ringRef = useRef()

  useFrame((_, delta) => {
    if (!ringRef.current) return

    ringRef.current.rotation.z +=
      delta * 0.45
  })

  return (
    <group>
      {/* Main Communication Ring */}

      <mesh ref={ringRef}>
        <torusGeometry
          args={[
            2.7,
            0.015,
            24,
            256,
          ]}
        />

        <meshBasicMaterial
          color="#38bdf8"
        />
      </mesh>

      {/* Outer Glow Ring */}

      <mesh
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
      >
        <torusGeometry
          args={[
            2.95,
            0.008,
            16,
            256,
          ]}
        />

        <meshBasicMaterial
          color="#67e8f9"
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Vertical Ring */}

      <mesh
        rotation={[
          0,
          Math.PI / 2,
          0,
        ]}
      >
        <torusGeometry
          args={[
            2.82,
            0.008,
            16,
            256,
          ]}
        />

        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.22}
        />
      </mesh>
    </group>
  )
}