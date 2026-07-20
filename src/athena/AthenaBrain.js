import { detectIntent } from "./IntentDetector";
import { createExecutionPlan } from "./Planner";

import AgentRuntime from "../runtime/AgentRuntime";

import {
  generateResponse,
} from "./ResponseGenerator";

import EventBus from "../events/EventBus";

class AthenaBrain {

  async process(input) {

    try {

      // ==========================================
      // User Request Started
      // ==========================================

      EventBus.emit(
        "athena.request.started",
        { input }
      );

      // ==========================================
      // Detect Intent
      // ==========================================

      const command =
        detectIntent(input);

      if (!command.success) {

        return {

          success: false,

          message:
            "Sorry, I couldn't understand that request."

        };

      }

      EventBus.emit(
        "athena.intent.detected",
        command
      );

      // ==========================================
      // Build Execution Plan
      // ==========================================

      const plan =
        createExecutionPlan(command);

      if (!plan.success) {

        return {

          success: false,

          message:
            plan.reason

        };

      }

      EventBus.emit(
        "athena.plan.created",
        plan
      );

      // ==========================================
      // Execute Runtime
      // ==========================================

      const runtimeResult =
        await AgentRuntime.execute(plan);

      // ==========================================
      // Generate Human Response
      // ==========================================

      const response =
        generateResponse(runtimeResult);

      EventBus.emit(
        "athena.request.completed",
        response
      );

      return {

        success: true,

        command,

        plan,

        runtime: runtimeResult,

        response,

      };

    }

    catch(error){

      EventBus.emit(
        "athena.request.failed",
        error
      );

      console.error(error);

      return {

        success:false,

        message:
          "Athena encountered an unexpected error."

      };

    }

  }

}

export default new AthenaBrain();