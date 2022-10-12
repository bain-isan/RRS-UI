import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';
import { TrainListService } from '../services/train-list.service';
import { TransactionService } from '../services/transaction.service';
import { PassengerDto } from '../shared/passenger-dto';
import { PassengerTicket } from '../shared/passenger-ticket';
import { ReservationDto } from '../shared/reservation-dto';
import { ReservationNoTran } from '../shared/reservation-no-tran';
import { Ticket } from '../shared/ticket';
import { Train } from '../shared/train';
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
  //public train = new Train(this.num, '', '', '', this.num, this.num, this.num, this.num, this.num, this.num);

  public searchResult?: any;
  public reservationNT = new ReservationNoTran(this.num, '', this.passengers);
  constructor(
    private _auth:AuthenticateService,
    private _service:TransactionService, 
    private _router: Router,
    private _acRouter: ActivatedRoute,
    private _train: TrainListService
  ) { }

  ngOnInit(): void {

    let res = this._service.getReservation();
    if(res != undefined){
      this.reservation.TrainId = res.TrainId;
      this.reservation.QuotaName = res.QuotaName;
      this.reservation.Passengers = res.Passengers;

      let tr = this._train.getTrainById(this.reservation.TrainId).subscribe(
        value =>{
          this.totalFare = this.reservation.Passengers.length * value.seatFare;
        },
        error =>{
          this._router.navigate(['Train/Search']);
        }
      );

    }
    else{
      this._router.navigate(['Train/Search']);
    }
    if(this.reservation.TrainId == undefined){
      this._router.navigate(['Train/Search']);
     }
     console.log(res);
    let endYear = this.years[0] + 25;
     for(let i= this.years[0], j = 1; i<=endYear; i++, j++){
       this.years[j] = i;
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
        setTimeout(()=>{this._router.navigate(['Ticket/View', value.pnrNumber])}, 2500);
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
  
  ngOnDestroy(): void {    
    window.history.replaceState(null, '', 'Train/Search');
    this._service.setReservation(this.reservationNT);
    console.log(this._service.getReservation());
  }

}
