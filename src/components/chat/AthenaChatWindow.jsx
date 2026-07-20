import { useEffect, useRef, useState } from "react";

import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import SuggestedPrompts from "./SuggestedPrompts";

import AthenaBrain from "../../brain/AthenaBrain";
import EventBus from "../../core/EventBus";

export default function AthenaChatWindow() {
  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const scrollRef = useRef(null);

  //----------------------------------------------------
  // Auto Scroll
  //----------------------------------------------------

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  //----------------------------------------------------
  // EventBus
  //----------------------------------------------------

  useEffect(() => {
    const unsubscribe = EventBus.on("*", (event) => {
      if (!event) return;

      if (event.type === "agent.started") {
        addSystemMessage(`🚀 ${event.agent} started`);
      }

      if (event.type === "tool.started") {
        addSystemMessage(`⚙ ${event.tool}`);
      }

      if (event.type === "tool.completed") {
        addSystemMessage(`✅ ${event.tool}`);
      }

      if (event.type === "agent.completed") {
        addSystemMessage(`✔ ${event.agent} completed`);
      }

      if (event.type === "runtime.error") {
        addSystemMessage(`❌ ${event.message}`);
      }
    });

    return unsubscribe;
  }, []);

  //----------------------------------------------------
  // Helpers
  //----------------------------------------------------

  function addMessage(role, content) {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role,
        content,
      },
    ]);
  }

  function addSystemMessage(content) {
    addMessage("system", content);
  }

  //----------------------------------------------------
  // Send Message
  //----------------------------------------------------

  async function handleSend(text) {
    if (!text.trim()) return;

    addMessage("user", text);

    setLoading(true);

    try {
      const response = await AthenaBrain.process(text);

      addMessage("assistant", response);
    } catch (err) {
      addMessage(
        "error",
        err.message || "Something went wrong."
      );
    }

    setLoading(false);
  }

  //----------------------------------------------------
  // UI
  //----------------------------------------------------

  return (
    <div className="flex h-full w-full flex-col rounded-2xl border border-cyan-500/20 bg-[#08131f]/90 backdrop-blur-xl overflow-hidden">

      <ChatHeader />

      {messages.length === 0 ? (
        <SuggestedPrompts onSelect={handleSend} />
      ) : (
        <MessageList messages={messages} />
      )}

      {loading && <TypingIndicator />}

      <div ref={scrollRef} />

      <ChatInput
        onSend={handleSend}
        disabled={loading}
      />
    </div>
  );
}