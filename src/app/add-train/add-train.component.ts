import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AddTrainService } from '../services/add-train.service';
import { Stations } from '../shared/stations';
import { Train } from '../shared/train';

@Component({
  selector: 'app-add-train',
  templateUrl: './add-train.component.html',
  styleUrls: ['./add-train.component.css']
})
export class AddTrainComponent implements OnInit {
  num?:any;
  pipe = new DatePipe('en-US');
  public startDate = this.pipe.transform(new Date(), 'YYYY-MM-dd hh:mm');
  public stations:string[] = new Stations().station;
  public train = new Train(this.num,'','','',this.num,this.num,this.num,this.num,this.num,this.num);
  public sourceDate:any;

  constructor(private _service:AddTrainService) { }

  ngOnInit(): void {
  }

  onArrival(){
    this.sourceDate = this.pipe.transform(this.train.sourceDepartureTime, 'YYYY-MM-dd hh:mm');
  }

  onTotalSeat(){
    this.train.availableGeneralSeat=0;
    this.train.availableLadiesSeat=0;
  }

  onGeneralSeat(){
    this.train.availableLadiesSeat=this.train.totalSeat-this.train.availableGeneralSeat;
  }

  onSubmit(){
    this._service.addTrain(this.train).subscribe(
      value=>{
        //Show Successfully Added Msg
      },
      error=>{

      }
    )
    console.log(this.train);
  }
}
