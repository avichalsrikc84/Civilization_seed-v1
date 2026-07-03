export default class BaseAgent{

    constructor(name){
        this.name=name
    }

    async execute(context){

        throw new Error(
            "execute() not implemented"
        )

    }

}