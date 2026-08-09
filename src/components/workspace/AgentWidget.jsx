import { motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import AnimatedDot from "../ui/AnimatedDot";

const agents = [
  {
    name: "GitHub Scanner",
    status: "Running",
    progress: 82,
    color: "#22c55e",
  },
  {
    name: "Resume Intelligence",
    status: "Ready",
    progress: 100,
    color: "#38bdf8",
  },
  {
    name: "Portfolio Agent",
    status: "Waiting",
    progress: 25,
    color: "#f59e0b",
  },
];

export default function AgentWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="w-[310px]"
    >
      <GlassCard className="p-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-lg font-semibold">
              AI Agents
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              Active Workspace
            </p>

          </div>

          <AnimatedDot />

        </div>

        <div className="mt-6 space-y-4">

          {agents.map((agent) => (

            <motion.div
              key={agent.name}

              whileHover={{
                y: -2,
                scale: 1.02,
              }}

              className="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.04]
              p-4
              "
            >

              <div className="flex justify-between items-center">

                <h3 className="font-medium">
                  {agent.name}
                </h3>

                <span
                  className="text-xs text-slate-400"
                >
                  {agent.status}
                </span>

              </div>

              <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${agent.progress}%`,
                  }}
                  transition={{
                    duration: 1,
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                />

              </div>

            </motion.div>

          ))}

        </div>

      </GlassCard>
    </motion.div>
  );
}