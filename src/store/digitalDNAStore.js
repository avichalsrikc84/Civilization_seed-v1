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
  // PROJECTS (PROJECT PHASE)
  // ======================================================

  projects: [
    {
      id: 1,

      name: 'Galaxy Visualizer',

      category: '3D Visualization',

      score: 98,

      color: '#38bdf8',

      description:
        'Interactive 3D universe that visualizes GitHub repositories as planets and civilizations.',

      stack: [
        'React',
        'Three.js',
        'React Three Fiber',
        'Next.js',
        'GitHub API',
        'Post Processing',
      ],

      github:
        'https://github.com/yourusername/galaxy',

      demo:
        'https://your-demo.com',

      recruiterNotes: [
        'Complex 3D Rendering',
        'Real-time Animations',
        'Custom Camera System',
        'Advanced UI/UX',
      ],
    },

    {
      id: 2,

      name: 'EV Prediction',

      category: 'Machine Learning',

      score: 92,

      color: '#22c55e',

      description:
        'Machine Learning model predicting EV driving range with dashboard visualization.',

      stack: [
        'Python',
        'Scikit-learn',
        'Pandas',
        'Power BI',
      ],

      github:
        'https://github.com/yourusername/ev',

      demo:
        'https://demo.com',

      recruiterNotes: [
        'Regression Modeling',
        'Feature Engineering',
        'Data Visualization',
      ],
    },

    {
      id: 3,

      name: 'Health Dashboard',

      category: 'Analytics',

      score: 90,

      color: '#06b6d4',

      description:
        'Interactive dashboard exploring health conditions across demographic groups.',

      stack: [
        'Power BI',
        'Excel',
        'SQL',
        'Python',
      ],

      github:
        'https://github.com/yourusername/dashboard',

      demo:
        'https://demo.com',

      recruiterNotes: [
        'Dashboard Design',
        'Business Analytics',
        'Data Storytelling',
      ],
    },

    {
      id: 4,

      name: 'Medical Chatbot',

      category: 'Generative AI',

      score: 94,

      color: '#f97316',

      description:
        'LLM-powered healthcare assistant using Retrieval-Augmented Generation.',

      stack: [
        'LangChain',
        'Python',
        'Streamlit',
        'Vector DB',
        'LLM',
      ],

      github:
        'https://github.com/yourusername/chatbot',

      demo:
        'https://demo.com',

      recruiterNotes: [
        'RAG Pipeline',
        'Prompt Engineering',
        'Vector Search',
      ],
    },
  ],

  // ======================================================
  // AI AGENTS (NETWORK PHASE)
  // ======================================================

  agents: [
    {
      id: 1,
      name: 'GitHub Agent',
      category: 'Repository Intelligence',
      score: 100,
      color: '#38bdf8',
      status: 'ONLINE',
      source: 'github',

      description:
        'Synchronizes repositories, commits and coding activity.',

      stack: [
        'Repositories',
        'Languages',
        'Stars',
        'Commits',
      ],

      recruiterNotes: [
        'Repository Analysis',
        'Contribution Tracking',
        'Language Detection',
      ],
    },

    {
      id: 2,
      name: 'LinkedIn Agent',
      category: 'Professional Identity',
      score: 100,
      color: '#0ea5e9',
      status: 'ONLINE',
      source: 'linkedin',

      description:
        'Monitors professional profile and networking.',

      stack: [
        'Connections',
        'Experience',
        'Headline',
        'Skills',
      ],

      recruiterNotes: [
        'Profile Optimization',
        'Professional Branding',
        'Networking',
      ],
    },

    {
      id: 3,
      name: 'Resume Agent',
      category: 'ATS Intelligence',
      score: 100,
      color: '#22c55e',
      status: 'ONLINE',
      source: 'resume',

      description:
        'Analyzes resume quality and ATS compatibility.',

      stack: [
        'ATS',
        'Keywords',
        'Formatting',
        'Experience',
      ],

      recruiterNotes: [
        'ATS Optimization',
        'Resume Review',
        'Keyword Analysis',
      ],
    },

    {
      id: 4,
      name: 'Recruiter Agent',
      category: 'Hiring Intelligence',
      score: 100,
      color: '#f59e0b',
      status: 'ONLINE',
      source: 'recruiter',

      description:
        'Evaluates hiring readiness using all connected agents.',

      stack: [
        'Portfolio',
        'Projects',
        'Technical',
        'Communication',
      ],

      recruiterNotes: [
        'Hiring Confidence',
        'Candidate Ranking',
        'Portfolio Review',
      ],
    },

    {
      id: 5,
      name: 'Interview Agent',
      category: 'AI Interview',
      score: 100,
      color: '#8b5cf6',
      status: 'READY',
      source: 'interview',

      description:
        'Runs adaptive technical and HR interview simulations.',

      stack: [
        'Technical',
        'Behavioral',
        'Voice',
        'Coding',
      ],

      recruiterNotes: [
        'Adaptive Interview',
        'AI Evaluation',
        'Interview Readiness',
      ],
    },

    {
      id: 6,
      name: 'Career Agent',
      category: 'Career Growth',
      score: 100,
      color: '#ec4899',
      status: 'ONLINE',
      source: 'career',

      description:
        'Creates personalized career roadmaps and learning recommendations.',

      stack: [
        'Roadmap',
        'Learning',
        'Recommendations',
        'Growth',
      ],

      recruiterNotes: [
        'Skill Gap Analysis',
        'Career Guidance',
        'Learning Path',
      ],
    },
  ],

  // ======================================================
  // SKILL RELATIONSHIPS
  // ======================================================

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