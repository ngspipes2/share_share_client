export enum InternalRepositoryType {
    TOOLS = "TOOLS",
    PIPELINES = "PIPELINES"
}

export class InternalRepository {
    constructor(
        public id : number,
        public type : InternalRepositoryType,
        public name : string,
        public description : string,
        public creationDate : Date,
        public isPublic : boolean,
        public ownerName : string,
        public location : string
    ) { }
}
