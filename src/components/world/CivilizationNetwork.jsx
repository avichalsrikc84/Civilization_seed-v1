import { Line }
  from '@react-three/drei'

import {
  useMemo,
} from 'react'

import { useFrame }
  from '@react-three/fiber'

import { useRef }
  from 'react'

import { useCivilizationStore }
  from '../../store/civilizationStore'

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

export default function CivilizationNetwork() {
  const groupRef = useRef()

  const nodes =
    useCivilizationStore(
      (state) => state.nodes
    )

  const stage =
    useCivilizationStore(
      (state) => state.stage
    )

  // NETWORK ROTATION SYNC
  useFrame((state) => {
    if (!groupRef.current) return

    if (stage >= 6) {
      groupRef.current.rotation.y =
        Math.sin(
          state.clock.elapsedTime *
            0.08
        ) * 0.02
    }
  })

  const connections =
    useMemo(() => {
      const arr = []

      for (
        let i = 0;
        i < nodes.length;
        i++
      ) {
        for (
          let j = i + 1;
          j < nodes.length;
          j++
        ) {
          const a = nodes[i]
          const b = nodes[j]

          const dist =
            Math.sqrt(
              (a.lat - b.lat) **
                2 +
                (a.lon - b.lon) **
                  2
            )

          // DENSE GLOBAL NETWORK
          if (
            stage >= 6
              ? dist < 40
              : dist < 15
          ) {
            arr.push([
              latLonToPosition(
                a.lat,
                a.lon,
                2.31
              ),

              latLonToPosition(
                b.lat,
                b.lon,
                2.31
              ),
            ])
          }
        }
      }

      return arr
    }, [nodes, stage])

  return (
    <group ref={groupRef}>
      {connections.map(
        (points, i) => (
          <Line
            key={i}
            points={points}
            color={
              stage >= 6
                ? '#38bdf8'
                : '#fde047'
            }
            transparent
            opacity={
              stage >= 6
                ? 0.5
                : 0.12
            }
            lineWidth={
              stage >= 6
                ? 2
                : 0.4
            }
          />
        )
      )}
    </group>
  )
}