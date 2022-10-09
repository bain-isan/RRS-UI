import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RailwayReservationSystem';
  @Input() public customHide = false;

  constructor(private _router: Router){}

  onLogin(){
    this._router.navigate(['Login']);
  }

  onRegister(){
    this._router.navigate(['Register']);
  }

  hide(data:boolean){
    this.customHide = data;
  }
}
