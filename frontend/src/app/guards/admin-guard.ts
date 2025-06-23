import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthLogin } from '../services/auth-login/auth-login';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authLogin: AuthLogin, private router: Router) {}

  canActivate(): boolean {
    const user = this.authLogin.currentUserData.value;
    if (user && user.role === 'admin') {
      return true;
    }

    // 🔒 No autorizado → redirigir a inicio o login
    this.router.navigate(['/restringido']);
    return false;
  }
}