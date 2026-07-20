class AthenaMemory {

    constructor(){

        this.memory={

            github:null,

            resume:null,

            linkedin:null,

            recruiter:null,

            career:null,

            interview:null

        }

    }

    write(section,data){

        this.memory[section]={

            timestamp:Date.now(),

            data

        }

    }

    read(section){

        return this.memory[section]

    }

    clear(section){

        this.memory[section]=null

    }

    clearAll(){

        Object.keys(this.memory)
        .forEach(key=>{

            this.memory[key]=null

        })

    }

}

export default new AthenaMemory()