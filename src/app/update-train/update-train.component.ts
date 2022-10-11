import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';
import { TrainListService } from '../services/train-list.service';
import { UpdateTrainService } from '../services/update-train.service';
import { Stations } from '../shared/stations';
import { TrainDtoPut } from '../shared/train-dto-put';


@Component({
  selector: 'app-update-train',
  templateUrl: './update-train.component.html',
  styleUrls: ['./update-train.component.css']
})
export class UpdateTrainComponent implements OnInit {
  num?:any;
  pipe = new DatePipe('en-US');
  public startDate = this.pipe.transform(new Date(), 'YYYY-MM-dd hh:mm');
  public stations:string[] = new Stations().station;
  public train = new TrainDtoPut(this.num,this.num,'','','',this.num,this.num,this.num,this.num,this.num,this.num);
  public sourceDate:any;
  public message = "";
  
  public classMsg = "";


  constructor(
    private _service:UpdateTrainService, 
    private _trainList:TrainListService,
    private _acRouter:ActivatedRoute,
    private _router:Router,
    private _auth:AuthenticateService
    ) { }

  ngOnInit(): void {
    window.history.replaceState(null, '', 'Train/View');
    let trainId = this._acRouter.snapshot.paramMap.get('TrainId');
    if (trainId != null) {
      this._trainList.getTrainById(parseInt(trainId)).subscribe(
        value => {
          this.train = value;

          console.log(this.train);
        },
        error => {
          console.log(error);
          
          this._router.navigate(['Train/View']);
          
        }
      )
      console.log(this.train);
    }
    else {
      this._router.navigate(['Train/View']);
    }
    console.log(this.train);
  }

  onArrival(){
    this.sourceDate = this.pipe.transform(this.train.sourceDepartureTime, 'YYYY-MM-dd hh:mm');
  }

  onGeneralSeat(){
    this.train.availableLadiesSeat=this.train.totalSeat-this.train.availableGeneralSeat;
  }

  onSubmit(){
    this._service.update(this.train).subscribe(
      value=>{
        window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
   });
        this.message = "Train Updated Successfully";
        this.classMsg = "alert-success";
        setTimeout(()=>{ this._router.navigate(['Train/View']); }, 2000);
        console.log(value);
      },
      error=>{
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
     
    // window.history.replaceState(null, '', 'Train/Search');
    window.history.pushState(null, '', 'Ticket/Search');
  }
}
