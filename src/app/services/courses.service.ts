import { Observable, forkJoin, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../interfaces/courses.interface';
import { StudentInscription } from '../interfaces/student.interface';

const base_url = environment.base_url_1;
const base_url_2 = environment.base_url_2;

@Injectable({
  providedIn: 'root',
})
export class CoursesService {

  constructor(private http: HttpClient) {}


  getAll(): Observable<Course[]>{
    return forkJoin([
      this.http.get<Course[]>(base_url + '/courses'),
      this.http.get<StudentInscription[]>(base_url_2 + '/inscriptions')
    ]).pipe(
      map( ([courses, inscriptions]) => {

        return courses.map( course => {
          course.count_inscriptions = inscriptions.filter( inscription => inscription.course_id === course.id ).length;
          return course;
        } )

      } )
    )
  }

  getById(id: number): Observable<Course>{
    return this.http.get<Course>(base_url + '/courses/' + id);
  }

  create(course: Course): Observable<Course>{
    return this.http.post<Course>(base_url + '/courses', course);
  }

  update(id: number, course: Course): Observable<Course>{
    return this.http.put<Course>(base_url + '/courses/' + id, course);
  }

  delete(id: number): Observable<Course>{
    return this.http.delete<Course>(base_url + '/courses/' + id);
  }

}
