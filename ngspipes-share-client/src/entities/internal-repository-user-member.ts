export class InternalRepositoryUserMember {
    constructor(
        public id : number,
        public creationDate : Date,
        public userName : string,
        public repositoryId : number,
        public writeAccess : boolean
    ) { }
}
