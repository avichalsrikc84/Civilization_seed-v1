export async function analyzeGitHub({
  profile,
  repositories,
  languages,
  activity,
}) {
  // ----------------------------
  // Validate Inputs
  // ----------------------------

  if (
    !profile ||
    !repositories ||
    !languages ||
    !activity
  ) {
    throw new Error(
      'GitHubAnalyzer: Missing tool outputs.'
    )
  }

  // ----------------------------
  // Repository Health
  // ----------------------------

  const repoHealth =
    calculateRepositoryHealth(
      repositories.data
    )

  // ----------------------------
  // Coding Consistency
  // ----------------------------

  const codingConsistency =
    calculateConsistency(
      activity.data
    )

  // ----------------------------
  // Technology Diversity
  // ----------------------------

  const techDiversity =
    languages.data.totalLanguages

  // ----------------------------
  // Engineering Maturity
  // ----------------------------

  const engineeringMaturity =
    calculateEngineeringMaturity({
      repositories:
        repositories.data,
      activity:
        activity.data,
      languages:
        languages.data,
    })

  // ----------------------------
  // Strengths
  // ----------------------------

  const strengths = []

  if (
    repositories.data.originalRepositories >
    5
  ) {
    strengths.push(
      'Builds original software'
    )
  }

  if (
    languages.data.totalLanguages >=
    4
  ) {
    strengths.push(
      'Works with multiple technologies'
    )
  }

  if (
    activity.data.daysSinceLastActivity <=
    7
  ) {
    strengths.push(
      'Recently active developer'
    )
  }

  if (
    repositories.data.totalStars >
    25
  ) {
    strengths.push(
      'Projects receive community interest'
    )
  }

  // ----------------------------
  // Weaknesses
  // ----------------------------

  const weaknesses = []

  if (
    repositories.data.archivedRepositories >
    3
  ) {
    weaknesses.push(
      'Several archived projects'
    )
  }

  if (
    activity.data.daysSinceLastActivity >
    30
  ) {
    weaknesses.push(
      'Low recent GitHub activity'
    )
  }

  if (
    repositories.data.averageStars <
    1
  ) {
    weaknesses.push(
      'Projects lack visibility'
    )
  }

  // ----------------------------
  // Recommendations
  // ----------------------------

  const recommendations = []

  if (
    repositories.data.averageStars <
    3
  ) {
    recommendations.push(
      'Improve project documentation.'
    )
  }

  if (
    techDiversity < 3
  ) {
    recommendations.push(
      'Explore additional technologies.'
    )
  }

  if (
    activity.data.daysSinceLastActivity >
    14
  ) {
    recommendations.push(
      'Increase commit frequency.'
    )
  }

  // ----------------------------
  // Final Intelligence
  // ----------------------------

  return {
    profile:
      profile.data,

    repositories:
      repositories.data,

    languages:
      languages.data,

    activity:
      activity.data,

    insights: {

      repositoryHealth:
        repoHealth,

      engineeringMaturity,

      codingConsistency,

      technologyDiversity:
        techDiversity,

      strengths,

      weaknesses,

      recommendations,
    },
  }
}

/* ===========================================
   PRIVATE HELPERS
=========================================== */

function calculateRepositoryHealth(
  repositories
) {
  let score = 100

  score -=
    repositories.archivedRepositories *
    5

  score -=
    repositories.dormantRepositories *
    2

  score +=
    repositories.averageStars

  return Math.max(
    0,
    Math.min(
      100,
      Math.round(score)
    )
  )
}

function calculateConsistency(
  activity
) {
  if (
    activity.daysSinceLastActivity <=
    3
  )
    return 'Excellent'

  if (
    activity.daysSinceLastActivity <=
    7
  )
    return 'Good'

  if (
    activity.daysSinceLastActivity <=
    30
  )
    return 'Average'

  return 'Needs Improvement'
}

function calculateEngineeringMaturity({
  repositories,
  activity,
  languages,
}) {
  let score = 0

  score += Math.min(
    repositories.totalRepositories *
      2,
    30
  )

  score += Math.min(
    repositories.totalStars,
    20
  )

  score += Math.min(
    languages.totalLanguages *
      5,
    20
  )

  if (
    activity.daysSinceLastActivity <=
    7
  ) {
    score += 20
  }

  if (
    repositories.originalRepositories >
    repositories.forkedRepositories
  ) {
    score += 10
  }

  return Math.min(
    100,
    Math.round(score)
  )
}