export class Group {
    constructor(
        public groupName : string,
        public description : string,
        public creationDate : Date,
        public owenerName : string,
        public members: string[]
    ) { }
}
