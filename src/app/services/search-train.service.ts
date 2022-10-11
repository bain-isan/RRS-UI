import { HttpClient } from '@angular/common/http';
import { ArrayType } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SearchResult } from '../shared/search-result';
import { SearchTrain } from '../shared/search-train';

@Injectable({
  providedIn: 'root'
})
export class SearchTrainService {
  num?:any;
  public searchResult:SearchResult[] = [];
  constructor(private http:HttpClient, private _router:Router) { }

   setTrain(dto:SearchResult[]){
     this.searchResult = dto;
     console.log(this.searchResult);
   }

   getTrain(){
    console.log(this.searchResult);
    return this.searchResult;
   }
  
  readonly baseUrl = 'https://localhost:44367/Train/Search';

  postSearch(searchTrain:SearchTrain){
    
    return this.http.post(this.baseUrl,searchTrain);
    
  }
}
