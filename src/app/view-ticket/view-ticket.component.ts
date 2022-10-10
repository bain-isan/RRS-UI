import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';
import { CancelTicketService } from '../services/cancel-ticket.service';
import { PassengerTicket } from '../shared/passenger-ticket';
import { Ticket } from '../shared/ticket';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css']
})
export class ViewTicketComponent implements OnInit {
  num?:any;
  public passengers:PassengerTicket[] = [];
  public ticket = new Ticket(this.num,'',this.num,this.num,'','',this.num,this.num,this.num,this.num,'','',this.passengers);
  public  today:Date = new Date();
  public pipe = new DatePipe('en-US');
  
  constructor(
    private _acRouter: ActivatedRoute, 
    private _service:CancelTicketService,
    private _router:Router,
    private _auth:AuthenticateService
    ) { }

  ngOnInit(): void {
    if(!this._auth.LoggedIn){
      this._router.navigate(['Login']);
    }
    this._acRouter.queryParams.subscribe(
      params =>{
        this.ticket = JSON.parse(params['data']);
      },
      error=>{

      }
    );
    if(this.ticket.pnrNumber == undefined){
      this._router.navigate(['Ticket/Search']);
    }
  }

  cancel(){
    this._service.cancel(this.ticket.pnrNumber).subscribe(
      value=>{
        this.ticket = value;
      },
      error=>{
        console.log(error);
      }
    )
  }

  isCancelled(){
    console.log(this.ticket.sourceDepartureTime);
    console.log(new Date());
    let day = this.pipe.transform(this.today,'dd/mm/yy');
    let got = this.pipe.transform(this.ticket.sourceDepartureTime, 'dd/mm/yy');
    if(this.ticket.sourceDepartureTime.getDate() >= new Date().getDate() || this.ticket.status === 'Cancelled'){
      return true;
    }
    return false;
  }

  printThisPage(){
    window.print();
  }
}
