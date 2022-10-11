import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SearchResult } from '../shared/search-result';
import { TrainDtoPut } from '../shared/train-dto-put';

@Injectable({
  providedIn: 'root'
})
export class TrainListService {
   baseUrl = 'https://localhost:44367/Train/View';

   

  constructor(private _http:HttpClient, private _router:Router) { }

  public getAllTrains(){
    return  this._http.get<TrainDtoPut[]>(this.baseUrl);
  }

  public getTrainById(id:number){
    let url= "https://localhost:44367/Train/View/" + id;
    return this._http.get<SearchResult>(url);
  }
}
