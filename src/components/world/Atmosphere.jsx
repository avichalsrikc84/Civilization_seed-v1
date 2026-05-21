export default function Atmosphere() {
  return (
    <mesh scale={1.08}>
      <sphereGeometry args={[2.25, 64, 64]} />

      <meshBasicMaterial
        color="#3b82f6"
        transparent
        opacity={0.12}
      />
    </mesh>
  )
}