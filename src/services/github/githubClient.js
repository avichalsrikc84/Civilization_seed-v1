const BASE_URL =
  'https://api.github.com'

const TOKEN =
  import.meta.env
    .VITE_GITHUB_TOKEN

async function request(
  endpoint
) {
  const headers = {
    Accept:
      'application/vnd.github+json',
  }

  if (TOKEN) {
    headers.Authorization =
      `Bearer ${TOKEN}`
  }

  const response =
    await fetch(
      BASE_URL + endpoint,
      {
        headers,
      }
    )

  if (!response.ok) {
    throw new Error(
      `GitHub API Error: ${response.status}`
    )
  }

  return response.json()
}

export default request