import {
  useCallback,
  useEffect,
  useRef,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Sparkles,
  Mic,
  ArrowUp,
} from "lucide-react";

import { useRecorder } from "../../voice/hooks/useRecorder";
import { useVoice } from "../../voice/contexts/VoiceContext";

import AthenaEngine from "../../athena/AthenaEngine";
import SpeechService from "../../athena/SpeechService";
import { typewriter } from "../../athena/Typewriter";

export default function CommandConsole() {
  // =========================================================
  // VOICE CONTEXT
  // =========================================================

  const {
    transcript,
    setTranscript,

    response,
    setResponse,

    messages,
    setMessages,

    isProcessing,
    setIsProcessing,

    activeAgent,
    setActiveAgent,

    setError,

    athenaAwake,
    setAthenaAwake,

    athenaBooting,
    setAthenaBooting,
  } = useVoice();

  // =========================================================
  // RECORDER
  // =========================================================

  const {
    isRecording,
    startRecording,
    stopRecording,
  } = useRecorder();

  // =========================================================
  // REFS
  // =========================================================

  /*
   * Prevent the same transcript from
   * triggering multiple times.
   */
  const previousTranscript =
    useRef("");

  /*
   * Prevent duplicate automatic
   * microphone starts.
   */
  const hasStartedListening =
    useRef(false);

  /*
   * Prevent duplicate command
   * submissions.
   */
  const isSubmitting =
    useRef(false);

  // =========================================================
  // ATHENA ACTIVATION
  // =========================================================

  const activateAthena =
    useCallback(async () => {
      /*
       * Don't boot twice.
       */

      if (
        athenaBooting ||
        athenaAwake
      ) {
        return;
      }

      try {
        console.log(
          "⚡ ATHENA BOOT SEQUENCE STARTED"
        );

        setAthenaBooting(true);

        /*
         * Clear wake-word transcript.
         */

        setTranscript("");

        previousTranscript.current =
          "";

        /*
         * Boot response.
         */

        const bootMessage =
          "Athena online. I'm listening.";

        setResponse("");

        /*
         * Speak boot response.
         */

        await SpeechService.speak(
          bootMessage
        );

        /*
         * ATHENA IS NOW ONLINE.
         */

        setAthenaAwake(true);

        setAthenaBooting(false);

        setResponse(
          bootMessage
        );

        console.log(
          "🟢 ATHENA ONLINE"
        );

        /*
         * Automatically open microphone.
         */

        setTimeout(() => {
          if (
            !hasStartedListening.current
          ) {
            hasStartedListening.current =
              true;

            console.log(
              "🎤 ATHENA AUTOMATIC LISTENING STARTED"
            );

            startRecording({
              auto: true,
            });
          }
        }, 500);
      } catch (error) {
        console.error(
          "ATHENA boot error:",
          error
        );

        setAthenaBooting(false);

        setError(
          "ATHENA failed to initialize."
        );
      }
    }, [
      athenaBooting,
      athenaAwake,

      setAthenaBooting,
      setTranscript,
      setResponse,
      setAthenaAwake,
      setError,

      startRecording,
    ]);

  // =========================================================
  // WAKE WORD DETECTION
  // =========================================================

  useEffect(() => {
    /*
     * Nothing to process.
     */

    if (!transcript?.trim()) {
      return;
    }

    const normalized =
      transcript
        .toLowerCase()
        .trim();

    /*
     * Same transcript?
     * Ignore it.
     */

    if (
      normalized ===
      previousTranscript.current
    ) {
      return;
    }

    previousTranscript.current =
      normalized;

    /*
     * ATHENA WAKE WORDS
     */

    const wakeWords = [
      "athena",
      "hey athena",
      "okay athena",
      "ok athena",
    ];

    const wakeDetected =
      wakeWords.some(
        (word) =>
          normalized.includes(word)
      );

    if (
      wakeDetected &&
      !athenaAwake &&
      !athenaBooting
    ) {
      activateAthena();
    }
  }, [
    transcript,
    athenaAwake,
    athenaBooting,
    activateAthena,
  ]);

  // =========================================================
  // MICROPHONE BUTTON
  // =========================================================

  const handleMic =
    useCallback(() => {
      if (isRecording) {
        console.log(
          "🛑 Manual recording stop"
        );

        stopRecording();

        hasStartedListening.current =
          false;

        return;
      }

      console.log(
        "🎤 Manual recording start"
      );

      startRecording({
        auto: athenaAwake,
      });
    }, [
      isRecording,
      stopRecording,
      startRecording,
      athenaAwake,
    ]);

  // =========================================================
  // ATHENA COMMAND
  // =========================================================

  const handleSubmit =
    useCallback(async () => {
      /*
       * Prevent duplicate submissions.
       */

      if (isSubmitting.current) {
        return;
      }

      /*
       * Empty transcript.
       */

      if (!transcript?.trim()) {
        return;
      }

      // =====================================================
      // WAKE ATHENA
      // =====================================================

      if (!athenaAwake) {
        const normalized =
          transcript
            .toLowerCase()
            .trim();

        if (
          normalized.includes(
            "athena"
          )
        ) {
          await activateAthena();
        }

        return;
      }

      try {
        isSubmitting.current =
          true;

        setIsProcessing(true);

        const userMessage =
          transcript.trim();

        console.log(
          "🧠 ATHENA COMMAND:",
          userMessage
        );

        // ===================================================
        // CLEAR TRANSCRIPT
        // ===================================================

        setTranscript("");

        previousTranscript.current =
          "";

        // ===================================================
        // USER MESSAGE
        // ===================================================

        setMessages((prev) => [
          ...prev,
          {
            role: "user",
            content: userMessage,
          },
        ]);

        // ===================================================
        // ATHENA ENGINE
        // ===================================================

        const result =
          await AthenaEngine.ask(
            userMessage
          );

        console.log(
          "🤖 ATHENA RESULT:",
          result
        );

        // ===================================================
        // AGENT
        // ===================================================

        setActiveAgent(
          result?.agent || "chat"
        );

        // ===================================================
        // RESPONSE
        // ===================================================

        setResponse("");

        const finalResponse =
          result?.response ||
          "I'm sorry, I couldn't generate a response.";

        await typewriter(
          finalResponse,
          (partial) => {
            setResponse(partial);
          },
          12
        );

        // ===================================================
        // SAVE ASSISTANT RESPONSE
        // ===================================================

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              finalResponse,
          },
        ]);

        // ===================================================
        // SPEAK
        // ===================================================

        console.log(
          "🔊 ATHENA SPEAKING..."
        );

        await SpeechService.speak(
          finalResponse
        );

        console.log(
          "🔊 ATHENA FINISHED SPEAKING"
        );
      } catch (error) {
        console.error(
          "ATHENA ERROR:",
          error
        );

        setError(
          "ATHENA failed to respond."
        );
      } finally {
        setIsProcessing(false);

        isSubmitting.current =
          false;

        // =================================================
        // PREPARE FOR NEXT COMMAND
        // =================================================

        if (athenaAwake) {
          setTimeout(() => {
            if (
              !hasStartedListening.current &&
              !isSubmitting.current
            ) {
              hasStartedListening.current =
                true;

              console.log(
                "🎤 ATHENA READY FOR NEXT COMMAND"
              );

              startRecording({
                auto: true,
              });
            }
          }, 700);
        }
      }
    }, [
      transcript,
      athenaAwake,
      activateAthena,

      setTranscript,
      setMessages,
      setIsProcessing,
      setActiveAgent,
      setResponse,
      setError,

      startRecording,
    ]);

  // =========================================================
  // AUTOMATIC TRANSCRIPT SUBMISSION
  // =========================================================

  useEffect(() => {
    /*
     * Only automatic mode after
     * ATHENA is awake.
     */

    if (!athenaAwake) {
      return;
    }

    /*
     * Don't submit while recording.
     */

    if (isRecording) {
      return;
    }

    /*
     * Don't submit while processing.
     */

    if (isProcessing) {
      return;
    }

    /*
     * Don't submit empty transcript.
     */

    if (!transcript?.trim()) {
      return;
    }

    /*
     * Small delay gives Whisper
     * time to finish updating state.
     */

    const timer =
      setTimeout(() => {
        handleSubmit();
      }, 250);

    return () => {
      clearTimeout(timer);
    };
  }, [
    transcript,
    athenaAwake,
    isRecording,
    isProcessing,
    handleSubmit,
  ]);

  // =========================================================
  // KEYBOARD
  // =========================================================

  const handleKeyDown =
    (event) => {
      if (
        event.key === "Enter"
      ) {
        handleSubmit();
      }
    };

  // =========================================================
  // PRE-WAKE UI
  // =========================================================

  if (
    !athenaAwake &&
    !athenaBooting
  ) {
    return (
      <div className="pointer-events-none text-center">
        <div className="text-xs tracking-[0.3em] text-slate-500">
          SAY{" "}
          <span className="text-cyan-400">
            "ATHENA"
          </span>{" "}
          TO AWAKEN
        </div>
      </div>
    );
  }

  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <div className="w-[900px] max-w-[90vw]">
      <AnimatePresence mode="wait">
        {/* =================================================
            BOOT SCREEN
        ================================================= */}

        {athenaBooting ? (
          <motion.div
            key="boot"
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 1.05,
            }}
            transition={{
              duration: 0.45,
            }}
            className="flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{
                scale: [
                  1,
                  1.15,
                  1,
                ],
                opacity: [
                  0.5,
                  1,
                  0.5,
                ],
              }}
              transition={{
                duration: 1.3,
                repeat: Infinity,
              }}
            >
              <Sparkles
                size={36}
                className="text-cyan-400"
              />
            </motion.div>

            <div className="mt-4 text-sm font-semibold tracking-[0.4em] text-cyan-300">
              ATHENA
            </div>

            <div className="mt-2 text-xs tracking-[0.2em] text-slate-500">
              NEURAL CORE ONLINE
            </div>
          </motion.div>
        ) : (
          /* =================================================
             ACTIVE CONSOLE
          ================================================= */

          <motion.div
            key="console"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
            }}
          >
            {/* =================================================
                INPUT BAR
            ================================================= */}

            <motion.div
              layout
              className="flex items-center gap-3 rounded-2xl border border-cyan-500/20 bg-black/50 px-5 py-4 shadow-2xl backdrop-blur-xl"
            >
              <Sparkles
                className="text-cyan-400"
                size={20}
              />

              <input
                type="text"
                value={transcript}
                onChange={(event) =>
                  setTranscript(
                    event.target.value
                  )
                }
                onKeyDown={
                  handleKeyDown
                }
                placeholder={
                  isRecording
                    ? "ATHENA is listening..."
                    : isProcessing
                    ? "ATHENA is thinking..."
                    : "Ask ATHENA anything..."
                }
                disabled={
                  isProcessing ||
                  isRecording
                }
                className="flex-1 bg-transparent text-white outline-none placeholder:text-slate-500"
              />

              {/* =================================================
                  MIC
              ================================================= */}

              <motion.button
                whileTap={{
                  scale: 0.9,
                }}
                animate={{
                  scale: isRecording
                    ? [
                        1,
                        1.15,
                        1,
                      ]
                    : 1,
                }}
                transition={{
                  duration: 1,
                  repeat: isRecording
                    ? Infinity
                    : 0,
                }}
                onClick={
                  handleMic
                }
                className={`rounded-full p-2 transition ${
                  isRecording
                    ? "bg-red-500 text-white"
                    : "bg-cyan-500 text-black"
                }`}
              >
                <Mic size={20} />
              </motion.button>

              {/* =================================================
                  SEND
              ================================================= */}

              <motion.button
                whileHover={{
                  scale: 1.08,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                onClick={
                  handleSubmit
                }
                disabled={
                  isProcessing ||
                  !transcript.trim()
                }
                className="rounded-full bg-cyan-400 p-2 text-black disabled:opacity-50"
              >
                <ArrowUp size={18} />
              </motion.button>
            </motion.div>

            {/* =================================================
                STATUS
            ================================================= */}

            <div className="mt-2 text-center text-xs text-slate-400">
              {isRecording
                ? "🎤 ATHENA LISTENING..."
                : isProcessing
                ? `🧠 ${
                    activeAgent?.toUpperCase() ||
                    "CHAT"
                  } AGENT WORKING...`
                : "● ATHENA ONLINE"}
            </div>

            {/* =================================================
                ACTIVE AGENT
            ================================================= */}

            {activeAgent !==
              "chat" && (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                className="mt-3 inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300"
              >
                {activeAgent.toUpperCase()}{" "}
                AGENT ACTIVE
              </motion.div>
            )}

            {/* =================================================
                RESPONSE
            ================================================= */}

            {response && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="mt-5 rounded-2xl border border-cyan-500/20 bg-black/40 p-5 backdrop-blur-xl"
              >
                <div className="mb-3 flex items-center gap-2 text-cyan-400">
                  <Sparkles
                    size={16}
                  />

                  <span className="text-xs font-semibold tracking-[0.25em]">
                    ATHENA
                  </span>
                </div>

                <p className="leading-7 text-cyan-50">
                  {response}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}