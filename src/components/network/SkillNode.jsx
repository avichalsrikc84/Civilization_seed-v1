import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'

export default function SkillNode({
  skill,
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
        state.clock.elapsedTime * 2 +
          position[0]
      ) *
        0.08

    meshRef.current.scale.setScalar(
      hovered
        ? pulse * 1.25
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
        <sphereGeometry
          args={[0.13, 16, 16]}
        />

        <meshBasicMaterial
          color="#38bdf8"
        />
      </mesh>

      {hovered && (
        <Html
          center
          distanceFactor={10}
          position={[0, 0.45, 0]}
        >
          <div
            className="
              rounded-xl
              bg-black/90
              border
              border-cyan-400/20
              px-3
              py-2
              backdrop-blur-xl
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
                text-xs
                text-white/60
              "
            >
              {skill.category}
            </div>

            <div
              className="
                mt-2
                h-1
                rounded-full
                bg-white/10
              "
            >
              <div
                className="
                  h-full
                  rounded-full
                  bg-cyan-400
                "
                style={{
                  width: `${skill.level}%`,
                }}
              />
            </div>

            <div
              className="
                mt-1
                text-xs
                text-cyan-200
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