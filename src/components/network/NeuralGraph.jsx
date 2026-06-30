import { useMemo } from 'react'

import SkillNode from './SkillNode'
import ProjectNode from './ProjectNode'
import NeuralConnections from './NeuralConnections'

import { useDigitalDNAStore } from '../../store/digitalDNAStore'

export default function NeuralGraph() {
  const skills = useDigitalDNAStore(
    (state) => state.skills
  )

  const projects = useDigitalDNAStore(
    (state) => state.projects
  )

  const relationships =
    useDigitalDNAStore(
      (state) => state.relationships
    )

  const graph = useMemo(() => {
    const lookup = {}

   const skillRadius = 3.3
const projectRadius = 3.3

    const skillNodes = skills.map(
      (skill, index) => {
const angle =
  -Math.PI / 2 +
  (index / (skills.length - 1)) *
    Math.PI

const position = [
  Math.cos(angle) * 2.8,

  2.0 +
    Math.sin(angle) * 1.0,

  Math.sin(angle) * 1.3,
]

        lookup[skill.name] =
          position

        return {
          type: 'skill',
          data: skill,
          position,
        }
      }
    )

    const projectNodes =
      projects.map(
        (
          project,
          index
        ) => {
         const angle =
  Math.PI / 2 +
  (index / (projects.length - 1)) *
    Math.PI

const position = [
  Math.cos(angle) * 2.8,

  -2.0 +
    Math.sin(angle) * 1.0,

  Math.sin(angle) * 1.3,
]

          lookup[
            project.name
          ] = position

          return {
            type: 'project',
            data: project,
            position,
          }
        }
      )

    const edges =
      relationships
        .map((relation) => ({
          start:
            lookup[
              relation.from
            ],

          end:
            lookup[
              relation.to
            ],
        }))
        .filter(
          (edge) =>
            edge.start &&
            edge.end
        )

    return {
      skillNodes,
      projectNodes,
      edges,
    }
  }, [
    skills,
    projects,
    relationships,
  ])

  return (
    <>
      <NeuralConnections
        edges={graph.edges}
      />

      {graph.skillNodes.map(
        (node) => (
          <SkillNode
            key={
              node.data.name
            }
            skill={node.data}
            position={
              node.position
            }
          />
        )
      )}

      {graph.projectNodes.map(
        (node) => (
          <ProjectNode
            key={
              node.data.id
            }
            project={node.data}
            position={
              node.position
            }
          />
        )
      )}
    </>
  )
}