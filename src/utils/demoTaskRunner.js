import { useAgentTaskStore } from '../store/agentTaskStore'

const TASKS = {
  github: 'Synchronizing GitHub',

  linkedin: 'Scanning LinkedIn',

  resume: 'Checking ATS',

  recruiter: 'Computing Recruiter Score',

  interview: 'Preparing Interview',

  career: 'Building Career Roadmap',
}

export function runAgent(agent) {
  const store =
    useAgentTaskStore.getState()

  store.startTask(
    agent,
    TASKS[agent]
  )

  let progress = 0

  const timer = setInterval(() => {
    progress += 8

    store.updateProgress(
      agent,
      progress
    )

    if (progress >= 100) {
      clearInterval(timer)

      store.finishTask(agent)
    }
  }, 180)
}