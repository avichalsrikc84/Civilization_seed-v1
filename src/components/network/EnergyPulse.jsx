import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

export default function EnergyPulse({
  start,
  end,
  mid,
  speed = 0.18,
  offset = 0,
}) {
  const mesh = useRef()

  const curve = useMemo(() => {
    return new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3(...mid),
      new THREE.Vector3(...end)
    )
  }, [start, end, mid])

  useFrame((state) => {
    if (!mesh.current) return

    // Offset should be 0-1
    const t =
      (state.clock.elapsedTime * speed + (offset % 1)) % 1

    const point = curve.getPoint(t)

    mesh.current.position.copy(point)

    const s =
      1 +
      Math.sin(
        state.clock.elapsedTime * 10
      ) *
        0.15

    mesh.current.scale.setScalar(s)
  })

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.05, 10, 10]} />

      <meshBasicMaterial
        color="#a5f3fc"
      />
    </mesh>
  )
}