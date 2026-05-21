import { Sphere, Trail }
  from '@react-three/drei'

import { useFrame }
  from '@react-three/fiber'

import { useRef }
  from 'react'

export default function StarlinkSatellite({
  radius = 5,
  speed = 0.2,
  offset = 0,
  inclination = 0,
}) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return

    const t =
      state.clock.elapsedTime *
        speed +
      offset

    const x =
      Math.cos(t) * radius

    const z =
      Math.sin(t) * radius

    const y =
      Math.sin(
        t + inclination
      ) * 0.8

    ref.current.position.set(
      x,
      y,
      z
    )
  })

  return (
    <Trail
      width={0.02}
      length={2}
      color="#38bdf8"
      attenuation={(t) => t}
    >
      <Sphere
        ref={ref}
        args={[0.015, 8, 8]}
      >
        <meshBasicMaterial
         color="#facc15"
        />
      </Sphere>
    </Trail>
  )
}