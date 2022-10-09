import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from '../services/ticket.service';
import { PassengerTicket } from '../shared/passenger-ticket';
import { Ticket } from '../shared/ticket';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  title = 'get-ticket';
  public pnrNumber?:number;
  num?:any;
  public passengers:PassengerTicket[] = [];
  public ticket = new Ticket(this.num,'',this.num,this.num,'','',this.num,this.num,this.num,this.num,'','',this.passengers);
  constructor(private _service:TicketService, private _router:Router)
  {
      }

  ngOnInit(): void {
  }
 onSubmit(){
  this._service.getTicket(this.pnrNumber).subscribe(
    value=>{
      this.ticket = value;
      
      this._router.navigate(['Ticket/Views'], {queryParams:{data:JSON.stringify(this.ticket)}})
    },
    error=>{
      console.log(error.error.msg);
    }
    
  );
 }
}
