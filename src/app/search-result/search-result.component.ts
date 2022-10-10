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

  ngOnInit(): void {
    this._acRoute.queryParams.subscribe(
      params => {
        this.searchResult = JSON.parse(params['data']);
        console.log(this.searchResult);

        if (this.searchResult.length == 0) {
          this._router.navigate(['Train/Search']);
        }
      }
    )
  }

  onBook(result: SearchResult) {
    if (!this._auth.LoggedIn) {
      this._router.navigate(['Login']);
    }
    else {
      this._router.navigate(['Reservation'], { queryParams: { data: JSON.stringify(result) } });
    }
  }

}
