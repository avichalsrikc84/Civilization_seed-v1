import { useSpeechStore } from "../store/speechStore";

class AthenaSpeechService {
  constructor() {
    this.synth =
      typeof window !== "undefined"
        ? window.speechSynthesis
        : null;

    this.voice = null;
  }

  // =========================================================
  // INITIALIZE
  // =========================================================

  init() {
    if (!this.synth) {
      console.warn(
        "Speech synthesis is not supported."
      );

      return;
    }

    this.loadVoice();

    /*
     * Chrome may load voices asynchronously.
     */

    this.synth.onvoiceschanged = () => {
      this.loadVoice();
    };
  }

  // =========================================================
  // LOAD BEST AVAILABLE VOICE
  // =========================================================

  loadVoice() {
    if (!this.synth) {
      return;
    }

    const voices =
      this.synth.getVoices();

    if (!voices.length) {
      return;
    }

    const preferredNames = [
      "Google UK English Female",
      "Google US English",
      "Microsoft Aria",
      "Microsoft Jenny",
      "Samantha",
      "Karen",
      "Daniel",
    ];

    /*
     * Look for a preferred voice.
     */

    for (
      const preferred of preferredNames
    ) {
      const found = voices.find(
        (voice) =>
          voice.name
            .toLowerCase()
            .includes(
              preferred.toLowerCase()
            )
      );

      if (found) {
        this.voice = found;

        console.log(
          "🎙️ ATHENA voice:",
          found.name
        );

        return;
      }
    }

    /*
     * Fallback to any English voice.
     */

    this.voice =
      voices.find((voice) =>
        voice.lang
          ?.toLowerCase()
          .startsWith("en")
      ) || voices[0];

    console.log(
      "🎙️ ATHENA fallback voice:",
      this.voice?.name
    );
  }

  // =========================================================
  // SPEAK
  // =========================================================

  speak(text) {
    return new Promise(
      (resolve, reject) => {
        if (!this.synth) {
          reject(
            new Error(
              "Speech synthesis is not supported."
            )
          );

          return;
        }

        if (
          !text ||
          !text.trim()
        ) {
          resolve();
          return;
        }

        /*
         * Stop previous speech.
         */

        this.synth.cancel();

        /*
         * Make sure voice is loaded.
         */

        this.loadVoice();

        const utterance =
          new SpeechSynthesisUtterance(
            text
          );

        // =====================================================
        // VOICE
        // =====================================================

        if (this.voice) {
          utterance.voice =
            this.voice;

          utterance.lang =
            this.voice.lang;
        } else {
          utterance.lang =
            "en-US";
        }

        // =====================================================
        // ATHENA VOICE CHARACTER
        // =====================================================

        utterance.rate = 0.92;

        utterance.pitch = 0.92;

        utterance.volume = 1;

        // =====================================================
        // SPEECH START
        // =====================================================

        utterance.onstart = () => {
          console.log(
            "🔊 ATHENA SPEAKING"
          );

          useSpeechStore
            .getState()
            .setSpeaking(true);

          useSpeechStore
            .getState()
            .setAudioLevel(1);
        };

        // =====================================================
        // SPEECH END
        // =====================================================

        utterance.onend = () => {
          console.log(
            "🔊 ATHENA FINISHED SPEAKING"
          );

          useSpeechStore
            .getState()
            .setSpeaking(false);

          useSpeechStore
            .getState()
            .setAudioLevel(0);

          resolve();
        };

        // =====================================================
        // SPEECH ERROR
        // =====================================================

        utterance.onerror = (
          event
        ) => {
          console.error(
            "ATHENA speech error:",
            event
          );

          useSpeechStore
            .getState()
            .setSpeaking(false);

          useSpeechStore
            .getState()
            .setAudioLevel(0);

          reject(event);
        };

        // =====================================================
        // SPEAK
        // =====================================================

        this.synth.speak(
          utterance
        );
      }
    );
  }

  // =========================================================
  // STOP SPEECH
  // =========================================================

  stop() {
    if (!this.synth) {
      return;
    }

    this.synth.cancel();

    useSpeechStore
      .getState()
      .setSpeaking(false);

    useSpeechStore
      .getState()
      .setAudioLevel(0);
  }
}

// ===========================================================
// CREATE SINGLE ATHENA SPEECH INSTANCE
// ===========================================================

const SpeechService =
  new AthenaSpeechService();

// ===========================================================
// INITIALIZE
// ===========================================================

SpeechService.init();

// ===========================================================
// EXPORT
// ===========================================================

export default SpeechService;