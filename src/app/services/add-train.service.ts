import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Train } from '../shared/train';

@Injectable({
  providedIn: 'root'
})
export class AddTrainService {
  private _baseUrl='https://localhost:44367/Train/Add';
  constructor(private _http:HttpClient) { }

  addTrain(train:Train){
    return this._http.post<Train>(this._baseUrl,train);
  }
}
