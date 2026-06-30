import * as THREE from 'three'

export default function OrbitRing({
  radius,
  tilt = 0,
}) {
  return (
    <mesh
      rotation={[
        -Math.PI / 2 + tilt,
        0,
        0,
      ]}
    >
      <ringGeometry
        args={[
          radius - 0.015,
          radius + 0.015,
          256,
        ]}
      />

      <meshBasicMaterial
        color="#38bdf8"
        transparent
        opacity={0.18}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}