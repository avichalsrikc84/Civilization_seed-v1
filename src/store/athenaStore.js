import { create } from 'zustand'

// import { runGitHubAgent } from '../agents/github/GitHubAgent'

export const useAthenaStore =
  create((set) => ({
    github: null,

    activeAgent: null,

    loading: false,

    error: null,

    async syncGitHub(
      username
    ) {
      try {
        set({
          loading: true,

          activeAgent:
            'github',

          error: null,
        })

        const metrics =
          await runGitHubAgent(
            username
          )

        set({
          github: metrics,

          loading: false,

          activeAgent: null,
        })
      } catch (error) {
        set({
          loading: false,

          activeAgent: null,

          error:
            error.message,
        })
      }
    },
  }))