import {
  hasGitHubMemory,
} from "../memory/GitHubMemory";

import {
  hasResumeMemory,
} from "../memory/ResumeMemory";

import {
  hasRecruiterMemory,
} from "../memory/RecruiterMemory";

export function createExecutionPlan(command) {
  if (!command.success) {
    return {
      success: false,
      reason: "Unknown command.",
    };
  }

  switch (command.intent) {

    // ==========================
    // GitHub
    // ==========================

    case "github.analyze":
      return {
        success: true,

        runtime: "github",

        useMemory: hasGitHubMemory(),

        events: [
          "agent.github.start",
          "hud.open",
          "satellite.github.focus",
        ],

        responseType: "github.analysis",
      };

    case "github.repositories":
      return {
        success: true,

        runtime: "github",

        useMemory: hasGitHubMemory(),

        events: [
          "agent.github.start",
          "hud.open",
          "satellite.github.focus",
        ],

        responseType: "github.repositories",
      };

    // ==========================
    // Resume
    // ==========================

    case "resume.analyze":
      return {
        success: true,

        runtime: "resume",

        useMemory: hasResumeMemory(),

        events: [
          "agent.resume.start",
          "hud.open",
          "satellite.resume.focus",
        ],

        responseType: "resume.analysis",
      };

    // ==========================
    // Recruiter
    // ==========================

    case "recruiter.evaluate":
      return {
        success: true,

        runtime: "recruiter",

        useMemory: hasRecruiterMemory(),

        events: [
          "agent.recruiter.start",
          "hud.open",
          "satellite.recruiter.focus",
        ],

        responseType: "recruiter.analysis",
      };

    case "portfolio.bestProject":
      return {
        success: true,

        runtime: "recruiter",

        useMemory: hasRecruiterMemory(),

        events: [
          "agent.recruiter.start",
          "hud.open",
          "satellite.recruiter.focus",
        ],

        responseType: "portfolio.bestProject",
      };

    default:
      return {
        success: false,
        reason: "Planner does not support this intent.",
      };
  }
}