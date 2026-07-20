import { readGitHubMemory } from '../../../memory/GitHubMemory'
import { readResumeMemory } from '../../../memory/ResumeMemory'

export async function HiringScoreTool({
  consistency,
  portfolio,
}) {
  const githubMemory =
    readGitHubMemory()

  const resumeMemory =
    readResumeMemory()

  if (
    !githubMemory ||
    !resumeMemory
  ) {
    return {
      tool: 'HiringScoreTool',

      status: 'failed',

      timestamp: Date.now(),

      error:
        'GitHub or Resume memory unavailable',

      data: null,
    }
  }

  // =====================================
  // Individual Scores
  // =====================================

  const githubScore =
    githubMemory.intelligence
      .insights
      .engineeringMaturity

  const atsScore =
    resumeMemory.intelligence
      .insights
      .atsScore

  const technicalScore =
    resumeMemory.intelligence
      .insights
      .technicalStrength

  const projectScore =
    portfolio.data
      .strongestProject?.score ??
    0

  const consistencyScore =
    consistency.data.score

  const experienceScore =
    resumeMemory.intelligence
      .insights
      .experienceStrength

  // =====================================
  // Final Hiring Score
  // =====================================

  const overallScore =
    Math.round(
      githubScore * 0.25 +
        atsScore * 0.20 +
        technicalScore * 0.20 +
        projectScore * 0.15 +
        consistencyScore * 0.10 +
        experienceScore * 0.10
    )

  // =====================================
  // Confidence
  // =====================================

  let confidence =
    'Low'

  if (overallScore >= 90) {
    confidence =
      'Very High'
  } else if (
    overallScore >= 80
  ) {
    confidence = 'High'
  } else if (
    overallScore >= 70
  ) {
    confidence =
      'Moderate'
  }

  // =====================================
  // Hiring Decision
  // =====================================

  let recommendation =
    'Not Recommended'

  if (overallScore >= 90) {
    recommendation =
      'Strong Hire'
  } else if (
    overallScore >= 80
  ) {
    recommendation =
      'Hire'
  } else if (
    overallScore >= 70
  ) {
    recommendation =
      'Consider'
  }

  // =====================================
  // Strengths
  // =====================================

  const strengths = []

  if (technicalScore >= 85)
    strengths.push(
      'Strong technical foundation'
    )

  if (githubScore >= 85)
    strengths.push(
      'Excellent GitHub portfolio'
    )

  if (projectScore >= 85)
    strengths.push(
      'High-impact projects'
    )

  if (atsScore >= 85)
    strengths.push(
      'ATS-friendly resume'
    )

  if (
    consistencyScore >= 85
  )
    strengths.push(
      'Resume matches GitHub'
    )

  // =====================================
  // Risks
  // =====================================

  const risks = []

  if (
    consistencyScore < 70
  )
    risks.push(
      'Resume and GitHub are inconsistent'
    )

  if (atsScore < 75)
    risks.push(
      'Resume could fail ATS filters'
    )

  if (projectScore < 70)
    risks.push(
      'Projects need improvement'
    )

  if (
    experienceScore < 60
  )
    risks.push(
      'Limited professional experience'
    )

  // =====================================
  // Recommendations
  // =====================================

  const recommendations =
    []

  if (
    consistencyScore < 90
  ) {
    recommendations.push(
      'Synchronize resume skills with GitHub projects.'
    )
  }

  if (atsScore < 90) {
    recommendations.push(
      'Improve ATS score with stronger keywords and quantified achievements.'
    )
  }

  if (projectScore < 90) {
    recommendations.push(
      'Build another flagship project.'
    )
  }

  if (
    experienceScore < 80
  ) {
    recommendations.push(
      'Gain more internship or professional experience.'
    )
  }

  return {
    tool:
      'HiringScoreTool',

    status: 'success',

    timestamp:
      Date.now(),

    data: {
      overallScore,

      recommendation,

      confidence,

      categories: {

        github:
          githubScore,

        resume:
          atsScore,

        technical:
          technicalScore,

        projects:
          projectScore,

        consistency:
          consistencyScore,

        experience:
          experienceScore,

      },

      strengths,

      risks,

      recommendations,
    },
  }
}