import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, tap, catchError, of } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class AuthLogin {
  private loginUrl = 'https://turifyback.onrender.com/login';
  private userUrl = 'https://turifyback.onrender.com/usuarios';

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({ id: 0, email: '' });

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('userData');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      this.currentUserData.next(parsedUser);
      this.currentUserLoginOn.next(true);
    } else {
      this.cargarUsuarioActual().subscribe(); // 👈 Cargar desde backend si existe sesión
    }
  }

  login(credential: LoginRequest): Observable<User> {
    return this.http.post<any>(this.loginUrl, credential).pipe(
      tap((userData: any) => {
        const user: User = {
          id: userData.user_id,
          email: userData.email || '',
          name: userData.name,
          lastName: userData.lastName,
          role: userData.role
        };
        this.currentUserData.next(user);
        this.currentUserLoginOn.next(true);
        localStorage.setItem('userData', JSON.stringify(user));
      }),
      catchError(this.handleError)
    );
  }

  // 👇 Nuevo método para cargar datos desde la API /usuarios (tipo GET)
  cargarUsuarioActual(): Observable<User | null> {
    return this.http.get<User>(`${this.userUrl}`).pipe(
      tap((user: User) => {
        this.currentUserData.next(user);
        this.currentUserLoginOn.next(true);
        localStorage.setItem('userData', JSON.stringify(user));
      }),
      catchError((err) => {
        console.warn('No se pudo recuperar la sesión desde el backend', err);
        return of(null); // Devuelve null para indicar que no hay sesión válida
      })
    );
  }

  logout(): void {
    localStorage.removeItem('userData');
    this.currentUserData.next({ id: 0, email: '' });
    this.currentUserLoginOn.next(false);
  }

  get userData(): Observable<User> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error:', error.error);
    } else {
      console.error('El backend retornó el código:', error.status, error.error);
    }
    return throwError(() => Error('Algo falló. Por favor intenta nuevamente.'));
  }
  getAuthHeaders(): HttpHeaders {
  const token = localStorage.getItem('token');
  return new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
}
}
