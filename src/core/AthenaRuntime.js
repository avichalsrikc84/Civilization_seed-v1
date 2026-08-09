import EventBus from "./EventBus";
import CommandRouter from "./CommandRouter";

class AthenaRuntime {
  constructor() {
    this.isRunning = false;
    this.activeAgent = null;
    this.activeTool = null;
  }

  async execute(command) {
    try {
      this.isRunning = true;

      // Notify UI
      EventBus.emit("runtime:start");

      // Log User Message
      EventBus.emit("conversation:add", {
        role: "user",
        message: command,
      });

      // Find the correct agent
      const agent = CommandRouter.resolve(command);

      this.activeAgent = agent.name;

      EventBus.emit("agent:start", {
        agent: agent.name,
      });

      // Execute Agent
      const response = await agent.execute(command);

      EventBus.emit("conversation:add", {
        role: "assistant",
        message: response,
      });

      EventBus.emit("runtime:complete");

      return response;
    } catch (error) {
      EventBus.emit("runtime:error", error);

      EventBus.emit("conversation:add", {
        role: "error",
        message: error.message,
      });
    } finally {
      this.isRunning = false;
      this.activeAgent = null;
      this.activeTool = null;
    }
  }
}

export default new AthenaRuntime();