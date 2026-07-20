const SKILL_CATEGORIES = {
  Programming: [
    'Python',
    'Java',
    'C',
    'C++',
    'JavaScript',
    'TypeScript',
    'Go',
    'Rust',
    'PHP',
    'Kotlin',
    'Swift',
  ],

  Frontend: [
    'React',
    'Next.js',
    'Vue',
    'Angular',
    'HTML',
    'CSS',
    'Tailwind',
    'Bootstrap',
  ],

  Backend: [
    'Node.js',
    'Express',
    'Spring Boot',
    'Django',
    'Flask',
    'FastAPI',
  ],

  Database: [
    'SQL',
    'MySQL',
    'PostgreSQL',
    'MongoDB',
    'Redis',
    'Oracle',
    'SQLite',
  ],

  AI_ML: [
    'Machine Learning',
    'Deep Learning',
    'TensorFlow',
    'PyTorch',
    'Scikit-learn',
    'LangChain',
    'OpenAI',
    'LLM',
    'RAG',
    'NLP',
  ],

  Data: [
    'Power BI',
    'Tableau',
    'Excel',
    'Pandas',
    'NumPy',
    'Matplotlib',
    'Seaborn',
  ],

  Cloud: [
    'AWS',
    'Azure',
    'GCP',
    'Docker',
    'Kubernetes',
    'Terraform',
  ],

  Tools: [
    'Git',
    'GitHub',
    'Linux',
    'Jupyter',
    'VS Code',
    'Postman',
  ],
}

export async function SkillExtractionTool(
  resumeDocument
) {
  if (!resumeDocument) {
    return {
      tool: 'SkillExtractionTool',

      status: 'failed',

      timestamp: Date.now(),

      error: 'Resume document missing',

      data: null,
    }
  }

  const searchableText = [
    resumeDocument.rawText,

    resumeDocument.sections.skills,

    resumeDocument.sections.projects,

    resumeDocument.sections.experience,
  ]
    .join(' ')
    .toLowerCase()

  const extractedSkills = []

  for (const [
    category,
    skills,
  ] of Object.entries(
    SKILL_CATEGORIES
  )) {
    skills.forEach((skill) => {
      const regex = new RegExp(
        `\\b${skill.replace(
          '.',
          '\\.'
        )}\\b`,
        'gi'
      )

      const matches =
        searchableText.match(regex)

      if (!matches) return

      let confidence = 40

      const occurrences =
        matches.length

      confidence +=
        Math.min(
          occurrences * 10,
          30
        )

      if (
        resumeDocument.sections.skills
          .toLowerCase()
          .includes(
            skill.toLowerCase()
          )
      ) {
        confidence += 20
      }

      confidence = Math.min(
        confidence,
        100
      )

      extractedSkills.push({
        name: skill,

        category,

        confidence,

        occurrences,
      })
    })
  }

  extractedSkills.sort(
    (a, b) =>
      b.confidence -
      a.confidence
  )

  resumeDocument.entities.skills =
    extractedSkills

  return {
    tool: 'SkillExtractionTool',

    status: 'success',

    timestamp: Date.now(),

    data: resumeDocument,
  }
}