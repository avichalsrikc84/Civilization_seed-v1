import GitHubMemory from "../memory/GitHubMemory";
import ResumeMemory from "../memory/ResumeMemory";
import RecruiterMemory from "../memory/RecruiterMemory";

class ContextBuilder {
  build() {
    return {
      github: GitHubMemory.read?.() ?? null,
      resume: ResumeMemory.read?.() ?? null,
      recruiter: RecruiterMemory.read?.() ?? null,
      timestamp: new Date().toISOString(),
    };
  }

  hasContext() {
    const ctx = this.build();

    return (
      ctx.github ||
      ctx.resume ||
      ctx.recruiter
    );
  }

  summary() {
    const ctx = this.build();

    return {
      githubLoaded: !!ctx.github,
      resumeLoaded: !!ctx.resume,
      recruiterLoaded: !!ctx.recruiter,
    };
  }
}

export default new ContextBuilder();