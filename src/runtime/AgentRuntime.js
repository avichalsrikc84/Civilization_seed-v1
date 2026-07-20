import AgentRegistry from "./AgentRegistry";
import EventBus from "../events/EventBus";

class AgentRuntime {
  async execute(plan) {
    const startedAt = performance.now();

    if (!plan?.success) {
      throw new Error("Invalid execution plan.");
    }

    const executor = AgentRegistry.get(plan.runtime);

    if (!executor) {
      throw new Error(
        `No registered agent found for "${plan.runtime}".`
      );
    }

    try {
      // ===================================
      // Emit planner-defined events
      // ===================================

      plan.events?.forEach((event) => {
        EventBus.emit(event, {
          runtime: plan.runtime,
        });
      });

      // ===================================
      // Agent Started
      // ===================================

      EventBus.emit("runtime.agent.started", {
        agent: plan.runtime,
      });

      // ===================================
      // Execute Agent
      // ===================================

      const data = await executor();

      // ===================================
      // Agent Finished
      // ===================================

      EventBus.emit("runtime.agent.completed", {
        agent: plan.runtime,
      });

      const executionTime =
        performance.now() - startedAt;

      return {
        success: true,

        runtime: plan.runtime,

        responseType: plan.responseType,

        executionTime,

        fromMemory: plan.useMemory,

        data,
      };
    } catch (error) {
      EventBus.emit("runtime.agent.failed", {
        agent: plan.runtime,
        error,
      });

      throw error;
    }
  }
}

export default new AgentRuntime();