import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../shared/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http:HttpClient) { }

  getTicket(pnrNumber?:number)
  {
    let url='https://localhost:44367/Book/GetTicket';
    url+='/'+pnrNumber
     return this.http.get<Ticket>(url);
  }
}
