import {
  fetchProfile,
  fetchRepositories,
} from '../../services/github/githubService'

import {
  buildGitHubMetrics,
} from '../../utils/githubMetrics'

export async function runGitHubAgent(
  username
) {
  const profile =
    await fetchProfile(username)

  const repos =
    await fetchRepositories(
      username
    )

  return buildGitHubMetrics(
    profile,
    repos
  )
}