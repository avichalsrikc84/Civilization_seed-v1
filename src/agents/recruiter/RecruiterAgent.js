import {
  ResumeGitHubConsistencyTool,
} from './tools/ResumeGitHubConsistencyTool'

import {
  PortfolioEvaluationTool,
} from './tools/PortfolioEvaluationTool'

import {
  HiringScoreTool,
} from './tools/HiringScoreTool'

import {
  MissingSkillsTool,
} from './tools/MissingSkillsTool'

import {
  analyzeRecruiter,
} from './RecruiterAnalyzer'

import {
  writeRecruiterMemory,
  readRecruiterMemory,
} from '../../memory/RecruiterMemory'

export async function runRecruiterAgent() {
  try {
    console.log(
      '🧑‍💼 Athena Recruiter Agent Started'
    )

    // ==========================================
    // STEP 1
    // Resume ↔ GitHub Consistency
    // ==========================================

    const consistencyResult =
      await ResumeGitHubConsistencyTool()

    // ==========================================
    // STEP 2
    // Portfolio Evaluation
    // ==========================================

    const portfolioResult =
      await PortfolioEvaluationTool()

    // ==========================================
    // STEP 3
    // Hiring Score
    // ==========================================

    const hiringScoreResult =
      await HiringScoreTool({

        consistency:
          consistencyResult,

        portfolio:
          portfolioResult,

      })

    // ==========================================
    // STEP 4
    // Missing Skills
    // ==========================================

    const missingSkillsResult =
      await MissingSkillsTool()

    // ==========================================
    // STEP 5
    // Recruiter Intelligence
    // ==========================================

    const recruiterAnalysis =
      await analyzeRecruiter({

        consistency:
          consistencyResult,

        portfolio:
          portfolioResult,

        hiringScore:
          hiringScoreResult,

        missingSkills:
          missingSkillsResult,

      })

    // ==========================================
    // STEP 6
    // Final Knowledge Object
    // ==========================================

    const recruiterKnowledge = {

      consistency:
        consistencyResult,

      portfolio:
        portfolioResult,

      hiringScore:
        hiringScoreResult,

      missingSkills:
        missingSkillsResult,

      intelligence:
        recruiterAnalysis,

      analyzedAt:
        new Date().toISOString(),

    }

    // ==========================================
    // STEP 7
    // Save To Athena Memory
    // ==========================================

    writeRecruiterMemory(
      recruiterKnowledge
    )

    console.log(
      '✅ Recruiter Memory Updated'
    )

    // ==========================================
    // STEP 8
    // Return Memory
    // ==========================================

    return readRecruiterMemory()

  } catch (error) {

    console.error(
      '❌ Recruiter Agent Failed',
      error
    )

    throw error

  }
}