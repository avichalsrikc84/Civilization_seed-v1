import { create } from 'zustand'

export const useDigitalDNAStore = create(() => ({
  // ======================================================
  // USER PROFILE
  // ======================================================

  profile: {
    name: 'Avichal',
    role: 'Aspiring Data Analyst',
    readiness: 78,
    avatar: null,
    location: 'India',
    experience: 'Student',
  },

  // ======================================================
  // SKILLS (GRAPH NODES)
  // ======================================================

  skills: [
    {
      id: 1,
      name: 'Python',
      category: 'Programming',
      level: 85,
      color: '#4FC3F7',
      icon: '🐍',
      relatedProjects: [1, 2, 4],
    },

    {
      id: 2,
      name: 'SQL',
      category: 'Database',
      level: 82,
      color: '#FBC02D',
      icon: '🗄️',
      relatedProjects: [2, 3],
    },

    {
      id: 3,
      name: 'Power BI',
      category: 'Analytics',
      level: 90,
      color: '#F9A825',
      icon: '📊',
      relatedProjects: [3],
    },

    {
      id: 4,
      name: 'Machine Learning',
      category: 'AI',
      level: 78,
      color: '#7E57C2',
      icon: '🧠',
      relatedProjects: [2, 4],
    },

    {
      id: 5,
      name: 'React',
      category: 'Frontend',
      level: 65,
      color: '#61DAFB',
      icon: '⚛️',
      relatedProjects: [1],
    },

    {
      id: 6,
      name: 'Three.js',
      category: '3D',
      level: 60,
      color: '#00E5FF',
      icon: '🌌',
      relatedProjects: [1],
    },
  ],

  // ======================================================
  // PROJECTS (GRAPH NODES)
  // ======================================================

  projects: [
    {
      id: 1,

      name: 'Galaxy Visualizer',

      category: 'Visualization',

      score: 92,

      color: '#8b5cf6',

      description:
        'Interactive 3D GitHub Universe built with React Three Fiber.',

      technologies: [
        'React',
        'Three.js',
        'JavaScript',
      ],

      difficulty: 95,

      impact: 92,

      github: '',

      demo: '',
    },

    {
      id: 2,

      name: 'EV Prediction',

      category: 'Machine Learning',

      score: 85,

      color: '#22c55e',

      description:
        'Machine Learning model predicting electric vehicle range.',

      technologies: [
        'Python',
        'Machine Learning',
        'SQL',
      ],

      difficulty: 86,

      impact: 88,

      github: '',

      demo: '',
    },

    {
      id: 3,

      name: 'Health Dashboard',

      category: 'Analytics',

      score: 82,

      color: '#06b6d4',

      description:
        'Interactive Power BI dashboard for healthcare insights.',

      technologies: [
        'Power BI',
        'SQL',
      ],

      difficulty: 74,

      impact: 80,

      github: '',

      demo: '',
    },

    {
      id: 4,

      name: 'Medical Chatbot',

      category: 'AI',

      score: 88,

      color: '#f97316',

      description:
        'LLM-powered healthcare chatbot using Retrieval-Augmented Generation.',

      technologies: [
        'Python',
        'Machine Learning',
      ],

      difficulty: 90,

      impact: 91,

      github: '',

      demo: '',
    },
  ],

  relationships: [
  {
    from: 'Python',
    to: 'Galaxy Visualizer',
  },
  {
    from: 'Python',
    to: 'Medical Chatbot',
  },
  {
    from: 'Python',
    to: 'EV Prediction',
  },

  {
    from: 'SQL',
    to: 'Health Dashboard',
  },
  {
    from: 'SQL',
    to: 'EV Prediction',
  },

  {
    from: 'Power BI',
    to: 'Health Dashboard',
  },

  {
    from: 'Machine Learning',
    to: 'Medical Chatbot',
  },
  {
    from: 'Machine Learning',
    to: 'EV Prediction',
  },

  {
    from: 'React',
    to: 'Galaxy Visualizer',
  },

  {
    from: 'Three.js',
    to: 'Galaxy Visualizer',
  },
],

  // ======================================================
  // CAREER GOALS
  // ======================================================

  goals: [
    {
      name: 'Data Analyst',
      readiness: 78,
    },

    {
      name: 'Software Engineer',
      readiness: 63,
    },
  ],

  // ======================================================
  // IMPROVEMENT AREAS
  // ======================================================

  weaknesses: [
    'Advanced SQL',
    'Statistics',
    'System Design',
  ],
}))