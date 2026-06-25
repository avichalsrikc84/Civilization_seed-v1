import { create } from 'zustand'

export const useDigitalDNAStore =
  create(() => ({
    profile: {
      name: 'Avichal',

      role:
        'Aspiring Data Analyst',

      readiness: 78,
    },

    skills: [
      {
        name: 'Python',
        level: 85,
        category: 'Programming',
      },

      {
        name: 'SQL',
        level: 82,
        category: 'Data',
      },

      {
        name: 'Power BI',
        level: 90,
        category: 'Analytics',
      },

      {
        name: 'Machine Learning',
        level: 78,
        category: 'AI',
      },

      {
        name: 'React',
        level: 65,
        category: 'Frontend',
      },

      {
        name: 'Three.js',
        level: 60,
        category: 'Frontend',
      },
    ],

    projects: [
      {
        id: 1,
        name: 'Galaxy Visualizer',
        score: 92,
        category: 'Visualization',
        color: '#8b5cf6',
      },

      {
        id: 2,
        name: 'EV Prediction',
        score: 85,
        category: 'Machine Learning',
        color: '#22c55e',
      },

      {
        id: 3,
        name: 'Health Dashboard',
        score: 82,
        category: 'Analytics',
        color: '#06b6d4',
      },

      {
        id: 4,
        name: 'Medical Chatbot',
        score: 88,
        category: 'AI',
        color: '#f97316',
      },
    ],

    goals: [
      {
        name:
          'Data Analyst',
        readiness: 78,
      },

      {
        name: 'SDE',
        readiness: 63,
      },
    ],

    weaknesses: [
      'Advanced SQL',
      'Statistics',
      'System Design',
    ],
  }))