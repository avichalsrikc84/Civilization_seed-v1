import { useFrame } from '@react-three/fiber'

export default function CameraRig() {
  useFrame((state) => {
    const t = state.clock.elapsedTime

    // ONLY subtle camera tilt
    state.camera.rotation.z =
      Math.sin(t * 0.05) * 0.003
  })

  return null
}