import { getProfile } from '../../services/github/profileService'
import { getRepositories } from '../../services/github/repositoryService'
import { getActivity } from '../../services/github/activityService'
import { getLanguages } from '../../services/github/languageService'

import { ProfileTool } from './tools/ProfileTool'
import { RepositoryTool } from './tools/RepositoryTool'
import { LanguageTool } from './tools/LanguageTool'
import { ActivityTool } from './tools/ActivityTool'
import { SkillInferenceTool } from './tools/SkillInferenceTool'
import { RepositoryRankingTool } from './tools/RepositoryRankingTool'

import { analyzeGitHub } from './GitHubAnalyzer'

import {
  writeGitHubMemory,
  readGitHubMemory,
} from '../../memory/GitHubMemory'

export async function runGitHubAgent(
  username
) {
  try {
    console.log(
      '🚀 Athena GitHub Agent Started'
    )

    // ====================================
    // STEP 1 : FETCH RAW DATA
    // ====================================

    const [
      profile,
      repositories,
      events,
    ] = await Promise.all([
      getProfile(username),
      getRepositories(username),
      getActivity(username),
    ])

    // ====================================
    // STEP 2 : RUN TOOLS
    // ====================================

    const profileResult =
      await ProfileTool(profile)

    const repositoryResult =
      await RepositoryTool(
        repositories
      )

    const languageResult =
      await LanguageTool(
        repositories,
        getLanguages
      )

    const activityResult =
      await ActivityTool(events)

    const skillResult =
      await SkillInferenceTool({
        repositories:
          repositoryResult.data,

        languages:
          languageResult.data,
      })

    const rankingResult =
      await RepositoryRankingTool(
        repositories
      )

    // ====================================
    // STEP 3 : ANALYZE
    // ====================================

    const intelligence =
      await analyzeGitHub({
        profile:
          profileResult,

        repositories:
          repositoryResult,

        languages:
          languageResult,

        activity:
          activityResult,
      })

    // ====================================
    // STEP 4 : BUILD KNOWLEDGE OBJECT
    // ====================================

    const githubKnowledge = {
      profile:
        profileResult,

      repositories:
        repositoryResult,

      languages:
        languageResult,

      activity:
        activityResult,

      skills:
        skillResult,

      ranking:
        rankingResult,

      intelligence,

      analyzedAt:
        new Date().toISOString(),
    }

    // ====================================
    // STEP 5 : WRITE TO MEMORY
    // ====================================

    writeGitHubMemory(
      githubKnowledge
    )

    console.log(
      '✅ GitHub Memory Updated'
    )

    // ====================================
    // STEP 6 : RETURN MEMORY
    // ====================================

    return readGitHubMemory()
  } catch (error) {
    console.error(
      '❌ GitHub Agent Failed',
      error
    )

    throw error
  }
}