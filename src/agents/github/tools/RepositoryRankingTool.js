export async function RepositoryRankingTool(
  repositories = []
) {
  if (!repositories.length) {
    return {
      tool: 'RepositoryRankingTool',

      status: 'failed',

      timestamp: Date.now(),

      error: 'No repositories found',

      data: null,
    }
  }

  const rankedRepositories =
    repositories.map((repo) => {
      let score = 0

      const reasons = []

      // --------------------------
      // Original Project
      // --------------------------

      if (!repo.fork) {
        score += 15
        reasons.push(
          'Original repository'
        )
      }

      // --------------------------
      // Stars
      // --------------------------

      score += Math.min(
        repo.stargazers_count * 2,
        20
      )

      if (repo.stargazers_count > 0) {
        reasons.push(
          `${repo.stargazers_count} GitHub stars`
        )
      }

      // --------------------------
      // Forks
      // --------------------------

      score += Math.min(
        repo.forks_count,
        10
      )

      // --------------------------
      // Description
      // --------------------------

      if (
        repo.description &&
        repo.description.length > 30
      ) {
        score += 8

        reasons.push(
          'Well described'
        )
      }

      // --------------------------
      // Homepage / Demo
      // --------------------------

      if (repo.homepage) {
        score += 10

        reasons.push(
          'Live demo available'
        )
      }

      // --------------------------
      // Topics
      // --------------------------

      if (
        repo.topics &&
        repo.topics.length
      ) {
        score += Math.min(
          repo.topics.length * 2,
          10
        )

        reasons.push(
          'Uses repository topics'
        )
      }

      // --------------------------
      // Recently Updated
      // --------------------------

      const daysOld =
        Math.floor(
          (Date.now() -
            new Date(
              repo.updated_at
            ).getTime()) /
            (1000 *
              60 *
              60 *
              24)
        )

      if (daysOld < 30) {
        score += 10

        reasons.push(
          'Recently maintained'
        )
      }

      // --------------------------
      // Language
      // --------------------------

      if (repo.language) {
        score += 5
      }

      // --------------------------
      // Size
      // --------------------------

      if (repo.size > 500) {
        score += 10

        reasons.push(
          'Substantial codebase'
        )
      }

      // --------------------------
      // Archived Penalty
      // --------------------------

      if (repo.archived) {
        score -= 15

        reasons.push(
          'Archived project'
        )
      }

      score = Math.max(
        0,
        Math.min(
          100,
          Math.round(score)
        )
      )

      return {
        name: repo.name,

        score,

        stars:
          repo.stargazers_count,

        forks:
          repo.forks_count,

        language:
          repo.language,

        updatedAt:
          repo.updated_at,

        url:
          repo.html_url,

        reasons,
      }
    })

  rankedRepositories.sort(
    (a, b) =>
      b.score - a.score
  )

  return {
    tool:
      'RepositoryRankingTool',

    status: 'success',

    timestamp: Date.now(),

    data: {
      topRepository:
        rankedRepositories[0],

      rankedRepositories,
    },
  }
}