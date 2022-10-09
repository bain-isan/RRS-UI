import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TrainDtoPut } from '../shared/train-dto-put';

@Injectable({
  providedIn: 'root'
})
export class TrainListService {
  readonly baseUrl = 'https://localhost:44367/Train/View';

  constructor(private _http:HttpClient, private _router:Router) { }

  public getAllTrains(){
    return this._http.get<TrainDtoPut[]>(this.baseUrl);
  }
}
