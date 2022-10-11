import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';
import { TransactionService } from '../services/transaction.service';
import { PassengerDto } from '../shared/passenger-dto';
import { PassengerTicket } from '../shared/passenger-ticket';
import { ReservationDto } from '../shared/reservation-dto';
import { Ticket } from '../shared/ticket';
import { Transaction } from '../shared/transaction';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  num?:any;
  public payable = 0;
  public years= [2022];
  public months = [1,2,3,4,5,6,7,8,9,10,11,12];
  public totalFare = 0;
  public message = "";
  public classMsg = "";

  public transaction = new Transaction('',this.num,this.num,this.num,'');
  public passengers:PassengerDto[] = [];
  public passengerTic:PassengerTicket[] = [];
  public reservation = new ReservationDto(this.num,'',this.passengers, this.transaction);
  public ticket = new Ticket(this.num,'',this.num,this.num,'','',this.num,this.num,this.num,this.num,'','',this.passengerTic);

  constructor(
    private _auth:AuthenticateService,
    private _service:TransactionService, 
    private _router: Router,
    private _acRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // if(!this._auth.LoggedIn){
    //   this._router.navigate(['Login']);
    // }
    

    let endYear = this.years[0] + 25;
     for(let i= this.years[0], j = 1; i<=endYear; i++, j++){
       this.years[j] = i;
     }

     this._acRouter.queryParams.subscribe(
      params=>{
        this.reservation = JSON.parse(params['reservation']);
        this.totalFare = JSON.parse(params['totalFare']);
      }
     )
      console.log(this.reservation);
      console.log(this.reservation.TrainId);
      if(this.reservation == null || this.reservation.TrainId == undefined){
       this._router.navigate(['Train/Search']);
      }
  }

  onSubmit(){
    this.reservation.transaction = this.transaction;
    console.log(this.reservation);
    this._service.postReservation(this.reservation).subscribe(
      value =>{
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        this.ticket = value;
        this.message = "Payment Successfull";
        this.classMsg = "alert-success";
        setTimeout(()=>{this._router.navigate(['Ticket/View'], {queryParams:{data:JSON.stringify(this.ticket)}})}, 2500);
      },
      error =>{
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        this.message = error.error.msg + "<br> Payment Cancelled";
        this.classMsg = "alert-danger";
      }
    )
  }

}
