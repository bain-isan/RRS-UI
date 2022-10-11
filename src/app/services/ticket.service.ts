import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../shared/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private canAccessAgain = true;
  constructor(private http:HttpClient) { }

  setAccess(acc: boolean){
    this.canAccessAgain = acc;
  }

  getAccess(){
    return this.canAccessAgain;
  }
  
  getTicket(pnrNumber?:number)
  {
    let url='https://localhost:44367/Book/GetTicket';
    url+='/'+ pnrNumber;
    console.log(url);
     return this.http.get<Ticket>(url);
  }
}
