import { useThree, useFrame } from '@react-three/fiber'
import { useNetworkStore } from '../../store/networkStore'
import * as THREE from 'three'

export default function CameraFocusRig() {
  const { camera } = useThree()

  const selectedProject =
    useNetworkStore(
      (s) => s.selectedProject
    )

  useFrame(() => {
    const targetPos = selectedProject
      ? new THREE.Vector3(
          5,
          2,
          8
        )
      : new THREE.Vector3(
          0,
          0,
          12
        )

    camera.position.lerp(
      targetPos,
      0.04
    )

    camera.lookAt(0, 0, 0)
  })

  return null
}