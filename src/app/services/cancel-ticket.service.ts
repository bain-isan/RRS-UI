import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../shared/ticket';

@Injectable({
  providedIn: 'root'
})
export class CancelTicketService {

  constructor(private _http:HttpClient) { }

  cancel(pnr:number){
    let baseUrl = 'https://localhost:44367/Book/Cancel/' + pnr;
    return this._http.put<Ticket>(baseUrl,{});
  }
}
