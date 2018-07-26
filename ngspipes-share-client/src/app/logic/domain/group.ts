export class Group {
    constructor(
        public groupName : string,
        public description : string,
        public creationDate : Date,
        public ownerName : string,
        public members: string[]
    ) { }
}
