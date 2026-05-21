import { create } from 'zustand'

const MAX_SEEDS = 160

function randomNearby(lat, lon) {
  return {
    lat:
      lat + (Math.random() - 0.5) * 8,

    lon:
      lon + (Math.random() - 0.5) * 8,
  }
}

export const useCivilizationStore =
  create((set, get) => ({
    stage: 1,

    manualStage: false,

    nodes: [],

    growthStarted: false,

    setStage: (stage) =>
      set({
        stage,
        manualStage: true,
      }),

    addNode: (lat, lon) => {
      const state = get()

      // START ONLY AFTER FIRST CLICK
      if (!state.growthStarted) {
        set({
          growthStarted: true,
        })
      }

      set((state) => {
        if (
          state.nodes.length >=
          MAX_SEEDS
        ) {
          return state
        }

        const nodes = [
          ...state.nodes,

          {
            id:
              Date.now() +
              Math.random(),

            lat,
            lon,

            energy: 1,
          },
        ]

        // AUTO STAGES
        let autoStage = 1

        if (nodes.length > 8)
          autoStage = 2

        if (nodes.length > 25)
          autoStage = 3

        if (nodes.length > 55)
          autoStage = 4

        if (nodes.length > 95)
          autoStage = 5

        if (nodes.length > 135)
          autoStage = 6

        return {
          nodes,

          stage: state.manualStage
            ? state.stage
            : autoStage,
        }
      })
    },

    // GRADUAL CIVILIZATION GROWTH
    spreadCivilization: () =>
      set((state) => {
        if (
          !state.growthStarted
        )
          return state

        if (
          state.nodes.length >=
          MAX_SEEDS
        ) {
          return state
        }

        const nodes = [
          ...state.nodes,
        ]

        // RANDOMLY EXPAND FROM EXISTING NODES
        const source =
          nodes[
            Math.floor(
              Math.random() *
                nodes.length
            )
          ]

        if (!source) return state

        const nearby =
          randomNearby(
            source.lat,
            source.lon
          )

        nodes.push({
          id:
            Date.now() +
            Math.random(),

          lat: nearby.lat,
          lon: nearby.lon,

          energy:
            (source.energy || 1) +
            0.05,
        })

        // AUTO STAGES
        let autoStage = 1

        if (nodes.length > 8)
          autoStage = 2

        if (nodes.length > 25)
          autoStage = 3

        if (nodes.length > 55)
          autoStage = 4

        if (nodes.length > 95)
          autoStage = 5

        if (nodes.length > 135)
          autoStage = 6

        return {
          nodes,

          stage: state.manualStage
            ? state.stage
            : autoStage,
        }
      }),
  }))

// CONTINUOUS EVOLUTION LOOP
setInterval(() => {
  useCivilizationStore
    .getState()
    .spreadCivilization()
}, 1400)