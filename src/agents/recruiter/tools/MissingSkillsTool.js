import { readGitHubMemory } from '../../../memory/GitHubMemory'
import { readResumeMemory } from '../../../memory/ResumeMemory'

const BASELINE_SKILLS = {
  Programming: [
    'Python',
    'Java',
    'C++',
    'JavaScript',
    'SQL',
  ],

  Frontend: [
    'React',
    'HTML',
    'CSS',
  ],

  Backend: [
    'Node.js',
    'Express',
    'REST API',
  ],

  Database: [
    'PostgreSQL',
    'MongoDB',
  ],

  DevOps: [
    'Docker',
    'Git',
    'GitHub',
    'CI/CD',
  ],

  Cloud: [
    'AWS',
  ],

  Testing: [
    'Jest',
    'Unit Testing',
  ],

  CSFundamentals: [
    'DBMS',
    'Operating Systems',
    'Computer Networks',
    'OOP',
    'System Design',
  ],
}

export async function MissingSkillsTool() {
  const github =
    readGitHubMemory()

  const resume =
    readResumeMemory()

  if (!github || !resume) {
    return {
      tool: 'MissingSkillsTool',

      status: 'failed',

      timestamp: Date.now(),

      error:
        'Resume or GitHub memory unavailable',

      data: null,
    }
  }

  // ===========================
  // User Skills
  // ===========================

  const githubSkills =
    github.skills.data.skills.map(
      (skill) =>
        skill.skill.toLowerCase()
    )

  const resumeSkills =
    resume.document.entities.skills.map(
      (skill) =>
        skill.name.toLowerCase()
    )

  const userSkills = new Set([
    ...githubSkills,
    ...resumeSkills,
  ])

  // ===========================
  // Skill Analysis
  // ===========================

  const missing = []

  const present = []

  Object.entries(BASELINE_SKILLS)
    .forEach(
      ([category, skills]) => {

        skills.forEach((skill) => {

          if (
            userSkills.has(
              skill.toLowerCase()
            )
          ) {

            present.push({

              category,

              skill,

            })

          } else {

            missing.push({

              category,

              skill,

              priority:
                getPriority(
                  category
                ),

            })

          }

        })

      }
    )

  // ===========================
  // Sort by Priority
  // ===========================

  missing.sort(
    (a, b) =>
      b.priority -
      a.priority
  )

  // ===========================
  // Recommendations
  // ===========================

  const recommendations = []

  const topFive =
    missing.slice(0, 5)

  topFive.forEach(
    (skill) => {

      recommendations.push(
        `Learn ${skill.skill}`
      )

    }
  )

  return {

    tool:
      'MissingSkillsTool',

    status: 'success',

    timestamp:
      Date.now(),

    data: {

      totalKnownSkills:
        present.length,

      totalMissingSkills:
        missing.length,

      presentSkills:
        present,

      missingSkills:
        missing,

      topPrioritySkills:
        topFive,

      recommendations,

    },

  }
}

function getPriority(
  category
) {
  switch (category) {

    case 'Programming':
      return 10

    case 'Backend':
      return 9

    case 'Database':
      return 8

    case 'DevOps':
      return 8

    case 'Cloud':
      return 7

    case 'Testing':
      return 7

    case 'CSFundamentals':
      return 10

    case 'Frontend':
      return 8

    default:
      return 5

  }
}