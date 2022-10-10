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
    if(!this._auth.LoggedIn){
      this._router.navigate(['Login']);
    }
    
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
    this.passengers.push(new PassengerDto('', '', this.num, ''));
  }

  onRemovePassenger(index: number){
    this.passengers.splice(index, 1);
  }

  onQuotaChange(){
    if(this.reservation.QuotaName == 'General'){
      this.genders = ['Male', 'Female', 'Others'];
      this.passengers.splice(0);
    }
      
    if(this.reservation.QuotaName == 'Ladies'){
      this.genders = ['Female'];
      this.passengers.splice(0);
    }
    this.onAddPassenger();
  }

  onSubmit(){
    this.reservation.TrainId = this.searchResult.trainId;
    this._router.navigate(['Payment'], {queryParams: {reservation: JSON.stringify(this.reservation), totalFare: JSON.stringify(this.reservation.Passengers.length * this.searchResult.seatFare)}});
    // console.log(this.reservation);
  }

}
