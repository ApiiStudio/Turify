import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthLogin } from '../../services/auth-login';
import { User } from '../../services/user';

@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements OnInit {
  userData?: User;
  userLoginOn: boolean = false;
  constructor(private AuthLogin: AuthLogin) {
  }
  ngOnInit(): void {
    this.AuthLogin.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });

    this.AuthLogin.currentUserData.subscribe({
      next:(userData) => {
        this.userData=userData;
      }
    })
  }
}
