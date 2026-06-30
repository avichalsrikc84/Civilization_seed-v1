import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

export default function DataPacket({
  start,
  end,
  speed = 0.35,
  offset = 0,
}) {
  const meshRef = useRef()

  const curve = useMemo(() => {
    const mid = new THREE.Vector3(
      (start[0] + end[0]) / 2,
      (start[1] + end[1]) / 2 + 0.5,
      (start[2] + end[2]) / 2
    )

    return new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      mid,
      new THREE.Vector3(...end)
    )
  }, [start, end])

  useFrame((state) => {
    if (!meshRef.current) return

    const t =
      (state.clock.elapsedTime * speed + offset) % 1

    const point = curve.getPoint(t)

    meshRef.current.position.copy(point)

    const pulse =
      1 +
      Math.sin(state.clock.elapsedTime * 12) * 0.25

    meshRef.current.scale.setScalar(pulse)
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.05, 10, 10]} />

      <meshBasicMaterial
        color="#7dd3fc"
      />
    </mesh>
  )
}