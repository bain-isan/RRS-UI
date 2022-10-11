import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchTrainService } from '../services/search-train.service';
import { SearchResult } from '../shared/search-result';
import { SearchTrain } from '../shared/search-train';
import { Stations } from '../shared/stations';


@Component({
  selector: 'app-search-train',
  templateUrl: './search-train.component.html',
  styleUrls: ['./search-train.component.css']
})
export class SearchTrainComponent implements OnInit {
  pipe = new DatePipe('en-US');
  public startDate = this.pipe.transform(new Date(), 'YYYY-MM-dd');
  public message = "";
  public classMsg = "";
  
  public stations:string[] = new Stations().station;

  date?: any;
  public searchTrain = new SearchTrain('', '', this.date);

  constructor(
    private _service: SearchTrainService,
    private _route: Router
    ) { }

  ngOnInit(): void { }


  onSubmit() {
    this._service.postSearch(this.searchTrain).subscribe(
      value => {
        let searchResult: SearchResult[] = [];
        if(Array.isArray(value)){
          this._service.setTrain(value);
          this._route.navigate(['Train/Available']);
        }
      },
      error => {
        if(error.error.msg != undefined){
          this.message = error.error.msg;
          this.classMsg ="alert-danger";
        }
        if(error.error.detail){
          this.message = error.error.detail;
          this.classMsg ="alert-danger";
        }
        console.log(error.error.msg);
      })
  }

}
