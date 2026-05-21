import { Sphere }
  from '@react-three/drei'

function latLonToPosition(
  lat,
  lon,
  radius
) {
  const phi =
    (90 - lat) *
    (Math.PI / 180)

  const theta =
    (lon + 180) *
    (Math.PI / 180)

  const x =
    -radius *
    Math.sin(phi) *
    Math.cos(theta)

  const z =
    radius *
    Math.sin(phi) *
    Math.sin(theta)

  const y =
    radius *
    Math.cos(phi)

  return [x, y, z]
}

export default function CivilizationNode({
  lat,
  lon,
}) {
  const position =
    latLonToPosition(
      lat,
      lon,
      2.304
    )

  return (
    <Sphere
      args={[0.018, 10, 10]}
      position={position}
    >
      <meshStandardMaterial
        color="#fde047"
        emissive="#facc15"
        emissiveIntensity={2.5}
        toneMapped={false}
      />
    </Sphere>
  )
}