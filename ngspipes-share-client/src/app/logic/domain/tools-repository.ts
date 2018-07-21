export class ToolsRepository {
    constructor(
        public id : number,
        public name : string,
        public description : string,
        public creationDate : Date,
        public isPublic : boolean,
        public ownerName : string,
        public groupsAccess : string[],
        public usersAccess : string[]
    ) { }
}
