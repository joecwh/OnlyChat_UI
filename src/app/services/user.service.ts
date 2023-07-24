import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../models/UserResponse';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl : string = "https://localhost:7248/api/User/";
  constructor(private http : HttpClient) { }

  GetUser(id : string) 
  {
    return this.http.get<any>(this.baseUrl + "User/" + id);
  }

  GetAllMessages()
  {
    return this.http.get<any>(this.baseUrl + "AllMessages");
  }

  SendMessage(message : any)
  {
    return this.http.post<any>(this.baseUrl + "WriteMessage", message);
  }

  UpdateUser(id : string, user : any)
  {
    return this.http.put<any>(this.baseUrl + "UpdateUser/" + id, user);
  }

  DeleteUser(id : string)
  {
    return this.http.delete<any>(this.baseUrl + "DeleteUser/" + id);
  }
}
