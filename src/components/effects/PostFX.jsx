import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from '@react-three/postprocessing'

export default function PostFX() {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.9}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
      />

      <Noise opacity={0.01} />

      <Vignette
        eskil={false}
        offset={0.1}
        darkness={0.9}
      />
    </EffectComposer>
  )
}