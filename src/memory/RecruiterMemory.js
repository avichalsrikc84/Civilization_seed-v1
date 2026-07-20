import AthenaMemory from './AthenaMemory'

const MEMORY_KEY = 'recruiter'

/**
 * Store Recruiter Intelligence
 */
export function writeRecruiterMemory(
  recruiterKnowledge
) {
  AthenaMemory.write(
    MEMORY_KEY,
    recruiterKnowledge
  )
}

/**
 * Read Recruiter Intelligence
 */
export function readRecruiterMemory() {
  return AthenaMemory.read(
    MEMORY_KEY
  )
}

/**
 * Check whether recruiter report exists
 */
export function hasRecruiterMemory() {
  return (
    readRecruiterMemory() !== null
  )
}

/**
 * Clear recruiter report
 */
export function clearRecruiterMemory() {
  AthenaMemory.clear(
    MEMORY_KEY
  )
}