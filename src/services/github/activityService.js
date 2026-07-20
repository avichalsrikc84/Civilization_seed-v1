import request
from './githubClient'

export async function
getActivity(
  username
){

return request(

`/users/${username}/events/public`

)

}