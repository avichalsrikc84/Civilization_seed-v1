import { Line } from '@react-three/drei'

export default function ConnectionRenderer({
  start,
  end,
}) {
  return (
    <Line
      points={[start, end]}
      color="#22d3ee"
      lineWidth={1}
      transparent
      opacity={0.45}
    />
  )
}