import { useState } from "react";
import {
  SendHorizontal,
  Mic,
  Paperclip,
  BrainCircuit,
} from "lucide-react";

export default function ChatInput({
  onSend,
  disabled = false,
}) {
  const [input, setInput] = useState("");

  //----------------------------------------------------
  // Send
  //----------------------------------------------------

  const send = () => {
    if (!input.trim() || disabled) return;

    onSend(input);

    setInput("");
  };

  //----------------------------------------------------
  // Keyboard
  //----------------------------------------------------

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  //----------------------------------------------------
  // UI
  //----------------------------------------------------

  return (
    <div className="border-t border-cyan-500/20 bg-[#07111d] p-4">

      <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/80 backdrop-blur-md">

        <textarea
          rows={2}
          value={input}
          disabled={disabled}
          placeholder="Ask Athena anything..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="
            w-full
            resize-none
            bg-transparent
            p-4
            text-white
            placeholder:text-gray-500
            outline-none
          "
        />

        <div className="flex items-center justify-between border-t border-cyan-500/10 px-3 py-2">

          <div className="flex items-center gap-2">

            <button
              className="rounded-lg p-2 text-gray-400 transition hover:bg-cyan-500/10 hover:text-cyan-400"
              title="Attach File (Coming Soon)"
            >
              <Paperclip size={18} />
            </button>

            <button
              className="rounded-lg p-2 text-gray-400 transition hover:bg-cyan-500/10 hover:text-cyan-400"
              title="Deep Analysis"
            >
              <BrainCircuit size={18} />
            </button>

            <button
              className="rounded-lg p-2 text-gray-400 transition hover:bg-cyan-500/10 hover:text-cyan-400"
              title="Voice Mode (Coming Soon)"
            >
              <Mic size={18} />
            </button>

          </div>

          <button
            onClick={send}
            disabled={disabled || !input.trim()}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-cyan-500
              px-4
              py-2
              font-medium
              text-slate-900
              transition
              hover:bg-cyan-400
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <SendHorizontal size={18} />
            Send
          </button>

        </div>

      </div>

    </div>
  );
}