import { useMemo, useRef } from "react";
import { Html, Ring } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { useVoice } from "../../voice/contexts/VoiceContext";
import { useSpeechStore } from "../../store/speechStore";

export default function AthenaPresence() {
  const {
    athenaAwake,
    athenaBooting,
    isRecording,
    isProcessing,
  } = useVoice();

  const isSpeaking = useSpeechStore(
    (state) => state.isSpeaking
  );

  const audioLevel = useSpeechStore(
    (state) => state.audioLevel
  );

  const coreRef = useRef();
  const glowRef = useRef();
  const ringRef = useRef();

  const scaleTarget = useMemo(
    () => new THREE.Vector3(1, 1, 1),
    []
  );

  // =========================================================
  // STATE
  // =========================================================

  let state = "IDLE";

  if (athenaBooting) {
    state = "BOOTING";
  } else if (isSpeaking) {
    state = "SPEAKING";
  } else if (isProcessing) {
    state = "THINKING";
  } else if (isRecording) {
    state = "LISTENING";
  } else if (athenaAwake) {
    state = "ONLINE";
  }

  // =========================================================
  // ANIMATION SETTINGS
  // =========================================================

  let pulseSpeed = 2;
  let pulseAmount = 0.03;
  let ringSpeed = 0.4;
  let glowOpacity = 0.1;

  if (state === "BOOTING") {
    pulseSpeed = 7;
    pulseAmount = 0.22;
    ringSpeed = 3;
    glowOpacity = 0.35;
  }

  if (state === "LISTENING") {
    pulseSpeed = 5;
    pulseAmount = 0.08;
    ringSpeed = 0.8;
    glowOpacity = 0.16;
  }

  if (state === "THINKING") {
    pulseSpeed = 8;
    pulseAmount = 0.12;
    ringSpeed = 1.8;
    glowOpacity = 0.22;
  }

  if (state === "SPEAKING") {
    pulseSpeed = 10;
    pulseAmount =
      0.12 + audioLevel * 0.12;

    ringSpeed = 2.5;

    glowOpacity =
      0.18 + audioLevel * 0.2;
  }

  if (state === "ONLINE") {
    pulseSpeed = 2;
    pulseAmount = 0.035;
    ringSpeed = 0.4;
    glowOpacity = 0.1;
  }

  // =========================================================
  // ANIMATION
  // =========================================================

  useFrame((_, delta) => {
    if (!coreRef.current) {
      return;
    }

    const elapsed =
      performance.now() / 1000;

    // =======================================================
    // CORE PULSE
    // =======================================================

    const pulse =
      1 +
      Math.sin(
        elapsed * pulseSpeed
      ) *
        pulseAmount;

    scaleTarget.set(
      pulse,
      pulse,
      pulse
    );

    coreRef.current.scale.lerp(
      scaleTarget,
      Math.min(delta * 8, 1)
    );

    // =======================================================
    // CORE ROTATION
    // =======================================================

    coreRef.current.rotation.y +=
      delta * 0.4;

    // =======================================================
    // GLOW
    // =======================================================

    if (glowRef.current) {
      const glowPulse =
        1 +
        Math.sin(
          elapsed * pulseSpeed
        ) *
          0.15;

      glowRef.current.scale.set(
        glowPulse,
        glowPulse,
        glowPulse
      );

      glowRef.current.material.opacity =
        glowOpacity;
    }

    // =======================================================
    // RING
    // =======================================================

    if (ringRef.current) {
      ringRef.current.rotation.z +=
        delta * ringSpeed;

      /*
       * During boot the ring also
       * slightly expands/contracts.
       */

      if (state === "BOOTING") {
        const bootScale =
          1 +
          Math.sin(
            elapsed * 5
          ) *
            0.15;

        ringRef.current.scale.set(
          bootScale,
          bootScale,
          bootScale
        );
      } else {
        ringRef.current.scale.lerp(
          scaleTarget.set(
            1,
            1,
            1
          ),
          Math.min(delta * 5, 1)
        );
      }
    }
  });

  // =========================================================
  // HIDDEN BEFORE ATHENA WAKES
  // =========================================================

  if (
    !athenaAwake &&
    !athenaBooting
  ) {
    return null;
  }

  return (
    <group
      position={[
        0,
        -0.2,
        2.75,
      ]}
    >
      {/* =====================================================
          CORE
      ===================================================== */}

      <mesh ref={coreRef}>
        <sphereGeometry
          args={[
            state === "BOOTING"
              ? 0.14
              : 0.11,
            32,
            32,
          ]}
        />

        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* =====================================================
          OUTER GLOW
      ===================================================== */}

      <mesh ref={glowRef}>
        <sphereGeometry
          args={[
            state === "BOOTING"
              ? 0.34
              : 0.24,
            32,
            32,
          ]}
        />

        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={glowOpacity}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </mesh>

      {/* =====================================================
          ORBIT RING
      ===================================================== */}

      <group ref={ringRef}>
        <Ring
          args={[
            state === "BOOTING"
              ? 0.38
              : 0.3,

            state === "BOOTING"
              ? 0.41
              : 0.32,

            64,
          ]}
          rotation={[
            Math.PI / 2,
            0,
            0,
          ]}
        >
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={
              state === "BOOTING"
                ? 1
                : state === "SPEAKING"
                ? 0.95
                : state === "THINKING"
                ? 0.7
                : 0.5
            }
            side={THREE.DoubleSide}
          />
        </Ring>
      </group>

      {/* =====================================================
          STATUS
      ===================================================== */}

      <Html
        center
        distanceFactor={8}
        position={[
          0,
          -0.58,
          0,
        ]}
      >
        <div className="pointer-events-none whitespace-nowrap text-center font-mono">

          <div
            className="
              text-[9px]
              tracking-[0.35em]
              text-cyan-300
            "
          >
            ATHENA
          </div>

          <div
            className="
              mt-1
              text-[7px]
              tracking-[0.25em]
              text-slate-500
            "
          >
            {state}
          </div>

        </div>
      </Html>
    </group>
  );
}