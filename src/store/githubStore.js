import { create } from 'zustand'

import { runGitHubAgent } from '../agents/github/GitHubAgent'
import { useAgentTaskStore } from './agentTaskStore'

export const useGitHubStore = create((set) => ({
  loading: false,

  error: null,

  data: null,

  lastUpdated: null,

  async analyze(username) {
    const runtime =
      useAgentTaskStore.getState()

    try {
      set({
        loading: true,
        error: null,
      })

      runtime.startTask(
        'github',
        'Connecting to GitHub'
      )

      runtime.updateProgress(
        'github',
        10
      )

      runtime.startTask(
        'github',
        'Downloading Profile'
      )

      runtime.updateProgress(
        'github',
        30
      )

      runtime.startTask(
        'github',
        'Downloading Repositories'
      )

      runtime.updateProgress(
        'github',
        55
      )

      runtime.startTask(
        'github',
        'Analyzing Repository Data'
      )

      const result =
        await runGitHubAgent(username)

      runtime.updateProgress(
        'github',
        90
      )

      runtime.startTask(
        'github',
        'Preparing Report'
      )

      runtime.updateProgress(
        'github',
        100
      )

      runtime.finishTask('github')

      set({
        data: result,

        loading: false,

        lastUpdated:
          new Date().toLocaleTimeString(),
      })

      return result
    } catch (error) {
      runtime.finishTask(
        'github'
      )

      set({
        loading: false,

        error:
          error.message ||
          'Unable to analyze GitHub profile.',
      })

      throw error
    }
  },
}))