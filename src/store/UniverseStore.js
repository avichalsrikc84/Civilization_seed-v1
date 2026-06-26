import { create } from "zustand";

const MAX_NODES = 160;

function randomNearby(lat, lon) {
  return {
    lat: lat + (Math.random() - 0.5) * 8,
    lon: lon + (Math.random() - 0.5) * 8,
  };
}

export const useUniverseStore = create((set, get) => ({
  // ==========================
  // TIMELINE
  // ==========================

  stage: 1,

  setStage: (stage) =>
    set({
      stage,
    }),

  // ==========================
  // DIGITAL NODES
  // ==========================

  nodes: [],

  growthStarted: false,

  activeRegion: null,

  setActiveRegion: (lat, lon) =>
    set({
      activeRegion: {
        lat,
        lon,
        timestamp: Date.now(),
      },
    }),

  addNode: (lat, lon) => {
    const state = get();

    if (!state.growthStarted) {
      set({
        growthStarted: true,
      });
    }

    set({
      activeRegion: {
        lat,
        lon,
        timestamp: Date.now(),
      },
    });

    set((state) => {
      if (state.nodes.length >= MAX_NODES)
        return state;

      return {
        nodes: [
          ...state.nodes,
          {
            id:
              Date.now() +
              Math.random(),
            lat,
            lon,
            energy: 1,
          },
        ],
      };
    });
  },

  spreadNodes: () =>
    set((state) => {
      if (!state.growthStarted)
        return state;

      if (
        state.nodes.length >=
        MAX_NODES
      )
        return state;

      const source =
        state.nodes[
          Math.floor(
            Math.random() *
              state.nodes.length
          )
        ];

      if (!source) return state;

      const nearby =
        randomNearby(
          source.lat,
          source.lon
        );

      return {
        nodes: [
          ...state.nodes,
          {
            id:
              Date.now() +
              Math.random(),
            lat: nearby.lat,
            lon: nearby.lon,
            energy:
              (source.energy ??
                1) + 0.05,
          },
        ],
      };
    }),

  // ==========================
  // FUTURE ENGINE STATE
  // ==========================

  selectedSkill: null,

  selectedProject: null,

  hoveredSkill: null,

  hoveredProject: null,

  cameraMode: "identity",

  networkEnabled: false,

  focusMode: false,
}));

setInterval(() => {
  useUniverseStore
    .getState()
    .spreadNodes();
}, 1400);