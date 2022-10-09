export class Transaction {
    constructor(
        public CardNumber: string,

        public  ExpiryYear: number,

        public ExpiryMonth: number,

        public CVV: number,

        public CardHolderName: string
    ){}
    
}
