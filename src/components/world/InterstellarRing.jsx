import { Torus } from '@react-three/drei'

import { useFrame }
  from '@react-three/fiber'

import { useRef }
  from 'react'

export default function InterstellarRing() {
  const ref = useRef()

  useFrame(() => {
    if (!ref.current) return

    ref.current.rotation.y += 0.0015
  })

  return (
    <Torus
      ref={ref}
      args={[6.5, 0.04, 32, 300]}
      rotation={[Math.PI / 2.2, 0, 0]}
    >
      <meshBasicMaterial
        color="#60a5fa"
        transparent
        opacity={0.55}
      />
    </Torus>
  )
}