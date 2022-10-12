import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';
import { TrainListService } from '../services/train-list.service';
import { TransactionService } from '../services/transaction.service';
import { PassengerDto } from '../shared/passenger-dto';
import { ReservationNoTran } from '../shared/reservation-no-tran';
import { SearchResult } from '../shared/search-result';
import { TrainDtoPut } from '../shared/train-dto-put';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  num?: any;
  public quotas = ['General', 'Ladies'];
  public genders: string[] = [];
  public available = 0;
  public message = "";
  public trainId = 0;

  public searchResult?: any;
  public passengers: PassengerDto[] = [new PassengerDto('', '', this.num, '')];
  public reservation = new ReservationNoTran(this.num, '', this.passengers);

  constructor(
    private _service: TransactionService,
    private _acRoute: ActivatedRoute,
    private _router: Router,
    private _auth: AuthenticateService,
    private _train: TrainListService
  ) { }

  ngOnInit(): void {
    
    let trainDet = this._acRoute.snapshot.paramMap.get('TrainId');
    if (trainDet != null) {
      this._train.getTrainById(parseInt(trainDet)).subscribe(
        value => {
          this.searchResult = value;
          if(value.availableLadiesSeat == 0){
            this.quotas = ['Ladies'];
          }
          if(value.availableLadiesSeat == 0){
            this.quotas = ['General'];
          }
          
          console.log(this.searchResult);
        },
        error => {
          console.log(error);
          
            this._router.navigate(['Train/Search']);
          
        }
      )
      console.log(this.searchResult);
    }
    else {
      this._router.navigate(['Train/Search']);
    }
    console.log(this.searchResult);

    
  }

  onAddPassenger() {
    console.log("Called add");
    this.passengers.push(new PassengerDto('', '', this.num, ''));
    this.available--;
  }

  onRemovePassenger(index: number) {
    console.log("Called rem");
    this.passengers.splice(index, 1);
    this.available++;
  }

  onQuotaChange() {
    if (this.reservation.QuotaName == 'General') {
      this.genders = ['Male', 'Female', 'Others'];
      this.passengers.splice(0);
      this.available = this.searchResult.availableGeneralSeat;
      console.log("general");
    }

    if (this.reservation.QuotaName == 'Ladies') {
      this.genders = ['Female'];
      this.passengers.splice(0);
      this.available = this.searchResult.availableLadiesSeat;
      console.log("ladies");

    }
    this.onAddPassenger();
  }

  canAddPassengerDisabled() {
    console.log(this.available);
    console.log(this.passengers.length == undefined ? 1 : this.passengers.length);
    console.log("Called disabled");
    let filled = this.passengers.length == undefined ? 1 : this.passengers.length;
    if (0 < (this.available) && filled < 6) {
      console.log('false');
      this.message = "";
      return false;
    }

    if (filled >= 6) {
      this.message = "Cannot Book More Than 6 Passengers In One Booking";
    }
    else if (0 >= (this.available)) {
      this.message = "No More Seates Available";
    }
    return true;
  }

  onSubmit() {
    this._service.setReservation(this.reservation);
    this.reservation.TrainId = this.searchResult.trainId;
    window.history.replaceState(null, '', 'Train/Search');
    this._router.navigate(['Payment']);
    // console.log(this.reservation);
  }

  ngOnDestroy(): void {    
    window.history.pushState(null, '', 'Train/Search');
    
  }

}
