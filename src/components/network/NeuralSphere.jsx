import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

import NeuralNode from './NeuralNode'
import NeuralConnections from './NeuralConnections'

export default function NeuralSphere() {
  const groupRef = useRef()

  const nodes = useMemo(() => {
    const radius = 4.8
    const nodes = []

    // ==========================
    // TOP CLUSTER
    // ==========================
    for (let i = 0; i < 5; i++) {
      const theta =
        Math.random() * Math.PI * 2

      const phi =
        Math.PI * 0.22 +
        (Math.random() - 0.5) * 0.35

      nodes.push([
        radius *
          Math.sin(phi) *
          Math.cos(theta),

        radius *
          Math.cos(phi),

        radius *
          Math.sin(phi) *
          Math.sin(theta),
      ])
    }

    // ==========================
    // MIDDLE BELT
    // ==========================
    for (let i = 0; i < 8; i++) {
      const theta =
        (i / 8) *
          Math.PI *
          2 +
        Math.random() * 0.45

      const phi =
        Math.PI / 2 +
        (Math.random() - 0.5) * 0.45

      nodes.push([
        radius *
          Math.sin(phi) *
          Math.cos(theta),

        radius *
          Math.cos(phi),

        radius *
          Math.sin(phi) *
          Math.sin(theta),
      ])
    }

    // ==========================
    // BOTTOM CLUSTER
    // ==========================
    for (let i = 0; i < 5; i++) {
      const theta =
        Math.random() * Math.PI * 2

      const phi =
        Math.PI * 0.78 +
        (Math.random() - 0.5) * 0.35

      nodes.push([
        radius *
          Math.sin(phi) *
          Math.cos(theta),

        radius *
          Math.cos(phi),

        radius *
          Math.sin(phi) *
          Math.sin(theta),
      ])
    }

    return nodes
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return

    // Slow rotation
    groupRef.current.rotation.y =
      state.clock.elapsedTime * 0.025

    // Gentle tilt
    groupRef.current.rotation.x =
      Math.sin(
        state.clock.elapsedTime * 0.15
      ) * 0.08

    // Breathing animation
    const breathe =
      1 +
      Math.sin(
        state.clock.elapsedTime * 0.7
      ) * 0.012

    groupRef.current.scale.set(
      breathe,
      breathe,
      breathe
    )
  })

  return (
    <group ref={groupRef}>
      {/* Neural Connections */}
      <NeuralConnections
        nodes={nodes}
      />

      {/* Neural Nodes */}
      {nodes.map((position, index) => (
        <NeuralNode
          key={index}
          position={position}
        />
      ))}
    </group>
  )
}