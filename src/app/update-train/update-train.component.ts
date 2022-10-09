import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UpdateTrainService } from '../services/update-train.service';
import { Stations } from '../shared/stations';
import { Train } from '../shared/train';


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
  public train = new Train(this.num,'','','',this.num,this.num,this.num,this.num,this.num,this.num);
  public sourceDate:any;

  constructor(private _service:UpdateTrainService) { }

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
    this._service.update(this.train).subscribe(
      value=>{
        //Show Successfully Added Msg
      },
      error=>{

      }
    )
    console.log(this.train);
  }
}
