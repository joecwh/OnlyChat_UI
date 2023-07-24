import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserStoreService } from './services/user-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UI';
  currentYear : number = new Date().getFullYear();
  isLoggedIn : boolean = false;

  constructor(
    private service : AuthService, 
    private userStore : UserStoreService) { }

  ngOnInit() 
  { 
    this.isLoggedIn = this.service.IsLoggedIn();
  }

  Logout()
  {
    this.service.Logout();
  }
}
