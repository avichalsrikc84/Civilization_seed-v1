import {
  fetchProfile,
  fetchRepositories,
  fetchEvents,
} from '../../services/github/githubAPI'

import {
  analyzeGitHub,
} from './GitHubAnalyzer'

import { athenaBrain }
from '../../core/AthenaBrain'

import { memoryGraph }
from '../../core/MemoryGraph'

import { eventBus }
from '../../core/EventBus'

export async function runGitHubAgent(
  username
) {
  // Fetch all GitHub data in parallel
  const [
    profile,
    repositories,
    events,
  ] = await Promise.all([
    fetchProfile(username),
    fetchRepositories(username),
    fetchEvents(username),
  ])

  // Generate intelligence
  const intelligence =
    analyzeGitHub(
      profile,
      repositories,
      events
    )

  // ==========================
  // ATHENA BRAIN
  // ==========================

  athenaBrain.remember(
    'github',
    intelligence
  )

  // ==========================
  // MEMORY GRAPH
  // ==========================

  intelligence
    .strongestTechnologies
    ?.forEach((tech) => {
      memoryGraph.add(
        'github',
        tech
      )
    })

  // Store developer DNA as well
  memoryGraph.add(
    'github',
    intelligence.developerDNA
  )

  // ==========================
  // EVENT BUS
  // ==========================

  eventBus.publish(
    'github.updated',
    intelligence
  )

  return intelligence
}