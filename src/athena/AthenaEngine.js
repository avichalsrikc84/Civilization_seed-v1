import { chat } from "./ChatService";
import { determineAgent } from "./AgentRouter";

import { useDigitalDNAStore } from "../store/digitalDNAStore";
import { useNetworkStore } from "../store/networkStore";

class AthenaEngine {
  async ask(message) {
    const agent = determineAgent(message);

    let prompt = message;

    switch (agent) {
      case "github":
        prompt = `[GitHub Agent]\n${message}`;
        break;

      case "resume":
        prompt = `[Resume Agent]\n${message}`;
        break;

      case "portfolio":
        prompt = `[Portfolio Agent]\n${message}`;
        break;

      default:
        prompt = message;
    }

    // ==========================
    // Highlight matching satellite
    // ==========================

    const agents =
      useDigitalDNAStore.getState().agents;

    const project = agents.find(
      (a) => a.id === agent
    );

    if (project) {
      useNetworkStore
        .getState()
        .setSelectedProject(project);
    }

    try {
      const response = await chat(prompt);

      return {
        agent,
        project,
        response,
      };
    } finally {
      // Let the animation stay briefly
      setTimeout(() => {
        useNetworkStore
          .getState()
          .clearSelection();
      }, 1500);
    }
  }
}

export default new AthenaEngine();