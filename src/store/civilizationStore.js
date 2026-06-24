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

    activeRegion: null,

    growthStarted: false,

    setStage: (stage) =>
      set({
        stage,
        manualStage: true,
      }),

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

        const nodes = [
          ...state.nodes,
        ]

        nodes.push({
          id:
            Date.now() +
            Math.random(),

          lat,
          lon,

          energy: 1,
        })

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

setInterval(() => {
  useCivilizationStore
    .getState()
    .spreadCivilization()
}, 1400)