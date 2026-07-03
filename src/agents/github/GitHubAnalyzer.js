export function analyzeGitHub(
  profile,
  repos,
  events
) {
  let totalStars = 0
  let totalForks = 0

  const languages = {}

  repos.forEach((repo) => {
    totalStars +=
      repo.stargazers_count

    totalForks +=
      repo.forks_count

    if (repo.language) {
      languages[
        repo.language
      ] =
        (languages[
          repo.language
        ] || 0) + 1
    }
  })

  const topLanguages =
    Object.entries(languages)
      .sort(
        (a, b) =>
          b[1] - a[1]
      )
      .slice(0, 5)

  return {
    profile,

    repositories:
      repos.length,

    followers:
      profile.followers,

    following:
      profile.following,

    stars: totalStars,

    forks: totalForks,

    topLanguages,

    latestRepository:
      repos[0]?.name,
  }
}