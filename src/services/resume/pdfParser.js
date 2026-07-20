import * as pdfjsLib from 'pdfjs-dist'

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString()

export async function parseResume(file) {
  if (!file) {
    throw new Error('Resume file is required.')
  }

  const buffer = await file.arrayBuffer()

  const pdf = await pdfjsLib.getDocument({
    data: buffer,
  }).promise

  let text = ''

  for (
    let pageNumber = 1;
    pageNumber <= pdf.numPages;
    pageNumber++
  ) {
    const page =
      await pdf.getPage(pageNumber)

    const content =
      await page.getTextContent()

    const pageText =
      content.items
        .map((item) => item.str)
        .join(' ')

    text += pageText + '\n'
  }

  return {
    fileName: file.name,

    pageCount: pdf.numPages,

    rawText: text.trim(),
  }
}