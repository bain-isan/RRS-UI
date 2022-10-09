import { PassengerDto } from "./passenger-dto";

export class ReservationNoTran {
    constructor(
        public TrainId: number,
        public  QuotaName: string,
        public Passengers: PassengerDto[]
    ){}
    
}
