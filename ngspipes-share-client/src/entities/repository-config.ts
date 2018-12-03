export class Config {
    constructor(
        public name : string,
        public value : string,
        public hidden : boolean
    ) { }
}

export class RepositoryConfig {
    constructor(
        public repositoryName : string,
        public description : string,
        public configs : Config[]
    ) { }
}
