export async function RepositoryTool(repositories = []) {
  if (!repositories.length) {
    return {
      tool: 'RepositoryTool',
      status: 'failed',
      timestamp: Date.now(),
      error: 'No repositories found',
      data: null,
    }
  }

  const totalRepositories = repositories.length

  const archivedRepositories =
    repositories.filter(
      (repo) => repo.archived
    ).length

  const forkedRepositories =
    repositories.filter(
      (repo) => repo.fork
    ).length

  const originalRepositories =
    totalRepositories -
    forkedRepositories

  const totalStars =
    repositories.reduce(
      (sum, repo) =>
        sum + repo.stargazers_count,
      0
    )

  const totalForks =
    repositories.reduce(
      (sum, repo) =>
        sum + repo.forks_count,
      0
    )

  const averageStars =
    Number(
      (
        totalStars /
        totalRepositories
      ).toFixed(2)
    )

  const averageForks =
    Number(
      (
        totalForks /
        totalRepositories
      ).toFixed(2)
    )

  const mostStarred =
    [...repositories].sort(
      (a, b) =>
        b.stargazers_count -
        a.stargazers_count
    )[0]

  const latestUpdated =
    [...repositories].sort(
      (a, b) =>
        new Date(b.updated_at) -
        new Date(a.updated_at)
    )[0]

  const activeRepositories =
    repositories.filter((repo) => {
      const updated =
        new Date(repo.updated_at)

      const diff =
        (Date.now() -
          updated.getTime()) /
        (1000 * 60 * 60 * 24)

      return diff < 180
    })

  const dormantRepositories =
    repositories.filter((repo) => {
      const updated =
        new Date(repo.updated_at)

      const diff =
        (Date.now() -
          updated.getTime()) /
        (1000 * 60 * 60 * 24)

      return diff >= 180
    })

  const pinnedCandidates =
    repositories
      .filter(
        (repo) => !repo.fork
      )
      .sort((a, b) => {
        const scoreA =
          a.stargazers_count * 3 +
          a.forks_count * 2

        const scoreB =
          b.stargazers_count * 3 +
          b.forks_count * 2

        return scoreB - scoreA
      })
      .slice(0, 5)
      .map((repo) => ({
        name: repo.name,
        stars:
          repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt:
          repo.updated_at,
        url: repo.html_url,
      }))

  return {
    tool: 'RepositoryTool',

    status: 'success',

    timestamp: Date.now(),

    data: {
      totalRepositories,

      originalRepositories,

      forkedRepositories,

      archivedRepositories,

      activeRepositories:
        activeRepositories.length,

      dormantRepositories:
        dormantRepositories.length,

      totalStars,

      totalForks,

      averageStars,

      averageForks,

      mostStarred: {
        name:
          mostStarred.name,

        stars:
          mostStarred.stargazers_count,

        forks:
          mostStarred.forks_count,

        url:
          mostStarred.html_url,
      },

      latestUpdated: {
        name:
          latestUpdated.name,

        updatedAt:
          latestUpdated.updated_at,

        url:
          latestUpdated.html_url,
      },

      pinnedCandidates,
    },
  }
}