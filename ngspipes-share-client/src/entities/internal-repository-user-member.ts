export class InternalRepositoryUserMember {
    constructor(
        public id : number,
        public creationDate : Date,
        public userName : string,
        public repositoryName : string,
        public writeAccess : boolean
    ) { }
}
