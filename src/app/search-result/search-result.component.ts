import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchTrainService } from '../services/search-train.service';
import { SearchResult } from '../shared/search-result';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  constructor(public _service:SearchTrainService, private _acRoute: ActivatedRoute, private _route:Router) { }
  
  public searchResult: SearchResult[] = [];

  ngOnInit(): void {
    this._acRoute.queryParams.subscribe(
      params =>{
         this.searchResult= JSON.parse(params['data']);
        console.log(this.searchResult);

        //console.log(this.searchResult);
        //console.log( params['result']);
      }
      )
  }

  onBook(result:SearchResult){
    this._route.navigate(['Reservation'], {queryParams: {data: JSON.stringify(result)}});
  }
  
}
