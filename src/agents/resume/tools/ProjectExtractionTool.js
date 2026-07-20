const TECHNOLOGIES = [
  'React',
  'Next.js',
  'Vue',
  'Angular',
  'Three.js',
  'React Three Fiber',
  'Node.js',
  'Express',
  'Python',
  'Java',
  'C++',
  'SQL',
  'MongoDB',
  'PostgreSQL',
  'Power BI',
  'Tableau',
  'TensorFlow',
  'PyTorch',
  'Scikit-learn',
  'LangChain',
  'OpenAI',
  'Docker',
  'AWS',
  'Azure',
  'GCP',
  'Streamlit',
  'Flask',
  'FastAPI',
]

const DOMAINS = {
  AI: [
    'llm',
    'chatbot',
    'rag',
    'ai',
    'machine learning',
    'deep learning',
    'nlp',
  ],

  Web: [
    'website',
    'web',
    'frontend',
    'backend',
    'react',
    'next',
  ],

  Data: [
    'dashboard',
    'analytics',
    'power bi',
    'tableau',
    'visualization',
    'data',
  ],

  Mobile: [
    'android',
    'ios',
    'flutter',
    'react native',
  ],

  Game: [
    'unity',
    'unreal',
    'game',
  ],

  Visualization: [
    'three.js',
    '3d',
    'visualizer',
    'render',
    'shader',
  ],
}

export async function ProjectExtractionTool(
  resumeDocument
) {
  if (!resumeDocument) {
    return {
      tool: 'ProjectExtractionTool',

      status: 'failed',

      timestamp: Date.now(),

      error: 'Resume document missing',

      data: null,
    }
  }

  const section =
    resumeDocument.sections.projects

  if (!section) {
    return {
      tool: 'ProjectExtractionTool',

      status: 'success',

      timestamp: Date.now(),

      data: resumeDocument,
    }
  }

  const lines = section
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  const projects = []

  let currentProject = null

  for (const line of lines) {
    if (
      line.length > 4 &&
      line.length < 70 &&
      !line.includes(':')
    ) {
      if (currentProject) {
        projects.push(currentProject)
      }

      currentProject = {
        name: line,

        description: '',

        technologies: [],

        github: null,

        demo: null,

        domain: 'General',

        complexity: 0,
      }

      continue
    }

    if (!currentProject) continue

    currentProject.description +=
      ' ' + line

    const lower =
      line.toLowerCase()

    // -----------------------
    // Technology Detection
    // -----------------------

    TECHNOLOGIES.forEach((tech) => {
      if (
        lower.includes(
          tech.toLowerCase()
        ) &&
        !currentProject.technologies.includes(
          tech
        )
      ) {
        currentProject.technologies.push(
          tech
        )
      }
    })

    // -----------------------
    // GitHub Link
    // -----------------------

    const github =
      line.match(
        /https?:\/\/github\.com\/[^\s]+/
      )

    if (github) {
      currentProject.github =
        github[0]
    }

    // -----------------------
    // Live Demo
    // -----------------------

    const demo =
      line.match(
        /https?:\/\/[^\s]+/
      )

    if (
      demo &&
      !demo[0].includes(
        'github'
      )
    ) {
      currentProject.demo =
        demo[0]
    }
  }

  if (currentProject) {
    projects.push(currentProject)
  }

  // ---------------------------------
  // AI Analysis
  // ---------------------------------

  projects.forEach((project) => {
    const description =
      project.description.toLowerCase()

    // Domain

    for (const [
      domain,
      keywords,
    ] of Object.entries(
      DOMAINS
    )) {
      if (
        keywords.some((keyword) =>
          description.includes(
            keyword
          )
        )
      ) {
        project.domain =
          domain

        break
      }
    }

    // Complexity

    let complexity = 40

    complexity +=
      project.technologies.length * 6

    if (project.github)
      complexity += 10

    if (project.demo)
      complexity += 10

    if (
      description.length > 250
    )
      complexity += 10

    project.complexity =
      Math.min(
        100,
        complexity
      )
  })

  resumeDocument.entities.projects =
    projects

  return {
    tool: 'ProjectExtractionTool',

    status: 'success',

    timestamp: Date.now(),

    data: resumeDocument,
  }
}