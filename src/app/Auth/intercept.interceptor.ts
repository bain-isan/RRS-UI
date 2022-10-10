import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let Token = localStorage.getItem('jwt');
    if(Token != null){
      request = request.clone(
        {setHeaders:{
          Authorization: 'Bearer ' + Token
        }}
      )
    }
    
    return next.handle(request);
  }
}
