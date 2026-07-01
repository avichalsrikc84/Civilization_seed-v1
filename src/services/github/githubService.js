const BASE_URL = 'https://api.github.com'

async function request(endpoint) {
  const response = await fetch(
    `${BASE_URL}${endpoint}`
  )

  if (!response.ok) {
    throw new Error(
      `GitHub API Error (${response.status})`
    )
  }

  return response.json()
}

export async function fetchProfile(username) {
  return request(`/users/${username}`)
}

export async function fetchRepositories(
  username
) {
  return request(
    `/users/${username}/repos?per_page=100&sort=updated`
  )
}