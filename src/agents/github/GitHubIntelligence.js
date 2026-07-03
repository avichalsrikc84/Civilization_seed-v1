function clamp(value) {
  return Math.max(0, Math.min(100, Math.round(value)))
}

export function buildGitHubIntelligence({
  profile,
  repositories,
  events = [],
}) {
  const repoCount = repositories.length

  const stars = repositories.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  )

  const forks = repositories.reduce(
    (sum, repo) => sum + repo.forks_count,
    0
  )

  const watchers = repositories.reduce(
    (sum, repo) => sum + repo.watchers_count,
    0
  )

  //------------------------------------------------

  const languages = {}

  repositories.forEach((repo) => {
    if (!repo.language) return

    languages[repo.language] =
      (languages[repo.language] || 0) + 1
  })

  const strongestTechnologies =
    Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name]) => name)

  //------------------------------------------------

  const pushEvents = events.filter(
    (event) => event.type === 'PushEvent'
  )

  const codingConsistency = clamp(
    pushEvents.length * 4
  )

  //------------------------------------------------

  const repositoryHealth = clamp(
    repositories.filter(
      (repo) =>
        repo.description &&
        !repo.archived &&
        repo.visibility === 'public'
    ).length /
      Math.max(repoCount, 1) *
      100
  )

  //------------------------------------------------

  const technologyDiversity = clamp(
    Object.keys(languages).length * 12
  )

  //------------------------------------------------

  const projectComplexity = clamp(
    repoCount * 4 +
      strongestTechnologies.length * 8 +
      stars * 0.3
  )

  //------------------------------------------------

  const learningVelocity = clamp(
    technologyDiversity * 0.5 +
      projectComplexity * 0.5
  )

  //------------------------------------------------

  const recruiterScore = clamp(
    codingConsistency * 0.25 +
      repositoryHealth * 0.25 +
      projectComplexity * 0.20 +
      learningVelocity * 0.15 +
      technologyDiversity * 0.15
  )

  //------------------------------------------------

  let developerDNA = 'Explorer'

  if (recruiterScore >= 90)
    developerDNA = 'Architect'

  else if (projectComplexity >= 80)
    developerDNA = 'Builder'

  else if (technologyDiversity >= 75)
    developerDNA = 'Innovator'

  //------------------------------------------------

  const strengths = []

  if (codingConsistency >= 75)
    strengths.push(
      'Consistent contributor'
    )

  if (repositoryHealth >= 80)
    strengths.push(
      'Well maintained repositories'
    )

  if (technologyDiversity >= 70)
    strengths.push(
      'Strong technology diversity'
    )

  if (projectComplexity >= 80)
    strengths.push(
      'Complex production projects'
    )

  //------------------------------------------------

  const improvements = []

  if (codingConsistency < 60)
    improvements.push(
      'Increase commit consistency'
    )

  if (repositoryHealth < 70)
    improvements.push(
      'Improve repository documentation'
    )

  if (technologyDiversity < 50)
    improvements.push(
      'Learn additional technologies'
    )

  //------------------------------------------------

  return {
    recruiterScore,

    codingConsistency,

    repositoryHealth,

    projectComplexity,

    learningVelocity,

    technologyDiversity,

    strongestTechnologies,

    developerDNA,

    strengths,

    improvements,

    statistics: {
      repositories: repoCount,

      followers: profile.followers,

      following: profile.following,

      stars,

      forks,

      watchers,
    },

    summary: `${profile.name} demonstrates a ${developerDNA} development profile with a recruiter readiness score of ${recruiterScore}/100.`
  }
}