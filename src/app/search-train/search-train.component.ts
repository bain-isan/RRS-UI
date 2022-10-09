import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  
  
  public stations:string[] = new Stations().station;

  date?: any;
  public searchTrain = new SearchTrain('', '', this.date);

  constructor(private _service: SearchTrainService) { }

  ngOnInit(): void { }


  onSubmit() {
    this._service.postSearch(this.searchTrain).subscribe(
      value => {
        let searchResult: SearchResult[] = [];
        if(Array.isArray(value)){
          for(let res of value){
            searchResult.push(res);
          }
          this._service.show(searchResult);
        }
      },
      error => {
        console.log(error.error.msg);
      })
  }

}
