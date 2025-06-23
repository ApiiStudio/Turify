import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthLogin } from '../../services/auth-login/auth-login';
import { User } from '../../services/user';
import { CarritoService } from '../../services/carrito/carrito-service';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {
  userData?: User;
  userLoginOn: boolean = false;
  isAdmin: boolean = false;
  userName: string = '';

  constructor(
    private AuthLogin: AuthLogin,
    private router: Router,
    public carritoService: CarritoService,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.AuthLogin.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = !!userLoginOn;
        this.cdRef.detectChanges();
      }
    });

    this.AuthLogin.currentUserData.subscribe({
      next: (userData) => {
        this.userData = userData && userData.email ? userData : undefined;
        this.userName = this.userData?.name || this.userData?.email || '';
        this.isAdmin = this.userData?.role === 'admin';
        this.cdRef.detectChanges();
      }
    });
  }
  logout() {
    this.AuthLogin.logout();
    // Limpia el estado local inmediatamente
    this.userData = undefined;
    this.userName = '';
    this.isAdmin = false;
    this.userLoginOn = false;
    this.cdRef.detectChanges();

    // Redirige después de logout
    this.router.navigate(['/inicio']);
  }
}
