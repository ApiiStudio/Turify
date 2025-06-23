import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, BehaviorSubject, tap } from 'rxjs';
import { User } from '../user';
import { SignupRequest } from './signup-request';

@Injectable({
  providedIn: 'root'
})

export class AuthSignupService {

  private apiUrl = 'https://turifyback.onrender.com/signup';
  currentUserSignIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({ id: 0, email: '' });

  constructor(private http: HttpClient) { }

  signup(credential: SignupRequest): Observable<User> {
    return this.http.post<User>(this.apiUrl, credential).pipe(
      tap((userData: User) => {
        this.currentUserData.next(userData);
        this.currentUserSignIn.next(true);
      }),
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error', error.error);
    }
    else {
      console.error('Backend retorno el codigo de estado', error.status, error.error);
    }
    return throwError(() => Error('Algo falló. Por favor intenta nuevamente'));
  }
  get userData(): Observable<User> {
    return this.currentUserData.asObservable();
  }
}
