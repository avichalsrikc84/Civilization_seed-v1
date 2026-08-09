import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";

import {
  OrbitControls,
  Stars,
} from "@react-three/drei";

import { Suspense } from "react";

import MainScene from "./scenes/MainScene";

import HUD from "./components/ui/HUD";
import DigitalDNAHUD from "./components/ui/DigitalDNAHUD";
import CivilizationTimeline from "./components/ui/CivilizationTimeline";

import PostFX from "./components/effects/PostFX";

import SatelliteHUD from "./components/network/SatelliteHUD";

import AthenaController from "./components/athena/AthenaController";

import { useNetworkStore } from "./store/networkStore";

import { useVoice } from "./voice/contexts/VoiceContext";

// =========================================================
// NETWORK HUD
// =========================================================

function NetworkHUDWrapper() {
  const project = useNetworkStore(
    (s) => s.selectedProject
  );

  return (
    <SatelliteHUD project={project} />
  );
}

// =========================================================
// MAIN APP
// =========================================================

export default function App() {
  // =======================================================
  // ATHENA STATE
  // =======================================================

  const {
    athenaAwake,
    athenaBooting,
  } = useVoice();

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">

      {/* =====================================================
          MAIN HUD
      ===================================================== */}

      <HUD />

      <DigitalDNAHUD />

      {/* =====================================================
          ATHENA CONTROLLER

          Invisible logic layer responsible for:

          Wake word
          ↓
          Recording
          ↓
          Whisper
          ↓
          AthenaEngine
          ↓
          SpeechService
      ===================================================== */}

      <AthenaController />

      {/* =====================================================
          CIVILIZATION PHASE BAR
          +
          ATHENA WAKE PROMPT
      ===================================================== */}

      <div
        className="
          absolute
          bottom-8
          left-1/2
          z-50
          flex
          -translate-x-1/2
          flex-col
          items-center
          gap-3
        "
      >

        {/* ===================================================
            PHASE BAR
        =================================================== */}

        <CivilizationTimeline />

        {/* ===================================================
            ATHENA WAKE PROMPT
        =================================================== */}

        {!athenaAwake &&
          !athenaBooting && (
            <motion.div
              initial={{
                opacity: 0,
                y: 6,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
              }}
              className="
                pointer-events-none
                flex
                items-center
                gap-2
                font-mono
                text-[9px]
                uppercase
                tracking-[0.3em]
                text-cyan-400/60
              "
            >

              {/* ---------------------------------------------
                  STATUS DOT
              --------------------------------------------- */}

              <motion.span
                animate={{
                  opacity: [
                    0.3,
                    1,
                    0.3,
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  h-1
                  w-1
                  rounded-full
                  bg-cyan-300
                  shadow-[0_0_8px_rgba(34,211,238,0.8)]
                "
              />

              {/* ---------------------------------------------
                  SAY
              --------------------------------------------- */}

              <span>
                SAY
              </span>

              {/* ---------------------------------------------
                  ATHENA
              --------------------------------------------- */}

              <motion.span
                animate={{
                  opacity: [
                    0.65,
                    1,
                    0.65,
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  text-cyan-300
                "
              >
                "ATHENA"
              </motion.span>

              {/* ---------------------------------------------
                  TO WAKE
              --------------------------------------------- */}

              <span>
                TO WAKE
              </span>

            </motion.div>
          )}

      </div>

      {/* =====================================================
          SATELLITE HUD
      ===================================================== */}

      <NetworkHUDWrapper />

      {/* =====================================================
          3D SCENE
      ===================================================== */}

      <Canvas
        dpr={[1, 1.5]}
        camera={{
          position: [0, 0, 12],
          fov: 35,
          near: 0.1,
          far: 2000,
        }}
        onPointerMissed={() => {
          useNetworkStore
            .getState()
            .clearSelection();
        }}
      >

        {/* ===================================================
            FOG
        =================================================== */}

        <fog
          attach="fog"
          args={[
            "#020617",
            15,
            80,
          ]}
        />

        {/* ===================================================
            LIGHTING
        =================================================== */}

        <ambientLight
          intensity={1.8}
        />

        <directionalLight
          position={[
            -6,
            2,
            2,
          ]}
          intensity={1.2}
          color="#60a5fa"
        />

        <hemisphereLight
          intensity={0.6}
          groundColor="#000000"
          color="#1e3a8a"
        />

        {/* ===================================================
            STARFIELD
        =================================================== */}

        <Stars
          radius={300}
          depth={80}
          count={12000}
          factor={6}
          saturation={0}
          fade
          speed={0.3}
        />

        {/* ===================================================
            MAIN WORLD
        =================================================== */}

        <Suspense fallback={null}>
          <MainScene />

          <PostFX />
        </Suspense>

        {/* ===================================================
            CAMERA CONTROLS
        =================================================== */}

        <OrbitControls
          enablePan={false}
          enableZoom
          enableDamping
          dampingFactor={0.05}
          minDistance={7}
          maxDistance={19}
          minPolarAngle={
            Math.PI / 2.15
          }
          maxPolarAngle={
            Math.PI / 1.95
          }
        />

      </Canvas>

    </div>
  );
}