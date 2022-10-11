import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrainDtoPut } from '../shared/train-dto-put';

@Injectable({
  providedIn: 'root'
})
export class UpdateTrainService {
  private _baseUrl='https://localhost:44367/Train/Update';
  constructor(private _http:HttpClient) { }

  update(train:TrainDtoPut){
    return this._http.put(this._baseUrl,train);
  }
}
