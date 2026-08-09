// Agents
import GitHubAgent from "../services/agents/GitHubAgent";
import ResumeAgent from "../services/agents/ResumeAgent";
import RecruiterAgent from "../services/agents/RecruiterAgent";

class CommandRouter {
  resolve(command) {
    const input = command.toLowerCase();

    // GitHub Commands
    if (
      input.includes("github") ||
      input.includes("repository") ||
      input.includes("repo") ||
      input.includes("commit")
    ) {
      return GitHubAgent;
    }

    // Resume Commands
    if (
      input.includes("resume") ||
      input.includes("cv") ||
      input.includes("ats")
    ) {
      return ResumeAgent;
    }

    // Hiring / Interview
    if (
      input.includes("job") ||
      input.includes("interview") ||
      input.includes("hire") ||
      input.includes("recruiter")
    ) {
      return RecruiterAgent;
    }

    // Default
    return RecruiterAgent;
  }
}

export default new CommandRouter();