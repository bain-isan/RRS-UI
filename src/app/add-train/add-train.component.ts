import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddTrainService } from '../services/add-train.service';
import { AuthenticateService } from '../services/authenticate.service';
import { Stations } from '../shared/stations';
import { Train } from '../shared/train';

@Component({
  selector: 'app-add-train',
  templateUrl: './add-train.component.html',
  styleUrls: ['./add-train.component.css']
})
export class AddTrainComponent implements OnInit {
  num?: any;
  pipe = new DatePipe('en-US');
  public startDate = this.pipe.transform(new Date(), 'YYYY-MM-dd hh:mm');
  public stations: string[] = new Stations().station;
  public train = new Train(this.num, '', '', '', this.num, this.num, this.num, this.num, this.num, this.num);
  public sourceDate: any;
  public message = "";

  public classMsg = "";

  constructor(
    private _service: AddTrainService,
    private _router: Router,
    private _auth: AuthenticateService
  ) { }

  ngOnInit(): void {
    // if(!this._auth.LoggedIn){
    //   this._router.navigate(['Login']);
    // }
  }

  onArrival() {
    this.sourceDate = this.pipe.transform(this.train.sourceDepartureTime, 'YYYY-MM-dd hh:mm');
  }

  onTotalSeat() {
    this.train.availableGeneralSeat = 0;
    this.train.availableLadiesSeat = 0;
  }

  onGeneralSeat() {
    if (this.train.availableGeneralSeat <= this.train.totalSeat && this.train.availableGeneralSeat >= 0)
      this.train.availableLadiesSeat = this.train.totalSeat - this.train.availableGeneralSeat;
  }

  onSubmit() {
    this._service.addTrain(this.train).subscribe(
      value => {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        this.message = "Train Updated Successfully";
        this.classMsg = "alert-success";
        setTimeout(() => { this._router.navigate(['Train/View']); }, 2000);
      },
      error => {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        this.message = error.error.msg;
        this.classMsg = "alert-danger";
      }
    )
    console.log(this.train);
  }

  ngOnDestroy(): void {    
    window.history.replaceState(null, '', 'Train/View');
  }
}
