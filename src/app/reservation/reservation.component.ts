import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';
import { TransactionService } from '../services/transaction.service';
import { PassengerDto } from '../shared/passenger-dto';
import { ReservationNoTran } from '../shared/reservation-no-tran';
import { SearchResult } from '../shared/search-result';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  num?:any;
  public quotas = ['General','Ladies'];
  public genders:string[] = [];
  public available = 0;
  public message = "";

  public searchResult?:any;
  public passengers: PassengerDto[] = [new PassengerDto('', '', this.num, '')];
  public reservation = new ReservationNoTran(this.num, '', this.passengers);

  constructor(
    private _service: TransactionService,
    private _acRoute: ActivatedRoute, 
    private _router: Router,
    private _auth:AuthenticateService
    ) { }

  ngOnInit(): void {
    // if(!this._auth.LoggedIn){
    //   this._router.navigate(['Login']);
    // }
    console.log("Called init");
    this._acRoute.queryParams.subscribe(
      params =>{
        this.searchResult = JSON.parse(params['data']);
      }
    )

    if(this.searchResult == null){
      this._router.navigate(['Train/Search']);
    }
  }

  onAddPassenger(){
    console.log("Called add");
    this.passengers.push(new PassengerDto('', '', this.num, ''));
    this.available--;
  }

  onRemovePassenger(index: number){
    console.log("Called rem");
    this.passengers.splice(index, 1);
    this.available++;
  }

  onQuotaChange(){
    if(this.reservation.QuotaName == 'General'){
      this.genders = ['Male', 'Female', 'Others'];
      this.passengers.splice(0);
      this.available = this.searchResult.availableGeneralSeat;
      console.log("general");
    }
      
    if(this.reservation.QuotaName == 'Ladies'){
      this.genders = ['Female'];
      this.passengers.splice(0);
      this.available = this.searchResult.availableLadiesSeat;
      console.log("ladies");

    }
    this.onAddPassenger();
  }

  canAddPassengerDisabled(){
     console.log(this.available);
     console.log(this.passengers.length==undefined?1:this.passengers.length);
     console.log("Called disabled");
    let filled = this.passengers.length==undefined?1:this.passengers.length;
    if(0 < (this.available) && filled < 6){
      console.log('false');
      this.message="";
      return false;
    }
    
    if(filled >= 6){
      this.message="Cannot Book More Than 6 Passengers In One Booking";
    }
    else if(0 >= (this.available)){
      this.message="No More Seates Available";
    }
    return true;
  }

  onSubmit(){
    this.reservation.TrainId = this.searchResult.trainId;
    this._router.navigate(['Payment'], {queryParams: {reservation: JSON.stringify(this.reservation), totalFare: JSON.stringify(this.reservation.Passengers.length * this.searchResult.seatFare)}});
    // console.log(this.reservation);
  }



}
