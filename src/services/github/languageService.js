import request
from './githubClient'

export async function
getLanguages(
owner,
repo
){

return request(

`/repos/${owner}/${repo}/languages`

)

}