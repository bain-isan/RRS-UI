import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AuthenticateService } from './services/authenticate.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'RailwayReservationSystem';
  public isLoggedIn = false;
  constructor(
    private _router: Router, 
    public _auth: AuthenticateService, 
    private _logout: LoginService
    ) { }

  ngOnInit(): void {
    this.check();
  }

  @HostListener('window:unload', [ '$event' ])
  unloadHandler() {
      localStorage.clear();
  }

  @HostListener('window:unload', [ '$event' ])
  reloadHandler() {}

  onLogin() {
    this.check();
    this._router.navigate(['Login']);
  }

  onRegister() {
    this.check();
    this._router.navigate(['Register']);
  }

  onLogout() {
    this.check();
    this._logout.userLogout();
    this._router.navigate(['Login']);
  }

  check() {
    return this._auth.LoggedIn;
  }

  getRole(role: string) {
    this._auth.getRole([role]);
  }

  checkAdmin() {
    let role = this._auth.Role;
    if (role != null) {
      return this.check() && role == 'Admin' ? true : false;
    }
    return false;
  }

  checkUser() {
    let role = this._auth.Role;
    if (role != null) {
      return this.check() && role == 'User' ? true : false;
    }
    return false;
  }
  
  // ngOnDestroy(): void {
  //   localStorage.clear();
  // }
}
