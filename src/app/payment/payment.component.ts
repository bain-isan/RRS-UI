import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../services/transaction.service';
import { PassengerDto } from '../shared/passenger-dto';
import { ReservationDto } from '../shared/reservation-dto';
import { Transaction } from '../shared/transaction';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  num?:any;
  public classMsg = "";
  public payable = 0;
  public years= [2022];
  public months = [1,2,3,4,5,6,7,8,9,10,11,12];
  public totalFare = 0;
  public transaction = new Transaction('',this.num,this.num,this.num,'');
  public passengers:PassengerDto[] = [];
  public reservation = new ReservationDto(this.num,'',this.passengers, this.transaction);

  constructor(
    private _service:TransactionService, 
    private _router: Router,
    private _acRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
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
  }

  onSubmit(){
    this.reservation.transaction = this.transaction;
    console.log(this.reservation);
    this._service.postReservation(this.reservation).subscribe(
      value =>{
        console.log(value);
      },
      error =>{
        console.log(error);
      }
    )
  }

}
