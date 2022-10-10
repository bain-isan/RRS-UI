import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../services/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardGuard implements CanActivate {
  constructor(
    private _auth:AuthenticateService,
    private _router:Router
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.redirect();
  }

  redirect(){
    if(!this._auth.LoggedIn){
      this._router.navigate(['Login']);
    }
    return this._auth.LoggedIn;
  }
  
}
