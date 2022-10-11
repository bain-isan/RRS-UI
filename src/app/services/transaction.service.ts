import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PassengerDto } from '../shared/passenger-dto';
import { ReservationDto } from '../shared/reservation-dto';
import { ReservationNoTran } from '../shared/reservation-no-tran';
import { Ticket } from '../shared/ticket';
import { Transaction } from '../shared/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  num?:any;
  private _baseUrl = 'https://localhost:44367/Book/Pay';
  constructor(private _http: HttpClient, private route: Router) { }

  searchResult?: any;
  passengers: PassengerDto[] = [new PassengerDto('', '', this.num, '')];
  reservation = new ReservationNoTran(this.num, '', this.passengers);


  setReservation(res:ReservationNoTran){
    this.reservation = res;
  }

  getReservation(){
    return this.reservation;
  }

  postReservation(reservation:ReservationDto) {
    return this._http.post<Ticket>(this._baseUrl, reservation);
  }
}
