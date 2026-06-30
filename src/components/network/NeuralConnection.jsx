import { QuadraticBezierLine } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

import EnergyPulse from './EnergyPulse'

export default function NeuralConnection({
  start,
  end,
}) {
  const lineRef = useRef()

  // Calculate Bezier control point
  const mid = useMemo(() => {
    return [
      (start[0] + end[0]) / 2,
      (start[1] + end[1]) / 2 + 0.6,
      (start[2] + end[2]) / 2,
    ]
  }, [start, end])

  // Each connection pulses independently
  const randomOffset = useMemo(
  () => Math.random(),
  []
)

  useFrame((state) => {
    if (!lineRef.current?.material) return

    const glow =
      0.18 +
      (Math.sin(
        state.clock.elapsedTime * 2 +
          randomOffset
      ) +
        1) *
        0.08

    lineRef.current.material.opacity = glow
  })

  return (
    <>
      {/* Neural Fiber */}
      <QuadraticBezierLine
        ref={lineRef}
        start={start}
        end={end}
        mid={mid}
        color="#38bdf8"
        lineWidth={2}
        transparent
        opacity={0.2}
      />

      {/* Energy travelling through fiber */}
      <EnergyPulse
        start={start}
        end={end}
        mid={mid}
        speed={0.18}
        offset={randomOffset}
      />
    </>
  )
}