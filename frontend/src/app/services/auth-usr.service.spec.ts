import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthUsrService {
  private validUser = { email: 'test@demo.com', password: '12345678' };
  private _currentUser = new BehaviorSubject<any>(null);
  currentUser$ = this._currentUser.asObservable();

login(email: string, password: string): Observable<boolean> {
  if (email === this.validUser.email && password === this.validUser.password) {
    this._currentUser.next({ email });
    return of(true);
  }
  return of(false);
}

  logout() {
    this._currentUser.next(null);
  }
}