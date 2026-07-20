import EventBus from "../events/EventBus";
import ExecutionStore from "./ExecutionStore";

class ExecutionTracker {

  constructor() {
    this.unsubscribe = [];
  }

  initialize() {

    // ===========================
    // Request Started
    // ===========================

    this.unsubscribe.push(

      EventBus.on(
        "athena.request.started",
        ({ input }) => {

          ExecutionStore.start("Athena");

          ExecutionStore.addEvent(
            "Request Started",
            { input }
          );

        }
      )

    );

    // ===========================
    // Intent
    // ===========================

    this.unsubscribe.push(

      EventBus.on(
        "athena.intent.detected",
        (command) => {

          ExecutionStore.addEvent(
            "Intent Detected",
            command
          );

          ExecutionStore.setProgress(10);

        }
      )

    );

    // ===========================
    // Planner
    // ===========================

    this.unsubscribe.push(

      EventBus.on(
        "athena.plan.created",
        (plan) => {

          ExecutionStore.addEvent(
            "Execution Plan Created",
            plan
          );

          ExecutionStore.setProgress(20);

        }
      )

    );

    // ===========================
    // Runtime Started
    // ===========================

    this.unsubscribe.push(

      EventBus.on(
        "runtime.agent.started",
        ({ agent }) => {

          ExecutionStore.setCurrentAgent(agent);

          ExecutionStore.addEvent(
            `${agent} Agent Started`
          );

          ExecutionStore.setProgress(30);

        }
      )

    );

    // ===========================
    // Tool Started
    // ===========================

    this.unsubscribe.push(

      EventBus.on(
        "tool.started",
        ({ tool, step, totalSteps }) => {

          ExecutionStore.setCurrentTool(tool);

          ExecutionStore.addEvent(
            `${tool} Started`
          );

          if (step && totalSteps) {

            const progress =
              30 + Math.floor(
                (step / totalSteps) * 60
              );

            ExecutionStore.setProgress(
              progress
            );

          }

        }
      )

    );

    // ===========================
    // Tool Completed
    // ===========================

    this.unsubscribe.push(

      EventBus.on(
        "tool.completed",
        ({ tool }) => {

          ExecutionStore.addEvent(
            `${tool} Completed`
          );

        }
      )

    );

    // ===========================
    // Memory Updated
    // ===========================

    this.unsubscribe.push(

      EventBus.on(
        "memory.updated",
        ({ memory }) => {

          ExecutionStore.addEvent(
            `${memory} Memory Updated`
          );

          ExecutionStore.setProgress(95);

        }
      )

    );

    // ===========================
    // Runtime Completed
    // ===========================

    this.unsubscribe.push(

      EventBus.on(
        "runtime.agent.completed",
        ({ agent }) => {

          ExecutionStore.addEvent(
            `${agent} Agent Completed`
          );

        }
      )

    );

    // ===========================
    // Request Completed
    // ===========================

    this.unsubscribe.push(

      EventBus.on(
        "athena.request.completed",
        () => {

          ExecutionStore.addEvent(
            "Response Generated"
          );

          ExecutionStore.finish();

        }
      )

    );

    // ===========================
    // Error
    // ===========================

    this.unsubscribe.push(

      EventBus.on(
        "runtime.agent.failed",
        ({ error }) => {

          ExecutionStore.addError(error);

        }
      )

    );

  }

  destroy() {

    this.unsubscribe.forEach(fn => fn());

    this.unsubscribe = [];

  }

}

export default new ExecutionTracker();