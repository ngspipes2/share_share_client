export enum InternalRepositoryType {
    TOOLS = "TOOLS",
    PIPELINES = "PIPELINES"
}

export class InternalRepository {
    constructor(
        public repositoryName : string,
        public type : InternalRepositoryType,
        public description : string,
        public creationDate : Date,
        public isPublic : boolean,
        public ownerName : string,
        public location : string
    ) { }
}
