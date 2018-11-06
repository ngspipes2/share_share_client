export class Config {
    constructor(
        public name : string,
        public value : string,
        public hidden : boolean
    ) { }
}

export class RepositoryConfig {
    constructor(
        public name : string,
        public description : string,
        public location : string,
        public configs : Config[]
    ) { }
}
