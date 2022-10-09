import { PassengerTicket } from "./passenger-ticket";

export class Ticket {
    constructor(
        public trainNo:number,
        public trainName:string, 
        public pnrNumber:number,
        public bookingDate:Date,
        public sourceStation:string,
        public destinationStation:string,
        public sourceDepartureTime:Date,
        public destinationArrivalTime:Date,
        public totalFare:number,
        public transactionNumber:number,
        public status:string,
        public quotaName:string,
        public passengerTicket: PassengerTicket[]){}
}
