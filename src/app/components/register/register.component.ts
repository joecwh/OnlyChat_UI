import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { SignupRequest } from 'src/app/models/SignupRequest';
import { AuthService } from 'src/app/services/auth.service';
import ValidateForm from 'src/app/validations/ValidateForm';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  request !: FormGroup;

  constructor(
    private service : AuthService, 
    private router : Router,
    private toast : NgToastService,
    private fb : FormBuilder) { }

  ngOnInit() 
  { 
    this.request = this.fb.group({
      Username: ['', Validators.required],
      Firstname: ['', Validators.required],
      Lastname: ['', Validators.required],
      Email: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  Signup()
  {
    if(this.request.valid)
    {
      this.service.Signup(this.request.value)
      .subscribe({
        next : (res) =>
        {
          this.toast.success({
            detail: 'SUCCESS',
            summary: res.message,
            duration: 5000
          });
          this.router.navigate(['login']);
        },
        error : (res) =>
        {
          this.toast.success({
            detail: 'ERROR',
            summary: 'Something went wrong',
            duration: 5000
          });
        }
      });
    }
    else
    {
      ValidateForm.validateAllFormFields(this.request);
    }
  }
}
