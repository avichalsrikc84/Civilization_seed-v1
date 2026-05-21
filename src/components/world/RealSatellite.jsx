import {
  Trail,
  useGLTF,
} from '@react-three/drei'

import { useFrame } from '@react-three/fiber'

import { useRef } from 'react'

export default function RealSatellite() {
  const ref = useRef()

  const { scene } = useGLTF(
    '/models/satellite.glb'
  )

  useFrame((state) => {
    if (!ref.current) return

    const t =
      state.clock.elapsedTime * 0.35

    const radius = 4.4

    const x = Math.cos(t) * radius
    const z = Math.sin(t) * radius
    const y = Math.sin(t * 1.5) * 0.6

    ref.current.position.set(x, y, z)

    ref.current.lookAt(0, 0, 0)
  })

  return (
    <Trail
      width={0.12}
      length={8}
      color="#38bdf8"
      attenuation={(t) => t * t}
    >
      <primitive
        ref={ref}
        object={scene}
        scale={0.12}
      />
    </Trail>
  )
}