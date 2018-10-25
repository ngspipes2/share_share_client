export enum ExternalRepositoryType {
    TOOLS = "TOOLS",
    PIPELINES = "PIPELINES"
}

export class ExternalRepository {
    constructor(
        public id : number,
        public type : ExternalRepositoryType,
        public name : string,
        public description : string,
        public publishDate : Date,
        public publisherName : string,
        public location : string
    ) { }
}
