import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private id = new BehaviorSubject<string>("");
  private username = new BehaviorSubject<string>("");
  private role = new BehaviorSubject<string>("");

  constructor() { }

  public GetUserId()
  {
    return this.id.asObservable();
  }

  public SetUserId(id : string)
  {
    this.id.next(id);
  }

  public GetUsername()
  {
    return this.username.asObservable();
  }

  public SetUsername(username : string)
  {
    this.username.next(username);
  }

  public GetUserRoll()
  {
    return this.role.asObservable();
  }

  public SetUserRole(role : string)
  {
    this.role.next(role);
  }
}
