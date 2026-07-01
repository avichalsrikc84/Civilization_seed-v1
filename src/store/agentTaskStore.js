import { create } from 'zustand'

const DEFAULT_AGENTS = {
  github: {
    status: 'ONLINE',
    task: 'Idle',
    progress: 0,
  },

  linkedin: {
    status: 'ONLINE',
    task: 'Idle',
    progress: 0,
  },

  resume: {
    status: 'ONLINE',
    task: 'Idle',
    progress: 0,
  },

  recruiter: {
    status: 'ONLINE',
    task: 'Idle',
    progress: 0,
  },

  interview: {
    status: 'READY',
    task: 'Idle',
    progress: 0,
  },

  career: {
    status: 'ONLINE',
    task: 'Idle',
    progress: 0,
  },
}

export const useAgentTaskStore = create((set) => ({
  agents: DEFAULT_AGENTS,

  startTask(agent, task) {
    set((state) => ({
      agents: {
        ...state.agents,

        [agent]: {
          ...state.agents[agent],

          status: 'SYNCING',

          task,

          progress: 0,
        },
      },
    }))
  },

  updateProgress(agent, progress) {
    set((state) => ({
      agents: {
        ...state.agents,

        [agent]: {
          ...state.agents[agent],

          progress,
        },
      },
    }))
  },

  finishTask(agent) {
    set((state) => ({
      agents: {
        ...state.agents,

        [agent]: {
          ...state.agents[agent],

          status: 'ONLINE',

          task: 'Idle',

          progress: 100,
        },
      },
    }))
  },
}))