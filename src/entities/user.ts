export enum UserRole {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export class User {
    constructor(
        public userName : string,
        public password : string,
        public email : string,
        public name : string,
        public creationDate : Date,
        public role : UserRole
    ) { }
}
