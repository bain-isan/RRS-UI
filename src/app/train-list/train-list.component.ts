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
  public message = "";
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
        this.message = "";
        this.allTrains = values;
      },
      error =>{
        this.message = error.error.msg;
      }
    );
  }

  onUpdate(result:TrainDtoPut){
    this._router.navigate(['Train/Update', result.trainId]);
  }

  onAddTrain(){
    this._router.navigate(['Train/Add']);
  }
}
