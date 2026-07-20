const REQUIRED_SECTIONS = [
  'education',
  'skills',
  'projects',
  'experience',
]

const ACTION_VERBS = [
  'developed',
  'built',
  'designed',
  'implemented',
  'optimized',
  'created',
  'improved',
  'engineered',
  'automated',
  'integrated',
  'deployed',
  'led',
  'managed',
  'analyzed',
]

export async function ATSAnalyzerTool(
  resumeDocument
) {
  if (!resumeDocument) {
    return {
      tool: 'ATSAnalyzerTool',

      status: 'failed',

      timestamp: Date.now(),

      error: 'Resume document missing',

      data: null,
    }
  }

  let score = 100

  const strengths = []

  const weaknesses = []

  const recommendations = []

  // ===========================
  // CONTACT INFORMATION
  // ===========================

  if (resumeDocument.profile.email) {
    strengths.push('Email detected')
  } else {
    score -= 10

    weaknesses.push('Missing email')

    recommendations.push(
      'Add a professional email address.'
    )
  }

  if (resumeDocument.profile.phone) {
    strengths.push('Phone number detected')
  } else {
    score -= 5

    weaknesses.push('Missing phone number')
  }

  if (resumeDocument.profile.linkedin) {
    strengths.push('LinkedIn profile present')
  } else {
    score -= 5

    recommendations.push(
      'Include your LinkedIn profile.'
    )
  }

  if (resumeDocument.profile.github) {
    strengths.push('GitHub profile present')
  }

  // ===========================
  // SECTION CHECK
  // ===========================

  REQUIRED_SECTIONS.forEach((section) => {
    if (
      resumeDocument.sections[section] &&
      resumeDocument.sections[section].length > 20
    ) {
      strengths.push(
        `${section} section available`
      )
    } else {
      score -= 8

      weaknesses.push(
        `${section} section missing`
      )

      recommendations.push(
        `Improve the ${section} section.`
      )
    }
  })

  // ===========================
  // SKILLS
  // ===========================

  const totalSkills =
    resumeDocument.entities.skills.length

  if (totalSkills >= 10) {
    score += 5

    strengths.push(
      'Strong technical skill coverage'
    )
  } else {
    score -= 5

    weaknesses.push(
      'Limited technical skills'
    )

    recommendations.push(
      'Add more relevant technical skills.'
    )
  }

  // ===========================
  // PROJECTS
  // ===========================

  const projects =
    resumeDocument.entities.projects

  if (projects.length >= 3) {
    score += 5

    strengths.push(
      'Multiple projects listed'
    )
  } else {
    score -= 5

    weaknesses.push(
      'Not enough projects'
    )
  }

  const demoProjects =
    projects.filter(
      (project) => project.demo
    )

  if (demoProjects.length) {
    strengths.push(
      'Projects include live demos'
    )
  } else {
    recommendations.push(
      'Add live demo links for projects.'
    )
  }

  // ===========================
  // EXPERIENCE
  // ===========================

  if (
    resumeDocument.entities.experience.length
  ) {
    strengths.push(
      'Professional experience present'
    )
  } else {
    score -= 8

    weaknesses.push(
      'No professional experience'
    )
  }

  // ===========================
  // ACTION VERBS
  // ===========================

  const lowerText =
    resumeDocument.rawText.toLowerCase()

  let verbsFound = 0

  ACTION_VERBS.forEach((verb) => {
    if (lowerText.includes(verb)) {
      verbsFound++
    }
  })

  if (verbsFound >= 6) {
    strengths.push(
      'Strong action-oriented writing'
    )
  } else {
    recommendations.push(
      'Use stronger action verbs in experience and project descriptions.'
    )
  }

  // ===========================
  // FINAL SCORE
  // ===========================

  score = Math.max(
    0,
    Math.min(100, Math.round(score))
  )

  resumeDocument.ats = {
    score,

    strengths,

    weaknesses,

    recommendations,
  }

  return {
    tool: 'ATSAnalyzerTool',

    status: 'success',

    timestamp: Date.now(),

    data: resumeDocument,
  }
}