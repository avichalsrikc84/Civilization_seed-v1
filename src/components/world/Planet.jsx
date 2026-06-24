import { useRef } from 'react'

import { useFrame }
  from '@react-three/fiber'

import { useTexture }
  from '@react-three/drei'

import * as THREE from 'three'

import { useCivilizationStore }
  from '../../store/civilizationStore'

import CivilizationNodes
  from './CivilizationNodes'



import AttentionWave
  from './AttentionWave'

import AutonomousConsciousness
  from './AutonomousConsciousness'


export default function Planet() {
  const earthRef = useRef()

  const cloudRef = useRef()

  const addNode =
    useCivilizationStore(
      (state) => state.addNode
    )

  const stage =
    useCivilizationStore(
      (state) => state.stage
    )

  // TEXTURES
  const [
    colorMap,
    nightMap,
    cloudMap,
  ] = useTexture([
    '/textures/earth_day.jpg',
    '/textures/earth_lights.png',
    '/textures/earth_clouds.png',
  ])

  // HIGH QUALITY TEXTURES
  ;[
    colorMap,
    nightMap,
    cloudMap,
  ].forEach((tex) => {
    tex.anisotropy = 16
    tex.colorSpace =
      THREE.SRGBColorSpace
  })

  // ROTATION
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y +=
        0.0009
    }

    // CLOUDS MOVE SLIGHTLY FASTER
    if (cloudRef.current) {
      cloudRef.current.rotation.y +=
        0.0011
    }
  })

  return (
    <group ref={earthRef}>
      {/* EARTH */}
      <mesh
        onClick={(e) => {
          e.stopPropagation()

          const p = e.point

          const radius =
            Math.sqrt(
              p.x * p.x +
                p.y * p.y +
                p.z * p.z
            )

          const lat =
            Math.asin(
              p.y / radius
            ) *
            (180 / Math.PI)

          const lon =
            Math.atan2(p.z, p.x) *
            (180 / Math.PI)

          addNode(lat, lon)
        }}
        onPointerOver={() => {
          document.body.style.cursor =
            'pointer'
        }}
        onPointerOut={() => {
          document.body.style.cursor =
            'default'
        }}
      >
        <sphereGeometry
          args={[2.3, 128, 128]}
        />

        <meshStandardMaterial
          map={colorMap}
          emissiveMap={nightMap}
          emissive={
  new THREE.Color(
    stage >= 6
      ? '#38bdf8'
      : '#facc15'
  )
}
          emissiveIntensity={
  stage >= 6
    ? 2.5
    : 0.15 +
      stage * 0.18
}
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* CLOUD LAYER */}
      <mesh
        ref={cloudRef}
        scale={1.003}
      >
        <sphereGeometry
          args={[2.31, 128, 128]}
        />

        <meshStandardMaterial
          map={cloudMap}
          transparent
          opacity={0.32}
          depthWrite={false}
        />
      </mesh>

      {/* ATMOSPHERE */}
      <mesh scale={1.015}>
        <sphereGeometry
          args={[2.34, 64, 64]}
        />

        <meshPhysicalMaterial
          color="#60a5fa"
          transparent
          opacity={0.03}
          roughness={1}
          transmission={0.2}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* CIVILIZATION NODES */}
      <CivilizationNodes />

<AttentionWave />

<AutonomousConsciousness />

    </group>
  )
}