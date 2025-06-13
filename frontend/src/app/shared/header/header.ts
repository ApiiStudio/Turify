import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthLogin } from '../../services/auth-login';
import { User } from '../../services/user';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit{
  userData?: User;
  userLoginOn:boolean=false;
  constructor(private AuthLogin:AuthLogin, private router: Router) {}

  ngOnInit(): void {
    this.AuthLogin.currentUserLoginOn.subscribe({
        next:(userLoginOn) => {
          this.userLoginOn=userLoginOn
        }
      });

    this.AuthLogin.currentUserData.subscribe({
      next:(userData) => {
        this.userData=userData;
      }
    })
  }
  logout(){
    this.AuthLogin.logout();
    this.router.navigate(['/auth']);
  }
}
