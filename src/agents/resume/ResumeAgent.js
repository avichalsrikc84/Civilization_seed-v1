import { parseResume } from '../../services/resume/pdfParser'

import { ResumeParserTool } from './tools/ResumeParserTool'
import { SkillExtractionTool } from './tools/SkillExtractionTool'
import { ProjectExtractionTool } from './tools/ProjectExtractionTool'
import { ExperienceExtractionTool } from './tools/ExperienceExtractionTool'
import { ATSAnalyzerTool } from './tools/ATSAnalyzerTool'

import { analyzeResume } from './ResumeAnalyzer'

import {
  writeResumeMemory,
  readResumeMemory,
} from '../../memory/ResumeMemory'

export async function runResumeAgent(
  file
) {
  try {
    console.log(
      '📄 Athena Resume Agent Started'
    )

    // =====================================
    // STEP 1
    // Parse PDF
    // =====================================

    const parsedResume =
      await parseResume(file)

    // =====================================
    // STEP 2
    // Build Resume Document
    // =====================================

    const parserResult =
      await ResumeParserTool(
        parsedResume
      )

    let resumeDocument =
      parserResult.data

    // =====================================
    // STEP 3
    // Skill Extraction
    // =====================================

    const skillResult =
      await SkillExtractionTool(
        resumeDocument
      )

    resumeDocument =
      skillResult.data

    // =====================================
    // STEP 4
    // Project Extraction
    // =====================================

    const projectResult =
      await ProjectExtractionTool(
        resumeDocument
      )

    resumeDocument =
      projectResult.data

    // =====================================
    // STEP 5
    // Experience Extraction
    // =====================================

    const experienceResult =
      await ExperienceExtractionTool(
        resumeDocument
      )

    resumeDocument =
      experienceResult.data

    // =====================================
    // STEP 6
    // ATS Analysis
    // =====================================

    const atsResult =
      await ATSAnalyzerTool(
        resumeDocument
      )

    resumeDocument =
      atsResult.data

    // =====================================
    // STEP 7
    // Resume Intelligence
    // =====================================

    const intelligence =
      await analyzeResume({

        parser:
          parserResult,

        skills:
          skillResult,

        projects:
          projectResult,

        experience:
          experienceResult,

        ats:
          atsResult,

      })

    // =====================================
    // STEP 8
    // Final Knowledge Object
    // =====================================

    const resumeKnowledge = {

      document:
        resumeDocument,

      parser:
        parserResult,

      skills:
        skillResult,

      projects:
        projectResult,

      experience:
        experienceResult,

      ats:
        atsResult,

      intelligence,

      analyzedAt:
        new Date().toISOString(),
    }

    // =====================================
    // STEP 9
    // Store in Athena Memory
    // =====================================

    writeResumeMemory(
      resumeKnowledge
    )

    console.log(
      '✅ Resume Memory Updated'
    )

    // =====================================
    // STEP 10
    // Return Memory
    // =====================================

    return readResumeMemory()

  } catch (error) {

    console.error(
      '❌ Resume Agent Failed',
      error
    )

    throw error
  }
}