import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthLogin } from './services/auth-login/auth-login';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'app';
  constructor(private authLogin: AuthLogin) {
  const userData = localStorage.getItem('userData');
  const userLoginOn = localStorage.getItem('userLoginOn');

  if (userData && userLoginOn === 'true') {
    this.authLogin.currentUserData.next(JSON.parse(userData));
    this.authLogin.currentUserLoginOn.next(true);
  }
}
}
