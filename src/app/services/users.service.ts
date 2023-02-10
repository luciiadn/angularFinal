import { IUser } from './../auth/interfaces/api-reqres.interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url_1;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getAll(): Observable<IUser[]>{
    return this.http.get<IUser[]>(base_url + '/users')
  }

  getById(id: number): Observable<IUser>{
    return this.http.get<IUser>(`${base_url}/users/${id}`);
  }

  create(formData: IUser): Observable<IUser>{
    return this.http.post<IUser>(base_url + '/users', formData);
  }

  update(id: number, formData: IUser): Observable<IUser>{
    return this.http.put<IUser>(base_url + '/users/' + id, formData)
  }

  delete(id: number): Observable<IUser>{
    return this.http.delete<IUser>(base_url + '/users/' + id);
  }


}
