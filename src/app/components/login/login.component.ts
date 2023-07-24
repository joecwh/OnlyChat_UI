import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CustomResponse } from 'src/app/models/CustomResponse';
import { LoginRequest } from 'src/app/models/LoginRequest';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import ValidateForm from 'src/app/validations/ValidateForm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  request !: FormGroup;

  constructor(
    private fb : FormBuilder,
    private service : AuthService, 
    private router : Router, 
    private userStore : UserStoreService,
    private toast : NgToastService) { }

  ngOnInit() 
  { 
    this.request = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  Login()
  {
    if(this.request.valid)
    {
      this.service.Login(this.request.value)
      .subscribe({
        next : (res) =>
        {
          this.request.reset();
          this.service.StoreToken(res.data);
          const tokenPayload = this.service.DecodedToken();
          this.userStore.SetUserId(tokenPayload.id);
          this.userStore.SetUsername(tokenPayload.unique_name);
          this.userStore.SetUserRole(tokenPayload.role);
          this.toast.success({
            detail: 'SUCCESS',
            summary: res.message,
            duration: 5000
          });
          this.router.navigate(['message']);
        },
        error : (res) =>
        {
          this.toast.error({
            detail: 'ERROR',
            summary: res.message,
            duration: 5000
          });
          this.router.navigate(['login']);
        }
      });
    }
    else
    {
      ValidateForm.validateAllFormFields(this.request);
    }
  }

}
