import { QuadraticBezierLine } from '@react-three/drei'
import { useMemo } from 'react'

import DataPacket from './DataPacket'

export default function CommunicationBeam({
  start,
  end,
}) {
  const mid = useMemo(() => {
    return [
      (start[0] + end[0]) / 2,
      (start[1] + end[1]) / 2 + 0.8,
      (start[2] + end[2]) / 2,
    ]
  }, [start, end])

  return (
    <>
      <QuadraticBezierLine
        start={start}
        end={end}
        mid={mid}
        color="#38bdf8"
        lineWidth={2}
        transparent
        opacity={0.3}
      />

      <DataPacket
        start={start}
        end={end}
        speed={0.28}
        offset={0}
      />

      <DataPacket
        start={start}
        end={end}
        speed={0.28}
        offset={0.33}
      />

      <DataPacket
        start={start}
        end={end}
        speed={0.28}
        offset={0.66}
      />
    </>
  )
}