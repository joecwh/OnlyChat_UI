import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/LoginRequest';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignupRequest } from '../models/SignupRequest';
import { UserResponse } from '../models/UserResponse';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserStoreService } from './user-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl : string = "https://localhost:7248/api/Auth/";
  private userPayload : any;

  constructor(private http : HttpClient, private router : Router, private userstore : UserStoreService) 
  { 
    this.userPayload = this.DecodedToken();
  }

  Login(request : any) 
  {
    return this.http.post<any>(this.baseUrl + "Login", request);
  }

  Signup(request : SignupRequest) 
  {
    return this.http.post<any>(this.baseUrl + "Signup", request);
  }

  Logout()
  {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  StoreToken(token : string)
  {
    localStorage.setItem('token', token);
  }

  GetToken()
  {
    return localStorage.getItem('token');
  }

  IsLoggedIn()
  {
    return !!localStorage.getItem('token');
  }

  DecodedToken()
  {
    const jwtHelper = new JwtHelperService();
    const token = this.GetToken()!;
    return jwtHelper.decodeToken(token);
  }

  GetUserId()
  {
    if(this.userPayload)
    {
      return this.userPayload.nameid;
    }
  }

  GetUsername()
  {
    if(this.userPayload)
    {
      return this.userPayload.unique_name;
    }
  }

  GetUserRole()
  {
    if(this.userPayload)
    {
      return this.userPayload.role;
    }
  }
}
