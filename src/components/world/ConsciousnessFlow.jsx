import { Sphere }
  from '@react-three/drei'

import { useFrame }
  from '@react-three/fiber'

import { useMemo, useRef }
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

export default function ConsciousnessFlow() {
  const nodes =
    useCivilizationStore(
      (state) => state.nodes
    )

  const stage =
    useCivilizationStore(
      (state) => state.stage
    )

  const refs = useRef([])

  const flows = useMemo(() => {
    if (nodes.length < 2) return []

    const arr = []

    for (
      let i = 0;
      i < nodes.length - 1;
      i += 3
    ) {
      const a = nodes[i]
      const b =
        nodes[
          (i + 1) %
            nodes.length
        ]

      arr.push({
        start:
          latLonToPosition(
            a.lat,
            a.lon,
            2.31
          ),

        end:
          latLonToPosition(
            b.lat,
            b.lon,
            2.31
          ),
      })
    }

    return arr
  }, [nodes])

  useFrame((state) => {
    refs.current.forEach(
      (mesh, i) => {
        if (!mesh) return

        const flow = flows[i]

        if (!flow) return

        const t =
          (state.clock
            .elapsedTime *
            0.15 +
            i * 0.1) %
          1

        mesh.position.lerpVectors(
          {
            x: flow.start[0],
            y: flow.start[1],
            z: flow.start[2],
          },

          {
            x: flow.end[0],
            y: flow.end[1],
            z: flow.end[2],
          },

          t
        )
      }
    )
  })

  // ONLY INTERSTELLAR
  if (stage < 6) return null

  return (
    <>
      {flows.map((_, i) => (
        <Sphere
          key={i}
          ref={(el) =>
            (refs.current[i] = el)
          }
          args={[0.012, 8, 8]}
        >
          <meshBasicMaterial
            color="#fde047"
          />
        </Sphere>
      ))}
    </>
  )
}