export class GroupMember {
    constructor(
        public id : number,
        public creationDate : Date,
        public userName : string,
        public groupName : string,
        public writeAccess : boolean
    ) { }
}
