import { create } from "zustand";

export const useSpeechStore = create((set) => ({
  isSpeaking: false,

  audioLevel: 0,

  setSpeaking: (value) =>
    set({
      isSpeaking: value,
    }),

  setAudioLevel: (value) =>
    set({
      audioLevel: value,
    }),
}));