import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'

export default function ProjectNode({
  project,
  position,
}) {
  const meshRef = useRef()

  const [hovered, setHovered] =
    useState(false)

  useFrame((state) => {
    if (!meshRef.current) return

    const pulse =
      1 +
      Math.sin(
        state.clock.elapsedTime * 1.8 +
          position[2]
      ) *
        0.06

    meshRef.current.rotation.y +=
      0.01

    meshRef.current.scale.setScalar(
      hovered
        ? pulse * 1.2
        : pulse
    )
  })

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() =>
          setHovered(true)
        }
        onPointerOut={() =>
          setHovered(false)
        }
      >
        <icosahedronGeometry
          args={[0.18, 1]}
        />

        <meshBasicMaterial
          color={project.color}
        />
      </mesh>

      {hovered && (
        <Html
          center
          distanceFactor={10}
          position={[0, 0.5, 0]}
        >
          <div
            className="
              min-w-[220px]
              rounded-2xl
              bg-black/90
              border
              border-cyan-500/20
              backdrop-blur-xl
              p-4
            "
          >
            <div
              className="
                text-white
                font-semibold
              "
            >
              {project.name}
            </div>

            <div
              className="
                text-cyan-300
                text-xs
                mt-1
              "
            >
              {project.category}
            </div>

            <div
              className="
                mt-3
                text-xs
                text-white/60
              "
            >
              Recruiter Score
            </div>

            <div
              className="
                text-green-400
                text-xl
                font-bold
              "
            >
              {project.score}/100
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}