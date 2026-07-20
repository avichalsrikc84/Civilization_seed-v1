import { create } from 'zustand'

export const useMissionControlStore =
  create((set) => ({
    // ===========================
    // PANEL
    // ===========================

    isOpen: false,

    togglePanel: () =>
      set((state) => ({
        isOpen: !state.isOpen,
      })),

    openPanel: () =>
      set({
        isOpen: true,
      }),

    closePanel: () =>
      set({
        isOpen: false,
      }),

    // ===========================
    // HOVER
    // ===========================

    hoveredAgent: null,

    setHoveredAgent: (
      agent
    ) =>
      set({
        hoveredAgent: agent,
      }),

    // ===========================
    // FOCUS
    // ===========================

    focusedAgent: null,

    setFocusedAgent: (
      agent
    ) =>
      set({
        focusedAgent: agent,
      }),

    clearFocus: () =>
      set({
        focusedAgent: null,
        hoveredAgent: null,
      }),

    // ===========================
    // ACTIVE AGENT
    // ===========================

    activeAgent: null,

    setActiveAgent: (
      agent
    ) =>
      set({
        activeAgent: agent,
      }),

    // ===========================
    // FUTURE
    // ===========================

    focusState: 'idle',

    setFocusState: (
      state
    ) =>
      set({
        focusState: state,
      }),
  }))