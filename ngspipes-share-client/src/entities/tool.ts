export class Tool {

    constructor(
        public name : string,
        public author : string,
        public description : string,
        public version : string,
        public documentation : string[],
        public commands : Command[],
        public executionContexts : ExecutionContext[],
        public logo : any[]
    ){}

}

export class Command {

    constructor(
        public name : string,
        public description : string,
        public recommendedMemory : number,
        public recommendedDisk : number,
        public recommendedCpu : number,
        public parameters : Parameter[],
        public outputs : Output[],
        public command : string
    ){}

}

export class Parameter {

    constructor(
        public name : string,
        public description : string,
        public values : string[],
        public type : string,
        public required : boolean,
        public prefix : string,
        public suffix : string,
        public separator : string,
        public depends : string,
        public dependentValues : string[],
        public subParameters : Parameter[]
    ){}

}

export class Output {

    constructor(
        public type : string,
        public name : string,
        public description : string,
        public value : string
    ){}

}

export class ExecutionContext {

    constructor(
        public name : string,
        public context : string,
        public config : object
    ){}

}
