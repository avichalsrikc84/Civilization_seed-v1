import FloatingLogo from "./FloatingLogo";
import ConversationWidget from "./ConversationWidget";
import AgentWidget from "./AgentWidget";
import CommandDock from "./CommandDock";
import StatusPills from "./StatusPills";

export default function AthenaWorkspace() {
  return (
    <div className="absolute inset-0 z-50 pointer-events-none">

      <FloatingLogo />

      {/* Left floating widget */}

      <div className="absolute left-8 top-36">

        <ConversationWidget />

      </div>

      {/* Right floating widget */}

      <div className="absolute right-8 top-40">

        <AgentWidget />

      </div>

      <CommandDock />

      <StatusPills />

    </div>
  );
}