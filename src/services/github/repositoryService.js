import request
from './githubClient'

export async function
getRepositories(
  username
) {

  return request(

`/users/${username}/repos?per_page=100&sort=updated`

  )

}