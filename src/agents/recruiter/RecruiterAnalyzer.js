export async function analyzeRecruiter({
  consistency,
  portfolio,
  hiringScore,
  missingSkills,
}) {
  if (
    !consistency ||
    !portfolio ||
    !hiringScore ||
    !missingSkills
  ) {
    throw new Error(
      'RecruiterAnalyzer: Missing tool outputs.'
    )
  }

  const hiring =
    hiringScore.data

  const portfolioData =
    portfolio.data

  const consistencyData =
    consistency.data

  const missing =
    missingSkills.data

  // =====================================
  // Recruiter Confidence
  // =====================================

  const recruiterConfidence =
    calculateConfidence(
      hiring.overallScore,
      consistencyData.score
    )

  // =====================================
  // Overall Risk
  // =====================================

  const riskLevel =
    calculateRisk(
      hiring.overallScore
    )

  // =====================================
  // Top Action Plan
  // =====================================

  const actionPlan = []

  actionPlan.push(
    ...hiring.recommendations
  )

  missing.topPrioritySkills
    .slice(0, 3)
    .forEach((skill) => {
      actionPlan.push(
        `Learn ${skill.skill}`
      )
    })

  // remove duplicates
  const uniqueActions =
    [...new Set(actionPlan)]

  // =====================================
  // Strongest Skills
  // =====================================

  const strongestAreas = []

  Object.entries(
    hiring.categories
  ).forEach(([key, value]) => {
    if (value >= 85) {
      strongestAreas.push({
        category: key,
        score: value,
      })
    }
  })

  // =====================================
  // Weakest Areas
  // =====================================

  const weakestAreas = []

  Object.entries(
    hiring.categories
  ).forEach(([key, value]) => {
    if (value < 75) {
      weakestAreas.push({
        category: key,
        score: value,
      })
    }
  })

  // =====================================
  // Final Recruiter Report
  // =====================================

  return {
    recruiterReport: {

      overallHiringScore:
        hiring.overallScore,

      recommendation:
        hiring.recommendation,

      recruiterConfidence,

      riskLevel,

      portfolioStrength:
        portfolioData.strongestProject,

      weakestProject:
        portfolioData.weakestProject,

      portfolioRecommendations:
        portfolioData.recommendations,

      consistencyScore:
        consistencyData.score,

      missingSkills:
        missing.topPrioritySkills,

      strongestAreas,

      weakestAreas,

      strengths:
        hiring.strengths,

      risks:
        hiring.risks,

      actionPlan:
        uniqueActions,
    },
  }
}

/* ========================================
PRIVATE HELPERS
======================================== */

function calculateConfidence(
  hiring,
  consistency
) {
  const average =
    (hiring + consistency) / 2

  if (average >= 90)
    return 'Very High'

  if (average >= 80)
    return 'High'

  if (average >= 70)
    return 'Moderate'

  return 'Low'
}

function calculateRisk(
  score
) {
  if (score >= 90)
    return 'Very Low'

  if (score >= 80)
    return 'Low'

  if (score >= 70)
    return 'Medium'

  return 'High'
}