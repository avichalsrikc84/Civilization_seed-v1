import AthenaMemory from './AthenaMemory'

const MEMORY_KEY = 'resume'

/**
 * Store analyzed resume in Athena Memory
 */
export function writeResumeMemory(
  resumeKnowledge
) {
  AthenaMemory.write(
    MEMORY_KEY,
    resumeKnowledge
  )
}

/**
 * Read analyzed resume
 */
export function readResumeMemory() {
  return AthenaMemory.read(
    MEMORY_KEY
  )
}

/**
 * Check if resume already exists
 */
export function hasResumeMemory() {
  return (
    readResumeMemory() !== null
  )
}

/**
 * Remove resume only
 */
export function clearResumeMemory() {
  AthenaMemory.clear(
    MEMORY_KEY
  )
}