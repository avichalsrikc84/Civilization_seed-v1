import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'

export default function ProjectPlanet({
  project,
  radius,
  speed,
  angleOffset,
}) {
  const groupRef = useRef()

  const [hovered, setHovered] =
    useState(false)

  useFrame((state) => {
    if (!groupRef.current)
      return

    const t =
      state.clock.elapsedTime

    const angle =
      t * speed +
      angleOffset

    groupRef.current.position.x =
      Math.cos(angle) *
      radius

    groupRef.current.position.z =
      Math.sin(angle) *
      radius

    groupRef.current.position.y =
      Math.sin(angle * 1.5) *
      0.25
  })

  return (
    <>
      {/* ORBIT RING */}

      <mesh
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
      >
        <ringGeometry
          args={[
            radius - 0.03,
            radius + 0.03,
            128,
          ]}
        />

        <meshBasicMaterial
          color={project.color}
          transparent
          opacity={0.25}
          side={2}
        />
      </mesh>

      {/* PLANET */}

      <group ref={groupRef}>
        <mesh
          onPointerOver={() =>
            setHovered(true)
          }
          onPointerOut={() =>
            setHovered(false)
          }
          scale={
            hovered
              ? 1.15
              : 1
          }
        >
          <sphereGeometry
            args={[
              0.45,
              48,
              48,
            ]}
          />

          <meshStandardMaterial
            color={project.color}
            emissive={project.color}
            emissiveIntensity={
              hovered
                ? 2.5
                : 1.5
            }
          />
        </mesh>

        {/* PLANET GLOW */}

        <pointLight
          color={project.color}
          intensity={3}
          distance={5}
        />

        {/* HOVER CARD */}

        {hovered && (
          <Html
            center
            distanceFactor={10}
            position={[
              0,
              0.8,
              0,
            ]}
          >
            <div
              className="
              min-w-[220px]

              rounded-2xl

              border
              border-cyan-500/20

              bg-black/90

              backdrop-blur-xl

              p-4
            "
            >
              <div
                className="
                text-white
                font-semibold
                text-sm
              "
              >
                {project.name}
              </div>

              <div
                className="
                mt-1

                text-cyan-300
                text-xs
              "
              >
                {project.category}
              </div>

              <div
                className="
                mt-4

                text-white/60
                text-xs
              "
              >
                Recruiter Score
              </div>

              <div
                className="
                text-green-400

                font-bold

                text-lg
              "
              >
                {project.score}/100
              </div>
            </div>
          </Html>
        )}
      </group>
    </>
  )
}