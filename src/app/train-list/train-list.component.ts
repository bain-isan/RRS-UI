import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';
import { TrainListService } from '../services/train-list.service';
import { TrainDtoPut } from '../shared/train-dto-put';

@Component({
  selector: 'app-train-list',
  templateUrl: './train-list.component.html',
  styleUrls: ['./train-list.component.css']
})
export class TrainListComponent implements OnInit {

  constructor(
    public _service:TrainListService, 
    private _router:Router,
    private _auth:AuthenticateService
    ) { }
  
  public allTrains: TrainDtoPut[] = [];

  ngOnInit(): void {
    // if(!this._auth.LoggedIn){
    //   this._router.navigate(['Login']);
    // }
    
    this._service.getAllTrains().subscribe(
      values =>{
        this.allTrains = values;
      },
      error =>{
        console.log(error);
      }
    );
  }

  onUpdate(result:TrainDtoPut){
    this._router.navigate(['Train/Update'], {queryParams: {data: JSON.stringify(result)}});
  }

  onAddTrain(){
    this._router.navigate(['Train/Add']);
  }
}
