import AthenaMemory
from './AthenaMemory'

export function writeGitHubMemory(
intelligence
){

AthenaMemory.write(

'github',

intelligence

)

}

export function readGitHubMemory(){

return AthenaMemory.read(
'github'
)

}