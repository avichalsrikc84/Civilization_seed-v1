import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function MessageList({ messages }) {
  const bottomRef = useRef(null);

  //----------------------------------------------------
  // Auto Scroll
  //----------------------------------------------------

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  //----------------------------------------------------
  // UI
  //----------------------------------------------------

  return (
    <div className="flex-1 overflow-y-auto px-2 py-4">

      <div className="flex flex-col gap-2">

        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
          />
        ))}

        <div ref={bottomRef} />

      </div>

    </div>
  );
}