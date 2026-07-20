import {
  User,
  BrainCircuit,
  Wrench,
  Cpu,
  TriangleAlert,
} from "lucide-react";

const variants = {
  user: {
    icon: User,
    align: "justify-end",
    bubble:
      "bg-cyan-500 text-white border border-cyan-400/40",
  },

  assistant: {
    icon: BrainCircuit,
    align: "justify-start",
    bubble:
      "bg-slate-800 text-slate-100 border border-cyan-500/20",
  },

  system: {
    icon: Cpu,
    align: "justify-center",
    bubble:
      "bg-slate-900 text-cyan-300 border border-cyan-500/20",
  },

  tool: {
    icon: Wrench,
    align: "justify-start",
    bubble:
      "bg-amber-500/10 text-amber-300 border border-amber-500/30",
  },

  agent: {
    icon: BrainCircuit,
    align: "justify-start",
    bubble:
      "bg-purple-500/10 text-purple-300 border border-purple-500/30",
  },

  error: {
    icon: TriangleAlert,
    align: "justify-start",
    bubble:
      "bg-red-500/10 text-red-300 border border-red-500/30",
  },
};

export default function MessageBubble({ message }) {
  const variant =
    variants[message.role] || variants.assistant;

  const Icon = variant.icon;

  return (
    <div className={`flex ${variant.align} w-full px-4 py-2`}>

      <div
        className={`flex max-w-[80%] items-start gap-3 rounded-2xl px-4 py-3 shadow-lg ${variant.bubble}`}
      >

        <Icon
          size={18}
          className="mt-1 flex-shrink-0"
        />

        <div className="flex flex-col">

          <p className="whitespace-pre-wrap break-words leading-relaxed">

            {message.content}

          </p>

          <span className="mt-2 text-[10px] opacity-50">

            {message.timestamp
              ? new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}

          </span>

        </div>

      </div>

    </div>
  );
}