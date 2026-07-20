import { BrainCircuit, LoaderCircle } from "lucide-react";

export default function TypingIndicator({
  status = "Thinking...",
  agent = "Athena",
  tool = "",
}) {
  return (
    <div className="px-5 py-3">

      <div className="
        flex
        items-start
        gap-4
        rounded-2xl
        border
        border-cyan-500/20
        bg-slate-900/70
        p-4
        backdrop-blur-md
      ">

        <div className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          bg-cyan-500/10
        ">

          <BrainCircuit
            className="text-cyan-400"
            size={20}
          />

        </div>

        <div className="flex-1">

          <div className="flex items-center gap-2">

            <LoaderCircle
              size={16}
              className="animate-spin text-cyan-400"
            />

            <span className="font-medium text-cyan-300">

              {status}

            </span>

          </div>

          <p className="mt-1 text-sm text-gray-400">

            {agent}

            {tool && ` • ${tool}`}

          </p>

          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-700">

            <div className="
              h-full
              w-1/2
              animate-pulse
              rounded-full
              bg-cyan-400
            " />

          </div>

        </div>

      </div>

    </div>
  );
}