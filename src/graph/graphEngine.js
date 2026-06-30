import {
  NODE_TYPES,
  EDGE_TYPES,
} from './graphTypes'

import {
  createNode,
  createEdge,
  findSkill,
} from './graphHelpers'

export function buildKnowledgeGraph(
  digitalDNA
) {
  const nodes = []

  const edges = []

  //---------------------------------
  // Skill Nodes
  //---------------------------------

  digitalDNA.skills.forEach(
    (skill) => {
      nodes.push(
        createNode(
          `skill-${skill.id}`,
          NODE_TYPES.SKILL,
          skill
        )
      )
    }
  )

  //---------------------------------
  // Project Nodes
  //---------------------------------

  digitalDNA.projects.forEach(
    (project) => {
      nodes.push(
        createNode(
          `project-${project.id}`,
          NODE_TYPES.PROJECT,
          project
        )
      )

      //---------------------------------
      // Connections
      //---------------------------------

      project.technologies.forEach(
        (tech) => {
          const skill =
            findSkill(
              digitalDNA.skills,
              tech
            )

          if (!skill) return

          edges.push(
            createEdge(
              `skill-${skill.id}`,
              `project-${project.id}`,
              EDGE_TYPES.USES
            )
          )
        }
      )
    }
  )

  //---------------------------------
  // Goals
  //---------------------------------

  digitalDNA.goals.forEach(
    (goal, index) => {
      nodes.push(
        createNode(
          `goal-${index}`,
          NODE_TYPES.GOAL,
          goal
        )
      )
    }
  )

  return {
    nodes,
    edges,
  }
}