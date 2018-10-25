export class AccessToken {
    constructor(
        public id : number,
        public ownerName : string,
        public creationDate : Date,
        public description : string,
        public writeAccess : boolean
    ) { }
}
