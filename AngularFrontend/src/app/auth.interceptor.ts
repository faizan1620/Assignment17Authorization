import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { MainService } from './main.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 

  constructor(private mainService: MainService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  
     // let loggedInUser = this.mainService.currentUserValue;
     let token = localStorage.getItem("loggedInUser")
     
    
   
      if (token) {
        token = JSON.parse(token);
        //console.log(token);
          request = request.clone({
              setHeaders: {
                  Authorization: `Bearer ${token}`
              }
          });
      }

      return next.handle(request);
 
  }
}
