import { motion } from 'framer-motion'

export default function HUD() {
  return (
    <div className="absolute top-0 left-0 z-20 w-full p-8 pointer-events-none">
      <motion.div
        initial={{
          opacity: 0,
          y: -40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1.5,
        }}
      >
        <h1 className="text-6xl font-black tracking-[0.4em] text-white">
          DIGITAL UNIVERSE
        </h1>

        <p className="mt-4 text-blue-300 text-lg tracking-[0.3em]">
          Watch your knowledge become a universe
        </p>
      </motion.div>
    </div>
  )
}