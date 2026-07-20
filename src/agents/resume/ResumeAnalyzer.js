export async function analyzeResume({
  parser,
  skills,
  projects,
  experience,
  ats,
}) {
  if (
    !parser ||
    !skills ||
    !projects ||
    !experience ||
    !ats
  ) {
    throw new Error(
      'ResumeAnalyzer: Missing tool outputs.'
    )
  }

  const document = ats.data

  // ====================================
  // Resume Completeness
  // ====================================

  const completeness =
    calculateCompleteness(document)

  // ====================================
  // Technical Strength
  // ====================================

  const technicalStrength =
    calculateTechnicalStrength(document)

  // ====================================
  // Project Strength
  // ====================================

  const projectStrength =
    calculateProjectStrength(document)

  // ====================================
  // Experience Strength
  // ====================================

  const experienceStrength =
    calculateExperienceStrength(document)

  // ====================================
  // Resume Level
  // ====================================

  const resumeLevel =
    determineResumeLevel({
      technicalStrength,
      projectStrength,
      experienceStrength,
    })

  // ====================================
  // Final Intelligence
  // ====================================

  return {
    document,

    insights: {
      atsScore:
        document.ats.score,

      completeness,

      technicalStrength,

      projectStrength,

      experienceStrength,

      resumeLevel,

      strengths:
        document.ats.strengths,

      weaknesses:
        document.ats.weaknesses,

      recommendations:
        document.ats.recommendations,
    },
  }
}

/* =======================================
PRIVATE HELPERS
======================================= */

function calculateCompleteness(
  document
) {
  let score = 0

  if (document.profile.email)
    score += 10

  if (document.profile.phone)
    score += 10

  if (document.profile.linkedin)
    score += 10

  if (document.profile.github)
    score += 10

  if (
    document.entities.skills.length
  )
    score += 20

  if (
    document.entities.projects.length
  )
    score += 20

  if (
    document.entities.experience
      .length
  )
    score += 20

  return Math.min(
    100,
    score
  )
}

function calculateTechnicalStrength(
  document
) {
  const totalSkills =
    document.entities.skills
      .length

  const avgConfidence =
    totalSkills === 0
      ? 0
      : document.entities.skills.reduce(
          (sum, skill) =>
            sum +
            skill.confidence,
          0
        ) / totalSkills

  return Math.round(
    avgConfidence
  )
}

function calculateProjectStrength(
  document
) {
  if (
    !document.entities.projects
      .length
  )
    return 0

  const total =
    document.entities.projects.reduce(
      (
        sum,
        project
      ) =>
        sum +
        project.complexity,
      0
    )

  return Math.round(
    total /
      document.entities.projects
        .length
  )
}

function calculateExperienceStrength(
  document
) {
  if (
    !document.entities.experience
      .length
  )
    return 0

  const total =
    document.entities.experience.reduce(
      (
        sum,
        experience
      ) =>
        sum +
        experience.maturityScore,
      0
    )

  return Math.round(
    total /
      document.entities
        .experience.length
  )
}

function determineResumeLevel({
  technicalStrength,
  projectStrength,
  experienceStrength,
}) {
  const overall =
    (
      technicalStrength +
      projectStrength +
      experienceStrength
    ) /
    3

  if (overall >= 90)
    return 'Outstanding'

  if (overall >= 80)
    return 'Excellent'

  if (overall >= 70)
    return 'Strong'

  if (overall >= 60)
    return 'Average'

  return 'Needs Improvement'
}