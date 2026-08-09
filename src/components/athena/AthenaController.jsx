import { useCallback, useEffect, useRef } from "react";

import { useRecorder } from "../../voice/hooks/useRecorder";
import { useVoice } from "../../voice/contexts/VoiceContext";

import { useSpeechStore } from "../../store/speechStore";

import AthenaEngine from "../../athena/AthenaEngine";
import SpeechService from "../../athena/SpeechService";

export default function AthenaController() {
  const {
    transcript,
    setTranscript,

    response,
    setResponse,

    setMessages,
    setIsProcessing,
    setActiveAgent,
    setError,

    athenaAwake,
    setAthenaAwake,

    athenaBooting,
    setAthenaBooting,

    isProcessing,
  } = useVoice();

  const {
    isRecording,
    startRecording,
  } = useRecorder();

  const isSpeaking = useSpeechStore(
    (state) => state.isSpeaking
  );

  const previousTranscript =
    useRef("");

  const processingRef =
    useRef(false);

  const listeningRef =
    useRef(false);

  // =========================================================
  // START LISTENING
  // =========================================================

  const startAthenaListening =
    useCallback(() => {
      if (isSpeaking) {
        return;
      }

      if (isRecording) {
        return;
      }

      if (isProcessing) {
        return;
      }

      if (listeningRef.current) {
        return;
      }

      listeningRef.current = true;

      console.log(
        "🎤 ATHENA LISTENING..."
      );

      startRecording();
    }, [
      isSpeaking,
      isRecording,
      isProcessing,
      startRecording,
    ]);

  // =========================================================
  // PROCESS COMMAND
  // =========================================================

  const processCommand =
    useCallback(
      async (command) => {
        const cleanCommand =
          command?.trim();

        if (!cleanCommand) {
          return;
        }

        if (processingRef.current) {
          return;
        }

        processingRef.current = true;

        listeningRef.current = false;

        try {
          console.log(
            "🧠 ATHENA COMMAND:",
            cleanCommand
          );

          /*
           * Immediately clear transcript.
           * This prevents the spoken command
           * from remaining visible anywhere.
           */

          setTranscript("");

          previousTranscript.current =
            "";

          /*
           * Clear previous response when
           * a new command begins.
           */

          setResponse("");

          setIsProcessing(true);

          // =================================================
          // USER MESSAGE
          // =================================================

          setMessages((prev) => [
            ...prev,
            {
              role: "user",
              content: cleanCommand,
            },
          ]);

          // =================================================
          // ATHENA ENGINE
          // =================================================

          const result =
            await AthenaEngine.ask(
              cleanCommand
            );

          console.log(
            "🤖 ATHENA RESULT:",
            result
          );

          const agent =
            result?.agent ||
            "chat";

          const answer =
            result?.response ||
            "I couldn't generate a response.";

          setActiveAgent(agent);

          // =================================================
          // RESPONSE
          // =================================================

          setResponse(answer);

          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: answer,
            },
          ]);

          // =================================================
          // SPEECH
          // =================================================

          console.log(
            "🔊 ATHENA SPEAKING..."
          );

          await SpeechService.speak(
            answer
          );

          console.log(
            "🔊 ATHENA FINISHED SPEAKING"
          );
        } catch (error) {
          console.error(
            "ATHENA COMMAND ERROR:",
            error
          );

          setError(
            "ATHENA failed to respond."
          );
        } finally {
          setIsProcessing(false);

          processingRef.current =
            false;

          /*
           * Give speech synthesis time
           * to completely release before
           * opening the microphone again.
           */

          setTimeout(() => {
            listeningRef.current =
              false;

            startAthenaListening();
          }, 700);
        }
      },
      [
        setTranscript,
        setResponse,
        setIsProcessing,
        setMessages,
        setActiveAgent,
        setError,
        startAthenaListening,
      ]
    );

  // =========================================================
  // ACTIVATE ATHENA
  // =========================================================

  const activateAthena =
    useCallback(
      async (initialCommand = "") => {
        if (
          athenaAwake ||
          athenaBooting
        ) {
          return;
        }

        try {
          console.log(
            "⚡ ATHENA WAKE DETECTED"
          );

          setAthenaBooting(true);

          setTranscript("");

          setResponse("");

          previousTranscript.current =
            "";

          // =================================================
          // BOOT RESPONSE
          // =================================================

          await SpeechService.speak(
            "Athena online."
          );

          setAthenaAwake(true);

          setAthenaBooting(false);

          console.log(
            "🟢 ATHENA ONLINE"
          );

          // =================================================
          // DIRECT COMMAND
          // =================================================

          if (
            initialCommand?.trim()
          ) {
            await processCommand(
              initialCommand
            );

            return;
          }

          // =================================================
          // LISTEN
          // =================================================

          setTimeout(() => {
            listeningRef.current =
              false;

            startAthenaListening();
          }, 500);
        } catch (error) {
          console.error(
            "ATHENA BOOT ERROR:",
            error
          );

          setAthenaBooting(false);

          setError(
            "ATHENA failed to initialize."
          );
        }
      },
      [
        athenaAwake,
        athenaBooting,

        setAthenaBooting,
        setAthenaAwake,

        setTranscript,
        setResponse,
        setError,

        processCommand,
        startAthenaListening,
      ]
    );

  // =========================================================
  // TRANSCRIPT HANDLER
  // =========================================================

  useEffect(() => {
    if (!transcript?.trim()) {
      return;
    }

    const normalized =
      transcript
        .toLowerCase()
        .trim();

    /*
     * Ignore duplicate transcript
     * updates from React/state changes.
     */

    if (
      normalized ===
      previousTranscript.current
    ) {
      return;
    }

    previousTranscript.current =
      normalized;

    // =======================================================
    // ATHENA NOT AWAKE
    // =======================================================

    if (
      !athenaAwake &&
      !athenaBooting
    ) {
      const wakeIndex =
        normalized.indexOf(
          "athena"
        );

      if (wakeIndex === -1) {
        /*
         * Ignore random microphone
         * speech before wake.
         */

        setTranscript("");

        previousTranscript.current =
          "";

        return;
      }

      /*
       * Extract everything after
       * the wake word.
       */

      const command =
        normalized
          .slice(
            wakeIndex +
              "athena".length
          )
          .replace(
            /^[,\s.!?]+/,
            ""
          )
          .trim();

      console.log(
        "⚡ WAKE WORD DETECTED"
      );

      console.log(
        "🧠 COMMAND AFTER WAKE:",
        command || "(none)"
      );

      /*
       * Clear wake-word transcript
       * immediately.
       */

      setTranscript("");

      activateAthena(command);

      return;
    }

    // =======================================================
    // ATHENA ALREADY AWAKE
    // =======================================================

    if (athenaAwake) {
      /*
       * Don't process while microphone
       * is still recording.
       */

      if (isRecording) {
        return;
      }

      /*
       * Don't process while LLM is working.
       */

      if (isProcessing) {
        return;
      }

      /*
       * Don't process while ATHENA
       * is talking.
       */

      if (isSpeaking) {
        return;
      }

      /*
       * Ignore empty transcript.
       */

      if (!normalized) {
        return;
      }

      processCommand(
        transcript
      );
    }
  }, [
    transcript,

    athenaAwake,
    athenaBooting,

    isRecording,
    isProcessing,
    isSpeaking,

    activateAthena,
    processCommand,

    setTranscript,
  ]);

  // =========================================================
  // CLEANUP
  // =========================================================

  useEffect(() => {
    return () => {
      processingRef.current =
        false;

      listeningRef.current =
        false;

      SpeechService.stop();
    };
  }, []);

  // =========================================================
  // INVISIBLE
  // =========================================================

  return null;
}