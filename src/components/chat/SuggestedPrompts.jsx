import {
  Github,
  FileText,
  Briefcase,
  Rocket,
  BrainCircuit,
  Sparkles,
} from "lucide-react";

const prompts = [
  {
    icon: Github,
    title: "Analyze my GitHub",
    prompt: "Analyze my GitHub profile and tell me my strengths.",
  },
  {
    icon: FileText,
    title: "Review my Resume",
    prompt: "Review my resume and suggest improvements.",
  },
  {
    icon: Briefcase,
    title: "Hiring Readiness",
    prompt: "Am I ready for a FAANG interview?",
  },
  {
    icon: Rocket,
    title: "Project Feedback",
    prompt: "Review my projects and rank them.",
  },
  {
    icon: BrainCircuit,
    title: "Career Roadmap",
    prompt: "Create a 90-day roadmap for me.",
  },
  {
    icon: Sparkles,
    title: "Compare Everything",
    prompt: "Compare my GitHub, resume and skills.",
  },
];

export default function SuggestedPrompts({ onSelect }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8">

      <div className="mb-10 text-center">

        <h1 className="text-3xl font-bold text-white">
          Welcome to ATHENA
        </h1>

        <p className="mt-3 text-gray-400 max-w-xl">
          Your AI Career Operating System.
          Analyze your GitHub, resume, projects,
          interview readiness and build your career
          with multiple AI agents.
        </p>

      </div>

      <div className="grid w-full max-w-5xl gap-4 md:grid-cols-2 lg:grid-cols-3">

        {prompts.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              onClick={() => onSelect(item.prompt)}
              className="
                group
                rounded-2xl
                border
                border-cyan-500/20
                bg-slate-900/70
                p-5
                text-left
                transition-all
                duration-300
                hover:border-cyan-400
                hover:shadow-[0_0_25px_rgba(34,211,238,0.2)]
                hover:-translate-y-1
              "
            >
              <Icon
                size={28}
                className="mb-4 text-cyan-400 transition-transform group-hover:scale-110"
              />

              <h3 className="font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                {item.prompt}
              </p>

            </button>
          );
        })}

      </div>
    </div>
  );
}