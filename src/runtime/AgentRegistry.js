import { useGitHubStore } from '../store/githubStore'

const registry = {
  github: async () => {
    return useGitHubStore
      .getState()
      .analyze('YOUR_GITHUB_USERNAME')
  },

  resume: async () => {
    console.log(
      'Resume Agent Coming Soon'
    )
  },

  linkedin: async () => {
    console.log(
      'LinkedIn Agent Coming Soon'
    )
  },

  recruiter: async () => {
    console.log(
      'Recruiter Agent Coming Soon'
    )
  },

  interview: async () => {
    console.log(
      'Interview Agent Coming Soon'
    )
  },

  career: async () => {
    console.log(
      'Career Agent Coming Soon'
    )
  },
}

export async function executeAgent(
  source
) {
  const agent = registry[source]

  if (!agent) {
    throw new Error(
      `Unknown agent: ${source}`
    )
  }

  return agent()
}