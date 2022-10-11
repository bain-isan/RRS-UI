import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';
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
  public message = "";
  public classMsg = "";

  constructor(
    private _service:TicketService, 
    private _router:Router,
    private _auth:AuthenticateService,
    private _acRoute:ActivatedRoute
    ){}

  ngOnInit(): void {
    

  }
 onSubmit(){
  console.log(this.pnrNumber);
  this._service.getTicket(this.pnrNumber).subscribe(
    value=>{
      this.ticket = value;      
      this._router.navigate(['Ticket/View', this.ticket.pnrNumber]);
    },
    error=>{
      this.message = error.error.msg;
      this.classMsg = "alert-danger";
      console.log(error.error.msg);
    }
    
  );
 }
}
