import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'

import { useNetworkStore } from '../../store/networkStore'
import SatelliteEffects
from './effects/SatelliteEffects'


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

  const {
    selectedProject,
    setHoveredProject,
    setSelectedProject,
  } = useNetworkStore()

  const isFocused =
    selectedProject?.id === project.id

  useFrame((state) => {
    if (!groupRef.current) return

    // Stop orbit when selected
    const t = isFocused
      ? angleOffset
      : state.clock.elapsedTime * speed +
        angleOffset

    const x = Math.cos(t) * radius
    const z = Math.sin(t) * radius
    const y =
      Math.sin(t * 0.8) * 0.25

    groupRef.current.position.set(
      x,
      y,
      z
    )

    groupRef.current.rotation.x =
      orbitTilt

    groupRef.current.lookAt(0, 0, 0)

    groupRef.current.rotateZ(0.01)

    const targetScale =
      isFocused ? 0.12 : 0.08

groupRef.current.scale.lerp(
  new THREE.Vector3(
    targetScale,
    targetScale,
    targetScale
  ),
  0.08
)
  })

  return (
    <group ref={groupRef}>
      <primitive
        object={scene.clone()}
        onPointerOver={() => {
          setHovered(true)
          setHoveredProject(project)
        }}
        onPointerOut={() => {
          setHovered(false)
          setHoveredProject(null)
        }}
        onClick={() =>
          setSelectedProject(project)
        }
      />

      <pointLight
        color={project.color}
        intensity={
          isFocused ? 5 : 2
        }
        distance={
          isFocused ? 6 : 3
        }
      />

      <primitive
    object={scene.clone()}
/>

<SatelliteEffects />

      {hovered && (
        <mesh position={[0, 0.25, 0]}>
          <sphereGeometry
            args={[0.04, 10, 10]}
          />

          <meshBasicMaterial
            color="#7dd3fc"
          />
        </mesh>
      )}
    </group>
  )
}

useGLTF.preload('/models/satellite.glb')