export function createResumeDocument(
  rawText = ''
) {
  return {
    // =====================
    // Original Resume
    // =====================

    rawText,

    metadata: {
      parsedAt:
        new Date().toISOString(),

      parserVersion: '1.0',
    },

    // =====================
    // Basic Information
    // =====================

    profile: {
      name: null,

      email: null,

      phone: null,

      location: null,

      linkedin: null,

      github: null,

      portfolio: null,
    },

    // =====================
    // Resume Sections
    // =====================

    sections: {
      summary: '',

      education: '',

      experience: '',

      projects: '',

      skills: '',

      certifications: '',
    },

    // =====================
    // Extracted Intelligence
    // =====================

    entities: {
      skills: [],

      projects: [],

      education: [],

      experience: [],

      certifications: [],
    },

    // =====================
    // ATS Results
    // =====================

    ats: {
      score: 0,

      strengths: [],

      weaknesses: [],

      recommendations: [],
    },
  }
}