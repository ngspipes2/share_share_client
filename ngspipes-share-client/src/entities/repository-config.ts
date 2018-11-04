export class Config {
    constructor(
        public name : string,
        public value : string,
        public hidden : boolean
    ) { }
}

export class RepositoryConfig {
    constructor(
        public location : string,
        public config : Config[]
    ) { }
}
