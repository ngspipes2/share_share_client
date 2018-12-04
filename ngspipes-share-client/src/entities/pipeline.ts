export class Pipeline {

    public constructor(
        public name : string,
        public description : string,
        public author : string,
        public version : string,
        public documentation : string[],
        public logo : any[],
        public parameters : Parameter[],
        public outputs : Output[],
        public repositories : Repository[],
        public steps : Step[],
    ){}

}

export class Output {

    public constructor(
        public name : string,
        public stepId : string,
        public outputName : string
    ){}

}

export class Parameter {

    public constructor(
        public name : string,
        public defaultValue : object
    ){}

}

export enum RepositoryType {
    PIPELINES = "Pipeline",
    TOOLS = "Tool"
}

export class Repository {

    public constructor(
        public id : string,
        public location : string,
        public configuration : object,
        public type : RepositoryType
    ){}

}

export enum ValueType {
    PARAMETER = "Parameter",
    SIMPLE = "Simple"
}

export class Value {

    public constructor(
        public type : ValueType
    ){}

}

export class ParameterValue extends Value {

    public constructor(
        public parameterName : string
    ){
        super(ValueType.PARAMETER);
    }

}

export class SimpleValue extends Value {

    public constructor(
        public value : object
    ){
        super(ValueType.SIMPLE);
    }

}

export class Step {

    public constructor(
        public id : string,
        public exec : Exec,
        public executionContext : Value,
        public inputs : Input[],
        public spread : Spread
    ){}

}

export enum ExecType {
    COMMAND = "Command",
    PIPELINE = "Pipeline"
}

export class Exec {

    public constructor(
        public type : ExecType,
        public repositoryId : string
    ){}

}

export class CommandExec extends Exec {

    public constructor(
        public repositoryId : string,
        public toolName : string,
        public commandName : string
    ){
        super(ExecType.COMMAND, repositoryId);
    }

}

export class PipelineExec extends Exec {

    public constructor(
        public repositoryId : string,
        public pipelineName : string
    ){
        super(ExecType.PIPELINE, repositoryId);
    }

}

export enum InputType {
    CHAIN = "Chain",
    PARAMETER = "Parameter",
    SIMPLE = "Simple"
}

export class Input {

    public constructor(
        public type : InputType,
        public inputName : string
    ){}

}

export class ChainInput extends Input {

    public constructor(
        public inputName : string,
        public stepId : string,
        public outputName : string
    ){
        super(InputType.CHAIN, inputName);
    }

}

export class ParameterInput extends Input {

    public constructor(
        public inputName : string,
        public parameterName : string
    ){
        super(InputType.PARAMETER, inputName);
    }

}

export class SimpleInput extends Input {

    public constructor(
        public inputName : string,
        public value : object
    ){
        super(InputType.SIMPLE, inputName);
    }

}

export class Spread {

    public constructor(
        public inputsToSpread : string[],
        public strategy : Strategy
    ){}

}

export enum StrategyType {
    INPUT,
    ONE_TO_ONE,
    ONE_TO_MANY
}

export class Strategy {

    public constructor(
        public type : StrategyType
    ){}

}

export class InputStrategy extends Strategy {

    public constructor(
        public inputName : string
    ){
         super(StrategyType.INPUT);
    }

}

export class OneToOneStratey extends Strategy {

    public constructor(
        public firstStategy : Strategy,
        public secondStrategy : Strategy
    ){
        super(StrategyType.ONE_TO_ONE);
    }

}

export class OneToManyStrategy extends Strategy {

    public constructor(
        public firstStategy : Strategy,
        public secondStrategy : Strategy
    ){
        super(StrategyType.ONE_TO_MANY);
    }

}
