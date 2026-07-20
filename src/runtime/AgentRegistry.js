import { runGitHubAgent } from "../agents/github/GitHubAgent";
import { runResumeAgent } from "../agents/resume/ResumeAgent";
import { runRecruiterAgent } from "../agents/recruiter/RecruiterAgent";

class AgentRegistry {

  constructor() {
    this.agents = new Map();
  }

  register(name, executor) {
    this.agents.set(name, executor);
  }

  get(name) {
    return this.agents.get(name);
  }

  has(name) {
    return this.agents.has(name);
  }

  getRegisteredAgents() {
    return [...this.agents.keys()];
  }

}

const registry = new AgentRegistry();

registry.register("github", runGitHubAgent);

registry.register("resume", runResumeAgent);

registry.register("recruiter", runRecruiterAgent);

export default registry;