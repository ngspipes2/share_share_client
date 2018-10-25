export class InternalRepositoryGroupMember {
    constructor(
        public id : number,
        public creationDate : Date,
        public groupName : string,
        public repositoryId : number,
        public writeAccess : boolean
    ) { }
}
