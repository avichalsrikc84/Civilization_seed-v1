import { Canvas } from '@react-three/fiber'

import {
  OrbitControls,
  Stars,
} from '@react-three/drei'

import { Suspense } from 'react'

import MainScene from './scenes/MainScene'

import HUD from './components/ui/HUD'

import PostFX from './components/effects/PostFX'

import CivilizationTimeline
  from './components/ui/CivilizationTimeline'

export default function App() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-black">
      <HUD />

      <CivilizationTimeline />

      <Canvas
        dpr={[1, 1.5]}
        camera={{
          position: [0, 0, 12],
          fov: 35,
          near: 0.1,
          far: 2000,
        }}
      >
        <fog
          attach="fog"
          args={['#020617', 15, 80]}
        />

        {/* LIGHTING */}
        <ambientLight intensity={1.8} />

        <directionalLight
          position={[-6, 2, 2]}
          intensity={1.2}
          color="#60a5fa"
        />

        <hemisphereLight
          intensity={0.6}
          groundColor="#000000"
          color="#1e3a8a"
        />

        {/* ULTRA STARFIELD */}
        <Stars
          radius={300}
          depth={80}
          count={12000}
          factor={6}
          saturation={0}
          fade
          speed={0.3}
        />

        <Suspense fallback={null}>
          <MainScene />

          <PostFX />
        </Suspense>

<OrbitControls
  enablePan={false}
  enableZoom
  autoRotate={false}

  minDistance={7}
  maxDistance={18}

  // LIMIT VERTICAL ROTATION
  minPolarAngle={
    Math.PI / 2.15
  }

  maxPolarAngle={
    Math.PI / 1.95
  }

  // ALLOW FULL LEFT/RIGHT
  minAzimuthAngle={-Infinity}
  maxAzimuthAngle={Infinity}

  enableDamping
  dampingFactor={0.05}
/>
      </Canvas>
    </div>
  )
}