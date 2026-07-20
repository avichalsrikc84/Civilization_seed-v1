import React from "react";
import useExecution from "../../execution/useExecution";

const SIZE = 180;
const STROKE = 10;

export default function ProgressRing() {
  const {
    progress,
    running,
    currentAgent,
    currentTool,
  } = useExecution();

  const radius = (SIZE - STROKE) / 2;

  const circumference =
    2 * Math.PI * radius;

  const dashOffset =
    circumference -
    (progress / 100) * circumference;

  return (
    <div
      className="absolute top-6 left-6
                 flex flex-col items-center"
    >
      <svg
        width={SIZE}
        height={SIZE}
        className="-rotate-90"
      >
        {/* Background */}

        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={STROKE}
          fill="none"
        />

        {/* Progress */}

        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={radius}
          stroke="#00ffff"
          strokeWidth={STROKE}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{
            transition:
              "stroke-dashoffset .35s ease",
            filter:
              "drop-shadow(0 0 10px cyan)",
          }}
        />
      </svg>

      {/* Center */}

      <div
        className="absolute inset-0
                   flex flex-col
                   items-center
                   justify-center"
      >
        <h1 className="text-4xl font-bold text-cyan-300">

          {progress}%

        </h1>

        <p className="text-xs text-cyan-400 uppercase tracking-widest">

          ATHENA

        </p>

        <div className="mt-2 text-sm text-white">

          {running
            ? currentAgent
            : "Idle"}

        </div>

        <div className="text-xs text-gray-400 mt-1">

          {running
            ? currentTool
            : "Waiting..."}

        </div>

      </div>
    </div>
  );
}