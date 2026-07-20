const INTENT_PATTERNS = [
  // ===========================
  // GitHub
  // ===========================

  {
    intent: "github.analyze",
    agent: "github",
    action: "analyze",
    patterns: [
      /analyze (my )?github/i,
      /analyse (my )?github/i,
      /review (my )?github/i,
      /check (my )?github/i,
      /github analysis/i,
      /github profile/i,
    ],
  },

  {
    intent: "github.repositories",
    agent: "github",
    action: "repositories",
    patterns: [
      /show (my )?repositories/i,
      /list (my )?repositories/i,
      /my repos/i,
      /my github repos/i,
    ],
  },

  // ===========================
  // Resume
  // ===========================

  {
    intent: "resume.analyze",
    agent: "resume",
    action: "analyze",
    patterns: [
      /analyze (my )?resume/i,
      /review (my )?resume/i,
      /rate (my )?resume/i,
      /ats/i,
      /resume score/i,
    ],
  },

  // ===========================
  // Recruiter
  // ===========================

  {
    intent: "recruiter.evaluate",
    agent: "recruiter",
    action: "evaluate",
    patterns: [
      /would .* hire me/i,
      /am i hireable/i,
      /hiring score/i,
      /recruiter/i,
      /evaluate me/i,
    ],
  },

  // ===========================
  // Portfolio
  // ===========================

  {
    intent: "portfolio.bestProject",
    agent: "recruiter",
    action: "bestProject",
    patterns: [
      /best project/i,
      /strongest project/i,
      /which project/i,
      /top project/i,
    ],
  },
]

function extractUsername(text) {
  const match = text.match(/github\s+([a-zA-Z0-9-_]+)/i)

  if (!match) return null

  return match[1]
}

export function detectIntent(input) {
  const text = input.trim()

  for (const definition of INTENT_PATTERNS) {
    for (const pattern of definition.patterns) {
      if (pattern.test(text)) {
        return {
          success: true,

          intent: definition.intent,

          agent: definition.agent,

          action: definition.action,

          confidence: 0.98,

          entities: {
            username: extractUsername(text),
          },

          originalText: text,
        }
      }
    }
  }

  return {
    success: false,

    intent: "unknown",

    agent: null,

    action: null,

    confidence: 0,

    entities: {},

    originalText: text,
  }
}