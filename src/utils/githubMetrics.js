export function buildGitHubMetrics(
  profile,
  repos
) {
  const languageMap = {}

  let stars = 0
  let forks = 0

  repos.forEach((repo) => {
    stars += repo.stargazers_count
    forks += repo.forks_count

    if (repo.language) {
      languageMap[repo.language] =
        (languageMap[repo.language] || 0) + 1
    }
  })

  const topLanguages =
    Object.entries(languageMap)
      .sort(
        (a, b) => b[1] - a[1]
      )
      .slice(0, 5)

  return {
    profile,

    totalRepositories:
      repos.length,

    followers:
      profile.followers,

    following:
      profile.following,

    publicGists:
      profile.public_gists,

    stars,

    forks,

    topLanguages,

    latestRepository:
      repos[0]?.name || 'None',

    lastUpdated:
      repos[0]?.updated_at,
  }
}