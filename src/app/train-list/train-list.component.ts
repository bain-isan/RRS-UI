import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainListService } from '../services/train-list.service';
import { TrainDtoPut } from '../shared/train-dto-put';

@Component({
  selector: 'app-train-list',
  templateUrl: './train-list.component.html',
  styleUrls: ['./train-list.component.css']
})
export class TrainListComponent implements OnInit {

  constructor(public _service:TrainListService, private _route:Router) { }
  
  public allTrains: TrainDtoPut[] = [];

  ngOnInit(): void {
    this._service.getAllTrains().subscribe(
      values =>{
        this.allTrains = values;
      },
      error =>{
        console.log(error);
      }
    )
  }

  onUpdate(result:TrainDtoPut){
    this._route.navigate(['Train/Update'], {queryParams: {data: JSON.stringify(result)}});
  }
}
