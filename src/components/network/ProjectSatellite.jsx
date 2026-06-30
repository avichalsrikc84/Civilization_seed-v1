import { Html, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'

export default function ProjectSatellite({
  project,
  radius,
  speed,
  angleOffset,
  orbitTilt = 0,
}) {
  const groupRef = useRef()

  const { scene } = useGLTF('/models/satellite.glb')

  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!groupRef.current) return

    const t =
      state.clock.elapsedTime * speed +
      angleOffset

    const x =
      Math.cos(t) * radius

    const z =
      Math.sin(t) * radius

    const y =
      Math.sin(t * 0.8) * 0.25

    groupRef.current.position.set(
      x,
      y,
      z
    )

    // Orbit tilt
    groupRef.current.rotation.x =
      orbitTilt

    // Face Earth
    groupRef.current.lookAt(0, 0, 0)

    // Small self rotation
    groupRef.current.rotateZ(0.01)
  })

  return (
    <group ref={groupRef}>
      <primitive
        object={scene.clone()}
        scale={0.08}
        onPointerOver={() =>
          setHovered(true)
        }
        onPointerOut={() =>
          setHovered(false)
        }
      />

      <pointLight
        color={project.color}
        intensity={2}
        distance={3}
      />

      {hovered && (
        <Html
          center
          distanceFactor={10}
          position={[0, 0.6, 0]}
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

useGLTF.preload('/models/satellite.glb')