import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const VoiceContext =
  createContext(null);

export function VoiceProvider({
  children,
}) {
  // =========================================================
  // VOICE
  // =========================================================

  const [isRecording, setIsRecording] =
    useState(false);

  const [isProcessing, setIsProcessing] =
    useState(false);

  const [transcript, setTranscript] =
    useState("");

  const [error, setError] =
    useState("");

  // =========================================================
  // ATHENA
  // =========================================================

  const [athenaAwake, setAthenaAwake] =
    useState(false);

  const [athenaBooting, setAthenaBooting] =
    useState(false);

  // =========================================================
  // RESPONSE
  // =========================================================

  const [response, setResponse] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  // =========================================================
  // AGENT
  // =========================================================

  const [activeAgent, setActiveAgent] =
    useState("chat");

  // =========================================================
  // CONTEXT VALUE
  // =========================================================

  const value = useMemo(
    () => ({
      // -----------------------------------------------
      // RECORDING
      // -----------------------------------------------

      isRecording,
      setIsRecording,

      // -----------------------------------------------
      // PROCESSING
      // -----------------------------------------------

      isProcessing,
      setIsProcessing,

      // -----------------------------------------------
      // TRANSCRIPT
      // -----------------------------------------------

      transcript,
      setTranscript,

      // -----------------------------------------------
      // RESPONSE
      // -----------------------------------------------

      response,
      setResponse,

      // -----------------------------------------------
      // MESSAGES
      // -----------------------------------------------

      messages,
      setMessages,

      // -----------------------------------------------
      // AGENT
      // -----------------------------------------------

      activeAgent,
      setActiveAgent,

      // -----------------------------------------------
      // ERROR
      // -----------------------------------------------

      error,
      setError,

      // -----------------------------------------------
      // ATHENA STATE
      // -----------------------------------------------

      athenaAwake,
      setAthenaAwake,

      athenaBooting,
      setAthenaBooting,
    }),
    [
      isRecording,
      isProcessing,
      transcript,
      response,
      messages,
      activeAgent,
      error,
      athenaAwake,
      athenaBooting,
    ]
  );

  return (
    <VoiceContext.Provider
      value={value}
    >
      {children}
    </VoiceContext.Provider>
  );
}

// ===========================================================
// HOOK
// ===========================================================

export function useVoice() {
  const context =
    useContext(VoiceContext);

  if (!context) {
    throw new Error(
      "useVoice must be used inside VoiceProvider"
    );
  }

  return context;
}