import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { LogginForm, LogginSuccessful, UserDto } from './../interfaces/api-reqres.interfaces';
import { BehaviorSubject, map, mergeMap, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api_auth_url = environment.api_auth_url;
  rolTypes: string[] = ['Usuario', 'Administrador'];

  private user = new BehaviorSubject<User | null>(null);
  public user$ = this.user.asObservable();

  constructor(private http: HttpClient) {}

  private _rol: string = '';

  get rol(): string {
    return this._rol;
  }

  set rol(value: string) {
    this._rol = value;
  }

  login(userLoggin: LogginForm): Observable<User> {
   
    const { email, password } = userLoggin;
    const dataLoggin = { email, password };

    return this.http
      .post<LogginSuccessful>(this.api_auth_url + '/login', dataLoggin)
      .pipe(
        tap((data) => {
          localStorage.setItem('user', data.token);
        }),
        
        mergeMap(() => this.http.get<UserDto>(this.api_auth_url + '/users/5')),
        map(({ data }) => {
          const user = new User(
            data.id,
            data.email,
            data.first_name,
            data.last_name,
            data.avatar,
            userLoggin.rol
          );

          localStorage.setItem('user', JSON.stringify(user));

          return user;
        }),
        tap((user) => this.setUser(user))
      );
  }

  isLogin() {
    if (!localStorage.getItem('user')) {
      return false;
    }

    this.user.next(JSON.parse(localStorage.getItem('user')!));

    return true;
  }

  setUser(user: User) {
  
    this.rol = user.rol;
    this.user.next(user);
  }

  logOut() {
    localStorage.removeItem('user');
    return true;
  }

  getRoles() {
    return this.rolTypes;
  }
}
