import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private auth : AuthService, 
    private toast : NgToastService,
    private router : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.auth.GetToken();
    if(token)
    {
      request = request.clone({
        setHeaders : {Authorization: `Bearer ${token}`}
      });
    }
    return next.handle(request).pipe(
      catchError((err : any) =>
      {
        if(err instanceof HttpErrorResponse)
        {
          if(err.status === 401)
          {
            this.toast.warning({
              detail: "WARNING",
              summary: "Token is expired, Please login again"
            });
            this.router.navigate(['login']);
          }
          else if(err.status === 400)
          {
            this.toast.warning({
              detail: "DANGER",
              summary: "Invalid Username or Password"
            });
            this.router.navigate(['login']);
          }
        }
        return throwError(() => new Error("some other error occured"))
      })
    );
  }
}
