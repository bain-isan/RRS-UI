export class Register {
    constructor(
        public Name: string,
        public Email:string,
        public Dob : Date,
        public Password : string,
        public ConformPassword : string,
        public Gender  : string
    ){}
}
