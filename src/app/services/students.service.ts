import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../interfaces/student.interface';

const base_url = environment.base_url_2;

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(base_url);
  }

  getById(id: number): Observable<Student>{
    return this.http.get<Student>(`${base_url}/api/${id}`);
  }

  create(formData: Student): Observable<Student>{
    return this.http.post<Student>(base_url, formData);
  }

  update(id: number, formData: Student): Observable<Student>{
    return this.http.put<Student>(base_url + id, formData)
  }

  delete(id: number): Observable<Student>{
    return this.http.delete<Student>(base_url + id);
  }



}
