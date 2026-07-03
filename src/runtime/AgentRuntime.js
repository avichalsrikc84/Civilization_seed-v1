import { executeAgent } from './AgentRegistry'

export async function runAgentRuntime(
  source
) {
  try {
    return await executeAgent(
      source
    )
  } catch (error) {
    console.error(error)
  }
}