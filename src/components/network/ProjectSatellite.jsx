import * as THREE from "three";

import {
  useMemo,
  useRef,
  useState,
} from "react";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import { useNetworkStore } from "../../store/networkStore";
import { useSpeechStore } from "../../store/speechStore";

import AgentRuntime from "../../runtime/AgentRuntime";

export default function ProjectSatellite({
  project,
  radius,
  speed,
  angleOffset,
  orbitTilt = 0,
}) {
  //--------------------------------------------------
  // REFS
  //--------------------------------------------------

  const groupRef = useRef();

  const lightRef = useRef();

  const satelliteRef = useRef();

  //--------------------------------------------------
  // PERFORMANCE
  //--------------------------------------------------

  const desiredPosition = useRef(
    new THREE.Vector3()
  );

  const scaleTarget = useRef(
    new THREE.Vector3()
  );

  const rotationTarget = useRef(0);

  const pulse = useRef(0);

  const wobble = useRef(0);

  const speedVariation = useMemo(
    () => 0.96 + Math.random() * 0.08,
    []
  );

  //--------------------------------------------------
  // LOAD MODEL
  //--------------------------------------------------

  const { scene } = useGLTF(
    "/models/satellite.glb"
  );

  const satellite = useMemo(
    () => scene.clone(),
    [scene]
  );

  //--------------------------------------------------
  // LOCAL UI
  //--------------------------------------------------

  const [hovered, setHovered] =
    useState(false);

  //--------------------------------------------------
  // GLOBAL STORE
  //--------------------------------------------------

  const selectedProject =
    useNetworkStore(
      (s) => s.selectedProject
    );

  const setHoveredProject =
    useNetworkStore(
      (s) => s.setHoveredProject
    );

  const setSelectedProject =
    useNetworkStore(
      (s) => s.setSelectedProject
    );

  //--------------------------------------------------
  // SPEECH STORE
  //--------------------------------------------------

  const speaking = useSpeechStore(
    (s) => s.isSpeaking
  );

  const audioLevel =
    useSpeechStore(
      (s) => s.audioLevel
    );

  //--------------------------------------------------
  // STATES
  //--------------------------------------------------

  const isFocused =
    selectedProject?.id ===
    project.id;

  const isSpeaking =
    isFocused && speaking;

    
useFrame((state, delta) => {
  if (!groupRef.current) return

  //----------------------------------------------------
  // ORBIT
  //----------------------------------------------------

  const elapsed =
    state.clock.elapsedTime

  const t = isFocused
    ? angleOffset
    : elapsed *
        speed *
        speedVariation +
      angleOffset

  const x =
    Math.cos(t) * radius

  const z =
    Math.sin(t) * radius

  const y =
    Math.sin(t * 0.8) * 0.25

  desiredPosition.current.set(
    x,
    y,
    z
  )

  groupRef.current.position.lerp(
    desiredPosition.current,
    0.12
  )

  //----------------------------------------------------
  // LOOK AT HUB
  //----------------------------------------------------

  groupRef.current.lookAt(
    0,
    0,
    0
  )

  groupRef.current.rotation.x =
    orbitTilt

  //----------------------------------------------------
  // NATURAL WOBBLE
  //----------------------------------------------------

  groupRef.current.rotation.z =
    Math.sin(
      elapsed * 2 +
        angleOffset
    ) * 0.08

  groupRef.current.rotation.y +=
    delta * 0.4

  //----------------------------------------------------
  // SCALE
  //----------------------------------------------------

  let targetScale = 0.08

  if (hovered)
    targetScale = 0.095

  if (isFocused)
    targetScale = 0.125

  scaleTarget.current.set(
    targetScale,
    targetScale,
    targetScale
  )

  groupRef.current.scale.lerp(
    scaleTarget.current,
    0.08
  )

  //----------------------------------------------------
  // LIGHT PULSE
  //----------------------------------------------------

  if (lightRef.current) {
    lightRef.current.intensity =
      isFocused
        ? 5 +
          Math.sin(
            elapsed * 6
          ) *
            1.2
        : hovered
        ? 3 +
          Math.sin(
            elapsed * 5
          ) *
            0.5
        : 2
  }
})

  const handleClick = async () => {
  setSelectedProject(project)

  try {
    await runAgentRuntime(
      project.source
    )
  } catch (error) {
    console.error(error)
  }
}

return (
  <group ref={groupRef}>
    {/* ========================= */}
    {/* Invisible Click Collider */}
    {/* ========================= */}

    <mesh
      onPointerOver={() => {
        setHovered(true)
        setHoveredProject(project)
      }}
      onPointerOut={() => {
        setHovered(false)
        setHoveredProject(null)
      }}
      onClick={handleClick}
    >
      <sphereGeometry
        args={[0.45, 20, 20]}
      />

      <meshBasicMaterial
        transparent
        opacity={0}
        depthWrite={false}
      />
    </mesh>

    {/* ========================= */}
    {/* Satellite Model */}
    {/* ========================= */}

    <primitive
      object={satellite}
    />

    {/* ========================= */}
    {/* Engine Light */}
    {/* ========================= */}

    <pointLight
      ref={lightRef}
      color={project.color}
      intensity={2}
      distance={
        isFocused ? 7 : 4
      }
      decay={2}
    />

    {/* ========================= */}
    {/* Hover Indicator */}
    {/* ========================= */}

    {hovered && (
      <mesh
        position={[
          0,
          0.28,
          0,
        ]}
      >
        <sphereGeometry
          args={[
            0.05,
            12,
            12,
          ]}
        />

        <meshBasicMaterial
          color="#7dd3fc"
        />
      </mesh>
    )}
  </group>
)
}

useGLTF.preload(
  '/models/satellite.glb'
)