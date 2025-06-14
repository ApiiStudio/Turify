import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, BehaviorSubject, tap } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthLogin {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({id:0, email:''});

  constructor(private http:HttpClient) { }

  login(credential:LoginRequest):Observable<User>{
    return this.http.get<User>('/data/data.json').pipe(
      tap((userData: User) =>{
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);
      }),
      catchError(this.handleError)
    )
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producido un error', error.error);
    }
    else{
      console.error('Backend retorno el codigo de estado', error.status, error.error);
    }
    return throwError(() => Error('Algo falló. Por favor intenta nuevamente'));
  }
get userData():Observable<User>{
  return this.currentUserData.asObservable();
}
get userLoginOn():Observable<boolean>{
  return this.currentUserLoginOn.asObservable();
};

logout(){
  localStorage.clear();
}
}

