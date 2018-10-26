export class AccessToken {
    constructor(
        public id : number,
        public ownerName : string,
        public creationDate : Date,
        public name : string,
        public description : string,
        public writeAccess : boolean
    ) { }
}
