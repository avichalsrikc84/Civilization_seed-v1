import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'

export default function SkillStar({
  skill,
  position,
}) {
  const [hovered, setHovered] =
    useState(false)

  const meshRef = useRef()

  const starSize =
    0.05 +
    skill.level * 0.0015

  useFrame((state) => {
    if (!meshRef.current) return

    const pulse =
      1 +
      Math.sin(
        state.clock.elapsedTime * 2
      ) *
        0.08

    const hoverScale =
      hovered ? 1.4 : 1

    meshRef.current.scale.setScalar(
      pulse * hoverScale
    )
  })

  return (
    <group position={position}>
      {/* STAR */}
      <mesh
        ref={meshRef}
        onPointerOver={() =>
          setHovered(true)
        }
        onPointerOut={() =>
          setHovered(false)
        }
      >
        <sphereGeometry
          args={[
            starSize,
            32,
            32,
          ]}
        />

        <meshBasicMaterial
          color="#67e8f9"
        />
      </mesh>

      {/* GLOW */}
      <pointLight
        color="#22d3ee"
        intensity={5}
        distance={4}
      />

      {/* HOVER CARD */}
      {hovered && (
        <Html
          center
          distanceFactor={12}
          position={[0, 0.4, 0]}
        >
          <div
            className="
            px-4
            py-3

            rounded-2xl

            bg-black/90

            border
            border-cyan-400/20

            backdrop-blur-xl

            min-w-[160px]
          "
          >
            <div
              className="
              text-cyan-300
              font-semibold
              text-sm
            "
            >
              {skill.name}
            </div>

            <div
              className="
              text-white/70
              text-xs
              mt-1
            "
            >
              {skill.category}
            </div>

            <div
              className="
              mt-3
              text-white
              text-xs
            "
            >
              Mastery
            </div>

            <div
              className="
              mt-1

              h-1.5

              bg-white/10

              rounded-full
              overflow-hidden
            "
            >
              <div
                className="
                h-full
                bg-cyan-400
              "
                style={{
                  width:
                    `${skill.level}%`,
                }}
              />
            </div>

            <div
              className="
              mt-2
              text-cyan-200
              text-xs
            "
            >
              {skill.level}%
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}