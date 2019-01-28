export class RepositoryGroupMember {
    constructor(
        public id : number,
        public creationDate : Date,
        public groupName : string,
        public repositoryName : string,
        public writeAccess : boolean
    ) { }
}
