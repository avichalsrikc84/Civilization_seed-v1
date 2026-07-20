import { readGitHubMemory } from '../../../memory/GitHubMemory'
import { readResumeMemory } from '../../../memory/ResumeMemory'

export async function PortfolioEvaluationTool() {
  const githubMemory =
    readGitHubMemory()

  const resumeMemory =
    readResumeMemory()

  if (!githubMemory || !resumeMemory) {
    return {
      tool: 'PortfolioEvaluationTool',

      status: 'failed',

      timestamp: Date.now(),

      error:
        'GitHub or Resume memory missing',

      data: null,
    }
  }

  const githubProjects =
    githubMemory.ranking.data
      .rankedRepositories

  const resumeProjects =
    resumeMemory.document.entities
      .projects

  const portfolio = []

  githubProjects.forEach(
    (repository) => {
      const resumeProject =
        resumeProjects.find(
          (project) =>
            project.name
              .toLowerCase()
              .includes(
                repository.name.toLowerCase()
              )
        )

      let score = repository.score

      const reasons = [
        ...(repository.reasons ||
          []),
      ]

      if (resumeProject) {
        score += 10

        reasons.push(
          'Appears on resume'
        )

        if (resumeProject.demo) {
          score += 10

          reasons.push(
            'Live demo available'
          )
        }

        if (
          resumeProject.github
        ) {
          score += 5

          reasons.push(
            'GitHub linked on resume'
          )
        }

        score += Math.round(
          resumeProject
            .complexity * 0.1
        )

        reasons.push(
          'High project complexity'
        )
      } else {
        score -= 15

        reasons.push(
          'Not mentioned on resume'
        )
      }

      score = Math.max(
        0,
        Math.min(100, score)
      )

      portfolio.push({
        name:
          repository.name,

        score,

        github:
          repository.url,

        resume:
          !!resumeProject,

        language:
          repository.language,

        reasons,
      })
    }
  )

  portfolio.sort(
    (a, b) =>
      b.score - a.score
  )

  const strongestProject =
    portfolio[0] || null

  const weakestProject =
    portfolio[
      portfolio.length - 1
    ] || null

  const projectsMissingFromResume =
    portfolio.filter(
      (project) =>
        !project.resume
    )

  const recommendations = []

  if (
    strongestProject
  ) {
    recommendations.push(
      `Feature "${strongestProject.name}" as your primary portfolio project.`
    )
  }

  if (
    projectsMissingFromResume.length
  ) {
    recommendations.push(
      `${projectsMissingFromResume.length} GitHub repositories are missing from your resume.`
    )
  }

  if (
    weakestProject &&
    weakestProject.score < 45
  ) {
    recommendations.push(
      `Improve or archive "${weakestProject.name}".`
    )
  }

  return {
    tool:
      'PortfolioEvaluationTool',

    status: 'success',

    timestamp: Date.now(),

    data: {
      portfolio,

      strongestProject,

      weakestProject,

      projectsMissingFromResume,

      recommendations,
    },
  }
}