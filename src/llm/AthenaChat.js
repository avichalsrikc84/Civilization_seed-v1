import ContextBuilder from "./ContextBuilder";
import PromptBuilder from "./PromptBuilder";
import LLMService from "./LLMService";

import EventBus from "../events/EventBus";

class AthenaChat {
  async ask(userMessage) {
    EventBus.emit("chat.started", {
      message: userMessage,
    });

    try {
      //----------------------------------------------------
      // Build Context
      //----------------------------------------------------

      const context =
        ContextBuilder.build();

      //----------------------------------------------------
      // Build Prompt
      //----------------------------------------------------

      const prompt =
        PromptBuilder.build(
          context,
          userMessage
        );

      //----------------------------------------------------
      // Ask LLM
      //----------------------------------------------------

      const result =
        await LLMService.generate(
          prompt
        );

      if (!result.success) {
        throw new Error(result.error);
      }

      //----------------------------------------------------
      // Finished
      //----------------------------------------------------

      EventBus.emit(
        "chat.completed",
        {
          question: userMessage,
          answer: result.text,
        }
      );

      return result.text;
    } catch (error) {
      EventBus.emit(
        "chat.failed",
        error
      );

      console.error(error);

      return "Sorry, something went wrong.";
    }
  }
}

export default new AthenaChat();