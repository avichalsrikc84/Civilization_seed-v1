const SKILL_RULES = [
  {
    skill: 'React',
    languages: ['JavaScript', 'TypeScript'],
    topics: ['react'],
    frameworks: ['react'],
  },

  {
    skill: 'Next.js',
    languages: ['JavaScript', 'TypeScript'],
    topics: ['nextjs', 'next.js'],
    frameworks: ['next'],
  },

  {
    skill: 'Three.js',
    languages: ['JavaScript'],
    topics: ['threejs', 'three.js', 'r3f'],
    frameworks: ['three'],
  },

  {
    skill: 'React Three Fiber',
    languages: ['JavaScript'],
    topics: ['r3f', 'react-three-fiber'],
    frameworks: ['@react-three/fiber'],
  },

  {
    skill: 'Python',
    languages: ['Python'],
    topics: [],
    frameworks: [],
  },

  {
    skill: 'Machine Learning',
    languages: ['Python'],
    topics: [
      'machine-learning',
      'ml',
      'ai',
      'deep-learning',
    ],
    frameworks: [
      'tensorflow',
      'pytorch',
      'scikit-learn',
    ],
  },

  {
    skill: 'SQL',
    languages: ['SQL'],
    topics: ['database'],
    frameworks: [],
  },

  {
    skill: 'Power BI',
    languages: [],
    topics: ['powerbi'],
    frameworks: [],
  },

  {
    skill: 'Docker',
    languages: [],
    topics: ['docker'],
    frameworks: ['docker'],
  },

  {
    skill: 'Node.js',
    languages: ['JavaScript'],
    topics: ['nodejs'],
    frameworks: ['node'],
  },
]

export async function SkillInferenceTool({
  repositories,
  languages,
}) {
  if (!repositories || !languages) {
    return {
      tool: 'SkillInferenceTool',
      status: 'failed',
      timestamp: Date.now(),
      error: 'Missing repository intelligence',
      data: null,
    }
  }

  const inferredSkills = []

  const languageMap =
    languages.languageDistribution.map(
      (l) => l.language
    )

  for (const rule of SKILL_RULES) {
    let score = 0

    // --------------------
    // Languages
    // --------------------

    rule.languages.forEach((lang) => {
      if (languageMap.includes(lang)) {
        score += 35
      }
    })

    // --------------------
    // Repository Topics
    // --------------------

    repositories.pinnedCandidates.forEach(
      (repo) => {
        const topics =
          repo.topics || []

        topics.forEach((topic) => {
          if (
            rule.topics.includes(
              topic.toLowerCase()
            )
          ) {
            score += 20
          }
        })
      }
    )

    // --------------------
    // Repository Name
    // --------------------

    repositories.pinnedCandidates.forEach(
      (repo) => {
        const name =
          repo.name.toLowerCase()

        rule.frameworks.forEach(
          (framework) => {
            if (
              name.includes(
                framework.toLowerCase()
              )
            ) {
              score += 10
            }
          }
        )
      }
    )

    score = Math.min(score, 100)

    if (score > 0) {
      inferredSkills.push({
        skill: rule.skill,
        confidence: score,
      })
    }
  }

  inferredSkills.sort(
    (a, b) =>
      b.confidence - a.confidence
  )

  return {
    tool: 'SkillInferenceTool',

    status: 'success',

    timestamp: Date.now(),

    data: {
      totalSkills:
        inferredSkills.length,

      skills: inferredSkills,
    },
  }
}