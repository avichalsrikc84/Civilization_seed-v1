import { Line }
  from '@react-three/drei'

import { useMemo }
  from 'react'

export default function CosmicConnections() {
  const connections = useMemo(() => {
    const arr = []

    for (let i = 0; i < 18; i++) {
      arr.push({
        start: [
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 25,
        ],

        end: [
          0,
          0,
          0,
        ],
      })
    }

    return arr
  }, [])

  return (
    <>
      {connections.map(
        (c, i) => (
          <Line
            key={i}
            points={[
              c.start,
              c.end,
            ]}
            color="#facc15"
            transparent
            opacity={0.08}
            lineWidth={0.5}
          />
        )
      )}
    </>
  )
}