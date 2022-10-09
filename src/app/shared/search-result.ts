export class SearchResult {
    constructor(
        public trainId:number,
        public trainNo: number,
        public trainName: string,
        public sourceStation: string,
        public destinationStation: string,
        public sourceDepartureTime : Date,
        public destinationArrivalTime : Date,
        public totalSeat : number,
        public availableGeneralSeat : number,
        public availableLadiesSeat : number,
        public seatFare : number,
        ){}
}
