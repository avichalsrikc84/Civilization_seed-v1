const EXPERIENCE_KEYWORDS = {
  Internship: [
    'intern',
    'internship',
    'trainee',
  ],

  FullTime: [
    'software engineer',
    'developer',
    'analyst',
    'engineer',
    'consultant',
  ],

  Freelance: [
    'freelance',
    'contract',
  ],

  Research: [
    'research',
    'research assistant',
  ],
}

const TECH_STACK = [
  'Python',
  'Java',
  'C++',
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Express',
  'SQL',
  'MongoDB',
  'PostgreSQL',
  'Power BI',
  'Tableau',
  'TensorFlow',
  'PyTorch',
  'Scikit-learn',
  'LangChain',
  'Docker',
  'AWS',
  'Azure',
  'Git',
  'GitHub',
]

export async function ExperienceExtractionTool(
  resumeDocument
) {
  if (!resumeDocument) {
    return {
      tool: 'ExperienceExtractionTool',

      status: 'failed',

      timestamp: Date.now(),

      error: 'Resume document missing',

      data: null,
    }
  }

  const section =
    resumeDocument.sections.experience

  if (!section) {
    return {
      tool: 'ExperienceExtractionTool',

      status: 'success',

      timestamp: Date.now(),

      data: resumeDocument,
    }
  }

  const lines = section
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  const experiences = []

  let current = null

  for (const line of lines) {
    // Detect new experience heading
    if (
      line.length > 5 &&
      line.length < 80 &&
      !line.startsWith('-') &&
      !line.startsWith('•')
    ) {
      if (current) {
        experiences.push(current)
      }

      current = {
        role: line,

        company: null,

        duration: null,

        type: 'Unknown',

        description: '',

        technologies: [],

        achievements: [],

        maturityScore: 0,
      }

      continue
    }

    if (!current) continue

    current.description +=
      ' ' + line

    // Company
    if (
      !current.company &&
      line.includes('|')
    ) {
      const parts =
        line.split('|')

      current.company =
        parts[0].trim()

      current.duration =
        parts[1]?.trim() || null
    }

    // Bullet achievements
    if (
      line.startsWith('-') ||
      line.startsWith('•')
    ) {
      current.achievements.push(
        line.replace(/^[-•]/, '').trim()
      )
    }

    // Technologies
    TECH_STACK.forEach((tech) => {
      if (
        line
          .toLowerCase()
          .includes(
            tech.toLowerCase()
          ) &&
        !current.technologies.includes(
          tech
        )
      ) {
        current.technologies.push(
          tech
        )
      }
    })
  }

  if (current) {
    experiences.push(current)
  }

  // ---------------------------
  // AI Analysis
  // ---------------------------

  experiences.forEach((exp) => {
    const text =
      (
        exp.role +
        ' ' +
        exp.description
      ).toLowerCase()

    for (const [
      type,
      keywords,
    ] of Object.entries(
      EXPERIENCE_KEYWORDS
    )) {
      if (
        keywords.some((keyword) =>
          text.includes(keyword)
        )
      ) {
        exp.type = type
        break
      }
    }

    let score = 30

    score +=
      exp.technologies.length * 6

    score +=
      exp.achievements.length * 8

    if (exp.company)
      score += 10

    if (exp.duration)
      score += 10

    exp.maturityScore =
      Math.min(
        100,
        score
      )
  })

  resumeDocument.entities.experience =
    experiences

  return {
    tool: 'ExperienceExtractionTool',

    status: 'success',

    timestamp: Date.now(),

    data: resumeDocument,
  }
}