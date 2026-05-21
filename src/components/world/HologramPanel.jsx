import { Html } from '@react-three/drei'

export default function HologramPanel({
  position,
}) {
  return (
    <Html
      position={position}
      center
      distanceFactor={8}
    >
      <div
        className="
          w-64
          rounded-2xl
          border
          border-cyan-400/30
          bg-black/40
          backdrop-blur-xl
          p-4
          text-cyan-100
          shadow-2xl
          shadow-cyan-500/20
        "
      >
        <div className="text-xs tracking-[0.3em] opacity-60">
          CIVILIZATION ANALYSIS
        </div>

        <div className="mt-2 text-xl font-semibold">
          Earth Node
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <div>
            Consciousness Index:
            98.2%
          </div>

          <div>
            Orbital Expansion:
            ACTIVE
          </div>

          <div>
            Civilization Stage:
            INTERSTELLAR
          </div>

          <div>
            Neural Network Density:
            GLOBAL
          </div>
        </div>
      </div>
    </Html>
  )
}