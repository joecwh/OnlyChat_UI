import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageComponent } from './components/message/message.component';
import { UserComponent } from './components/user/user.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { 
    path : '', 
    component : LoginComponent 
  },
  {
    path : 'message',
    component : MessageComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'about',
    component : AboutComponent
  },
  {
    path : 'user',
    component : UserComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'register',
    component : RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
