import { readGitHubMemory } from '../../../memory/GitHubMemory'
import { readResumeMemory } from '../../../memory/ResumeMemory'

export async function ResumeGitHubConsistencyTool() {
  const githubMemory =
    readGitHubMemory()

  const resumeMemory =
    readResumeMemory()

  if (!githubMemory || !resumeMemory) {
    return {
      tool: 'ResumeGitHubConsistencyTool',

      status: 'failed',

      timestamp: Date.now(),

      error:
        'GitHub or Resume memory not available',

      data: null,
    }
  }

  // =====================================
  // Resume Skills
  // =====================================

  const resumeSkills =
    resumeMemory.document.entities.skills.map(
      (skill) =>
        skill.name.toLowerCase()
    )

  // =====================================
  // GitHub Skills
  // =====================================

  const githubSkills =
    githubMemory.skills.data.skills.map(
      (skill) =>
        skill.skill.toLowerCase()
    )

  // =====================================
  // Skills present on GitHub
  // but missing from Resume
  // =====================================

  const missingFromResume =
    githubSkills.filter(
      (skill) =>
        !resumeSkills.includes(skill)
    )

  // =====================================
  // Skills present on Resume
  // but missing from GitHub
  // =====================================

  const missingFromGitHub =
    resumeSkills.filter(
      (skill) =>
        !githubSkills.includes(skill)
    )

  // =====================================
  // Common Skills
  // =====================================

  const commonSkills =
    resumeSkills.filter(
      (skill) =>
        githubSkills.includes(skill)
    )

  // =====================================
  // Consistency Score
  // =====================================

  const total =
    new Set([
      ...resumeSkills,
      ...githubSkills,
    ]).size

  const score =
    total === 0
      ? 0
      : Math.round(
          (commonSkills.length /
            total) *
            100
        )

  // =====================================
  // Recommendations
  // =====================================

  const recommendations = []

  if (
    missingFromResume.length
  ) {
    recommendations.push(
      `Add ${missingFromResume.length} GitHub skills to your resume.`
    )
  }

  if (
    missingFromGitHub.length
  ) {
    recommendations.push(
      `Build projects demonstrating ${missingFromGitHub.length} resume skills.`
    )
  }

  if (score >= 90) {
    recommendations.push(
      'Excellent consistency between GitHub and Resume.'
    )
  }

  return {
    tool:
      'ResumeGitHubConsistencyTool',

    status: 'success',

    timestamp: Date.now(),

    data: {

      score,

      commonSkills,

      missingFromResume,

      missingFromGitHub,

      recommendations,

    },
  }
}