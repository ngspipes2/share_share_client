export enum EntityType {
    TOOLS = "TOOLS",
    PIPELINES = "PIPELINES"
}

export enum LocationType {
    INTERNAL = "INTERNAL",
    EXTERNAL = "EXTERNAL"
}

export class Repository {
    constructor(
        public repositoryName : string,
        public entityType : EntityType,
        public locationType : LocationType,
        public description : string,
        public creationDate : Date,
        public isPublic : boolean,
        public ownerName : string,
        public location : string
    ) { }
}
