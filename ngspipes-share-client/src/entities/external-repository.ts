export enum ExternalRepositoryType {
    TOOLS = "TOOLS",
    PIPELINES = "PIPELINES"
}

export class ExternalRepository {
    constructor(
        public repositoryName : string,
        public type : ExternalRepositoryType,
        public description : string,
        public publishDate : Date,
        public publisherName : string,
        public location : string
    ) { }
}
