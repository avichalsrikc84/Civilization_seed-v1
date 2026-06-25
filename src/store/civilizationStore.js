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
    // ======================
    // STAGES
    // ======================

    stage: 1,

    setStage: (stage) =>
      set({
        stage,
      }),

    // ======================
    // CIVILIZATION DATA
    // ======================

    nodes: [],

    growthStarted: false,

    activeRegion: null,

    // ======================
    // USER ATTENTION
    // ======================

    setActiveRegion: (
      lat,
      lon
    ) =>
      set({
        activeRegion: {
          lat,
          lon,
          timestamp: Date.now(),
        },
      }),

    // ======================
    // MANUAL SEED CREATION
    // ======================

    addNode: (lat, lon) => {
      const state = get()

      if (!state.growthStarted) {
        set({
          growthStarted: true,
        })
      }

      set({
        activeRegion: {
          lat,
          lon,
          timestamp: Date.now(),
        },
      })

      set((state) => {
        if (
          state.nodes.length >=
          MAX_SEEDS
        ) {
          return state
        }

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
        }
      })
    },

    // ======================
    // ORGANIC GROWTH
    // ======================

    spreadCivilization: () =>
      set((state) => {
        if (
          !state.growthStarted
        ) {
          return state
        }

        if (
          state.nodes.length >=
          MAX_SEEDS
        ) {
          return state
        }

        const source =
          state.nodes[
            Math.floor(
              Math.random() *
                state.nodes.length
            )
          ]

        if (!source)
          return state

        const nearby =
          randomNearby(
            source.lat,
            source.lon
          )

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
                (source.energy ||
                  1) + 0.05,
            },
          ],
        }
      }),
  }))

// ======================
// AUTO GROWTH LOOP
// ======================

setInterval(() => {
  useCivilizationStore
    .getState()
    .spreadCivilization()
}, 1400)