import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationDto } from '../shared/reservation-dto';
import { ReservationNoTran } from '../shared/reservation-no-tran';
import { Transaction } from '../shared/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  num?:any;
  public reservation:any;
  private _baseUrl = 'https://localhost:44367/Book/Pay';
  constructor(private _http: HttpClient, private route: Router) { }

  postReservation(reservation:ReservationDto) {
    return this._http.post(this._baseUrl, reservation);
  }
}
