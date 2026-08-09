import { motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";

const messages = [
  {
    title: "Welcome back",
    text: "Your GitHub Galaxy is online and ready.",
  },
  {
    title: "Suggestion",
    text: "Try asking Athena to analyze your repositories.",
  },
];

export default function ConversationWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="w-[310px]"
    >
      <GlassCard className="p-6">

        {/* Header */}

        <div className="flex items-center gap-4">

          <div
            className="
            w-12
            h-12

            rounded-2xl

            bg-cyan-500/10

            border

            border-cyan-400/20

            flex

            items-center

            justify-center

            text-cyan-300

            text-lg
            "
          >
            ✦
          </div>

          <div>

            <h2 className="font-semibold text-lg">
              Athena
            </h2>

            <p className="text-sm text-slate-400">
              Personal AI Assistant
            </p>

          </div>

        </div>

        {/* Divider */}

        <div className="my-5 h-px bg-white/10" />

        {/* Messages */}

        <div className="space-y-4">

          {messages.map((item, index) => (

            <motion.div
              key={index}

              whileHover={{
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

              <h3 className="font-medium">
                {item.title}
              </h3>

              <p
                className="
                mt-2

                text-sm

                leading-6

                text-slate-400
                "
              >
                {item.text}
              </p>

            </motion.div>

          ))}

        </div>

        {/* Footer */}

        <div className="mt-6 flex gap-2 flex-wrap">

          <Suggestion>
            Analyze GitHub
          </Suggestion>

          <Suggestion>
            Resume Review
          </Suggestion>

          <Suggestion>
            Portfolio
          </Suggestion>

        </div>

      </GlassCard>
    </motion.div>
  );
}

function Suggestion({ children }) {
  return (
    <motion.button
      whileHover={{
        scale: 1.05,
      }}

      whileTap={{
        scale: 0.95,
      }}

      className="
      rounded-full

      border

      border-cyan-400/20

      bg-cyan-500/10

      px-4

      py-2

      text-xs

      text-cyan-300
      "
    >
      {children}
    </motion.button>
  );
}