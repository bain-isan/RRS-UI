import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';
import { SearchTrainService } from '../services/search-train.service';
import { SearchResult } from '../shared/search-result';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  constructor(
    public _service: SearchTrainService,
    private _auth: AuthenticateService,
    private _acRoute: ActivatedRoute,
    private _router: Router,
  ) { }

  public searchResult: SearchResult[] = [];
  public searchResultReset: SearchResult[] = [];

  ngOnInit(): void {
    
    this.searchResult = this._service.getTrain();

    if(this.searchResult.length <= 0){
      this._router.navigate(['Train/Search']);
    }

    console.log(this._service.getTrain());
  }

  onBook(result: SearchResult) {

      //this._router.navigate(['Reservation'], { queryParams: { data: JSON.stringify(result) } });
      this._router.navigate(['Reservation', result.trainId]);
  }

  roleUser(){
    return localStorage.getItem('role') == 'User';
  }
  LoggedIn(){
    return this._auth.LoggedIn;
  }

  ngOnDestroy(): void {    
    window.history.pushState(null, '', 'Train/Search');
    
  }
}
