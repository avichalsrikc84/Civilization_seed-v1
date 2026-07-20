import { createResumeDocument } from '../ResumeDocument'

export async function ResumeParserTool(
  parsedResume
) {
  if (!parsedResume?.rawText) {
    return {
      tool: 'ResumeParserTool',

      status: 'failed',

      timestamp: Date.now(),

      error: 'Resume text not found',

      data: null,
    }
  }

  const document =
    createResumeDocument(
      parsedResume.rawText
    )

  const text =
    parsedResume.rawText

  // ==========================
  // Profile Information
  // ==========================

  const email =
    text.match(
      /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi
    )

  const phone =
    text.match(
      /(\+?\d[\d\s\-]{8,15})/
    )

  const linkedin =
    text.match(
      /https?:\/\/(www\.)?linkedin\.com\/[^\s]+/i
    )

  const github =
    text.match(
      /https?:\/\/(www\.)?github\.com\/[^\s]+/i
    )

  const portfolio =
    text.match(
      /https?:\/\/[^\s]+/g
    )

  document.profile.email =
    email?.[0] || null

  document.profile.phone =
    phone?.[0] || null

  document.profile.linkedin =
    linkedin?.[0] || null

  document.profile.github =
    github?.[0] || null

  document.profile.portfolio =
    portfolio?.find(
      (url) =>
        !url.includes(
          'linkedin'
        ) &&
        !url.includes('github')
    ) || null

  // ==========================
  // Section Extraction
  // ==========================

  document.sections.summary =
    extractSection(
      text,
      [
        'summary',
        'profile',
        'objective',
      ],
      [
        'education',
        'skills',
        'experience',
        'projects',
      ]
    )

  document.sections.education =
    extractSection(
      text,
      [
        'education',
        'academic',
      ],
      [
        'skills',
        'projects',
        'experience',
        'certifications',
      ]
    )

  document.sections.skills =
    extractSection(
      text,
      [
        'skills',
        'technical skills',
      ],
      [
        'projects',
        'experience',
        'education',
      ]
    )

  document.sections.projects =
    extractSection(
      text,
      [
        'projects',
        'personal projects',
      ],
      [
        'experience',
        'education',
        'certifications',
      ]
    )

  document.sections.experience =
    extractSection(
      text,
      [
        'experience',
        'work experience',
      ],
      [
        'education',
        'projects',
        'certifications',
      ]
    )

  document.sections.certifications =
    extractSection(
      text,
      [
        'certifications',
        'certificates',
      ],
      [
        'skills',
        'projects',
        'education',
      ]
    )

  return {
    tool: 'ResumeParserTool',

    status: 'success',

    timestamp: Date.now(),

    data: document,
  }
}

/* ======================================
Helper
====================================== */

function extractSection(
  text,
  startKeywords,
  endKeywords
) {
  const lower =
    text.toLowerCase()

  let start = -1

  for (const keyword of startKeywords) {
    const index =
      lower.indexOf(keyword)

    if (index !== -1) {
      start = index
      break
    }
  }

  if (start === -1) {
    return ''
  }

  let end = text.length

  for (const keyword of endKeywords) {
    const index =
      lower.indexOf(
        keyword,
        start + 1
      )

    if (
      index !== -1 &&
      index < end
    ) {
      end = index
    }
  }

  return text
    .substring(start, end)
    .trim()
}