import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserResponse } from 'src/app/models/UserResponse';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  
  user !: any;

  constructor(
    private service : UserService, 
    private authservice : AuthService,
    private toast : NgToastService,
    private router : Router) { }

  ngOnInit()
  {
    if(this.authservice.IsLoggedIn())
    {
      this.service.GetUser(this.authservice.GetUserId())
      .subscribe({
        next : (res) =>
        {
          this.user = res;
        }
      });
    }
    else
    {
      this.toast.error({
        detail: 'ERROR',
        summary: 'Please login first to enter this page',
        duration: 5000
      });
      this.router.navigate(['login']);
    }
  }

  UpdateUser()
  {
    this.service.UpdateUser(this.user.id, this.user)
    .subscribe({
      next : (res) =>
      {
        console.log(res);
        window.location.reload();
      },
      error : (res) =>
      {
        console.log(res);
      }
    })
  }

  DeleteUser()
  {
    this.service.DeleteUser(this.user.id)
    .subscribe({
      next : (res) =>
      {
        console.log(res);
        this.router.navigate(['login']);
      },
      error : (res) =>
      {
        console.log(res);
      }
    })
  }
}
