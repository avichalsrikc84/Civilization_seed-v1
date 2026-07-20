import { BrainCircuit } from "lucide-react";

export default function ChatHeader({
  status = "ONLINE",
  subtitle = "AI Career Operating System",
}) {
  const statusColor = {
    ONLINE: "bg-emerald-400",
    THINKING: "bg-yellow-400",
    RUNNING: "bg-cyan-400",
    ERROR: "bg-red-500",
  };

  return (
    <header className="flex items-center justify-between border-b border-cyan-500/20 px-5 py-4">

      <div className="flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30">

          <BrainCircuit
            className="text-cyan-400"
            size={22}
          />

        </div>

        <div>

          <h2 className="text-white text-lg font-semibold tracking-wide">
            ATHENA
          </h2>

          <p className="text-sm text-gray-400">
            {subtitle}
          </p>

        </div>

      </div>

      <div className="flex items-center gap-2">

        <span
          className={`h-2.5 w-2.5 rounded-full animate-pulse ${
            statusColor[status]
          }`}
        />

        <span className="text-xs tracking-widest text-gray-300">

          {status}

        </span>

      </div>

    </header>
  );
}