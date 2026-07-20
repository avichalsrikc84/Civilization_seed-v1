import request
from './githubClient'

export async function
getProfile(username) {

  return request(
    `/users/${username}`
  )

}