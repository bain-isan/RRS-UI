import { PassengerDto } from "./passenger-dto";
import { Transaction } from "./transaction";

export class ReservationDto {
    constructor(
        public TrainId: number,
        public  QuotaName: string,
        public Passengers: PassengerDto[],
        public  transaction: Transaction
    ){}
}
