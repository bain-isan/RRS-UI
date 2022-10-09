import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RailwayReservationSystem';

  constructor(private _router: Router){}

  onLogin(){
    this._router.navigate(['Login']);
  }

  onRegister(){
    this._router.navigate(['Register']);
  }
}
