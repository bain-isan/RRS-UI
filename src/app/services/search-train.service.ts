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

  public show(res:SearchResult[]){
    this.searchResult = res;
    this._router.navigate(['Train/Available'], {queryParams:{data: JSON.stringify(this.searchResult)}});
  }
  
  readonly baseUrl = 'https://localhost:44367/Train/Search';

  postSearch(searchTrain:SearchTrain){
    
    return this.http.post(this.baseUrl,searchTrain);
    
  }
}
