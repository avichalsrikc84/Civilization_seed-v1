import { useRef } from "react";

import { transcribeAudio } from "../services/voiceApi";
import { useVoice } from "../contexts/VoiceContext";

import { useSpeechStore } from "../../store/speechStore";

export function useRecorder() {
  const mediaRecorderRef =
    useRef(null);

  const chunksRef =
    useRef([]);

  const streamRef =
    useRef(null);

  const silenceTimerRef =
    useRef(null);

  const analyserRef =
    useRef(null);

  const audioContextRef =
    useRef(null);

  const silenceStartedRef =
    useRef(null);

  const stoppingRef =
    useRef(false);

  const {
    isRecording,
    setIsRecording,

    setIsProcessing,

    setTranscript,

    setError,
  } = useVoice();

  const setAudioLevel =
    useSpeechStore(
      (state) =>
        state.setAudioLevel
    );

  // =========================================================
  // CONFIGURATION
  // =========================================================

  const SILENCE_THRESHOLD =
    0.015;

  const SILENCE_DURATION =
    1000;

  const MIN_RECORDING_TIME =
    500;

  // =========================================================
  // CLEAR SILENCE DETECTION
  // =========================================================

  const clearSilenceDetection =
    () => {
      if (
        silenceTimerRef.current
      ) {
        cancelAnimationFrame(
          silenceTimerRef.current
        );

        silenceTimerRef.current =
          null;
      }

      silenceStartedRef.current =
        null;
    };

  // =========================================================
  // CLEANUP AUDIO
  // =========================================================

  const cleanupAudio = () => {
    clearSilenceDetection();

    if (
      audioContextRef.current
    ) {
      audioContextRef.current
        .close()
        .catch(() => {});

      audioContextRef.current =
        null;
    }

    analyserRef.current =
      null;

    setAudioLevel(0);

    if (streamRef.current) {
      streamRef.current
        .getTracks()
        .forEach((track) => {
          track.stop();
        });

      streamRef.current =
        null;
    }
  };

  // =========================================================
  // MONITOR MICROPHONE
  // =========================================================

  const monitorSilence = (
    recorder
  ) => {
    if (
      !analyserRef.current ||
      recorder.state !==
        "recording"
    ) {
      return;
    }

    const analyser =
      analyserRef.current;

    const bufferLength =
      analyser.fftSize;

    const dataArray =
      new Uint8Array(
        bufferLength
      );

    const checkAudio = () => {
      if (
        recorder.state !==
        "recording"
      ) {
        setAudioLevel(0);
        return;
      }

      analyser.getByteTimeDomainData(
        dataArray
      );

      // =====================================================
      // CALCULATE RMS
      // =====================================================

      let sum = 0;

      for (
        let i = 0;
        i < dataArray.length;
        i++
      ) {
        const normalized =
          (dataArray[i] - 128) /
          128;

        sum +=
          normalized *
          normalized;
      }

      const rms = Math.sqrt(
        sum / dataArray.length
      );

      // =====================================================
      // VISUAL AUDIO LEVEL
      // =====================================================

      /*
       * Convert microphone volume
       * into a 0 → 1 value.
       *
       * This is intentionally smoothed
       * so the ATHENA core doesn't
       * jitter excessively.
       */

      const visualLevel =
        Math.min(
          1,
          Math.max(
            0,
            (rms -
              SILENCE_THRESHOLD) *
              18
          )
        );

      setAudioLevel(
        visualLevel
      );

      // =====================================================
      // RECORDING TIME
      // =====================================================

      const recordingTime =
        performance.now() -
        recorder.__startedAt;

      // =====================================================
      // USER IS SPEAKING
      // =====================================================

      if (
        rms >
        SILENCE_THRESHOLD
      ) {
        silenceStartedRef.current =
          null;
      }

      // =====================================================
      // USER IS SILENT
      // =====================================================

      else if (
        recordingTime >
        MIN_RECORDING_TIME
      ) {
        if (
          silenceStartedRef.current ===
          null
        ) {
          silenceStartedRef.current =
            performance.now();
        }

        const silenceDuration =
          performance.now() -
          silenceStartedRef.current;

        if (
          silenceDuration >=
          SILENCE_DURATION
        ) {
          console.log(
            "🤫 Silence detected — stopping recording"
          );

          stopRecording();

          return;
        }
      }

      silenceTimerRef.current =
        requestAnimationFrame(
          checkAudio
        );
    };

    checkAudio();
  };

  // =========================================================
  // START RECORDING
  // =========================================================

  const startRecording =
    async () => {
      try {
        if (isRecording) {
          return;
        }

        const stream =
          await navigator.mediaDevices.getUserMedia(
            {
              audio: {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true,
              },
            }
          );

        streamRef.current =
          stream;

        const recorder =
          new MediaRecorder(
            stream
          );

        chunksRef.current =
          [];

        stoppingRef.current =
          false;

        recorder.__startedAt =
          performance.now();

        // ===================================================
        // AUDIO DATA
        // ===================================================

        recorder.ondataavailable =
          (event) => {
            if (
              event.data &&
              event.data.size > 0
            ) {
              chunksRef.current.push(
                event.data
              );
            }
          };

        // ===================================================
        // STOP
        // ===================================================

        recorder.onstop =
          async () => {
            try {
              setIsRecording(false);

              setAudioLevel(0);

              setIsProcessing(
                true
              );

              clearSilenceDetection();

              const audioBlob =
                new Blob(
                  chunksRef.current,
                  {
                    type: "audio/webm",
                  }
                );

              console.log(
                "☁️ Sending audio to Whisper..."
              );

              const result =
                await transcribeAudio(
                  audioBlob
                );

              console.log(
                "========== WHISPER =========="
              );

              console.log(
                "Whisper Result:",
                result
              );

              console.log(
                "Transcript:",
                result?.text
              );

              console.log(
                "============================="
              );

              if (
                result?.text?.trim()
              ) {
                setTranscript(
                  result.text.trim()
                );
              } else {
                console.warn(
                  "Whisper returned no transcript."
                );
              }
            } catch (error) {
              console.error(
                "Transcription Error:",
                error
              );

              setError(
                "Failed to transcribe audio."
              );
            } finally {
              setIsProcessing(
                false
              );

              cleanupAudio();

              chunksRef.current =
                [];

              stoppingRef.current =
                false;
            }
          };

        // ===================================================
        // STORE RECORDER
        // ===================================================

        mediaRecorderRef.current =
          recorder;

        // ===================================================
        // START
        // ===================================================

        recorder.start();

        setIsRecording(true);

        setAudioLevel(0);

        console.log(
          "🎤 Recording Started..."
        );

        // ===================================================
        // AUDIO ANALYSER
        // ===================================================

        const AudioContext =
          window.AudioContext ||
          window.webkitAudioContext;

        if (AudioContext) {
          const audioContext =
            new AudioContext();

          audioContextRef.current =
            audioContext;

          const source =
            audioContext.createMediaStreamSource(
              stream
            );

          const analyser =
            audioContext.createAnalyser();

          analyser.fftSize = 512;

          analyser.smoothingTimeConstant =
            0.7;

          source.connect(
            analyser
          );

          analyserRef.current =
            analyser;

          monitorSilence(
            recorder
          );
        }
      } catch (error) {
        console.error(
          "Microphone Error:",
          error
        );

        setError(
          "Microphone permission denied."
        );

        setAudioLevel(0);

        cleanupAudio();
      }
    };

  // =========================================================
  // STOP RECORDING
  // =========================================================

  const stopRecording = () => {
    const recorder =
      mediaRecorderRef.current;

    if (!recorder) {
      return;
    }

    if (
      recorder.state ===
      "inactive"
    ) {
      return;
    }

    if (stoppingRef.current) {
      return;
    }

    stoppingRef.current =
      true;

    console.log(
      "🛑 Recording Stopped"
    );

    clearSilenceDetection();

    setAudioLevel(0);

    recorder.stop();
  };

  // =========================================================
  // RETURN
  // =========================================================

  return {
    isRecording,

    startRecording,

    stopRecording,
  };
}