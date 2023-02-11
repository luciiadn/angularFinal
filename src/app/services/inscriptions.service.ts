import { Course } from 'src/app/interfaces/courses.interface';
import {
  StudentInscription,
  Inscriptions,
  Student,
} from './../interfaces/student.interface';
import { forkJoin, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url_1 = environment.base_url_1;
const base_url_2 = environment.base_url_2;

@Injectable({
  providedIn: 'root',
})
export class InscriptionsService {
  constructor(private http: HttpClient) {}

  getAllStudentsInscriptions(): Observable<Inscriptions[]> {
    return forkJoin([
      this.http.get<Inscriptions[]>(base_url_2 ),
      this.http.get<Student[]>(base_url_2 ),
      this.http.get<Course[]>(base_url_1 ),
    ]).pipe(
      map(([inscriptions, students, courses]) => {
        return inscriptions.map((inscription) => {
          const student = students.find((s) => s.id == inscription.student_id);
          const course = courses.find((c) => c.id == inscription.course_id);
          return {
            ...inscription,
            student_name: student?.first_name + ' ' + student?.last_name,
            course_name: course?.name
          };
        });
      })
    );
  }
  getInscriptionsByStudentId(
    student_id: number
  ): Observable<StudentInscription[]> {
    return forkJoin([
      this.http.get<StudentInscription[]>(base_url_2 ),
      this.http.get<Course[]>(base_url_1 ),
    ]).pipe(
      map(([inscriptions, courses]) => {
        return inscriptions
          .filter((inscription) => inscription.student_id === student_id)
          .map((inscription) => {
            const course = courses.find((c) => c.id === inscription.course_id);
            return { ...inscription, course: course?.name };
          });
      })
    );
  }

  getInscriptionsByCourseId(
    course_id: number
  ): Observable<StudentInscription[]> {
    return this.http
      .get<StudentInscription[]>(base_url_2 )
      .pipe(
        map((inscriptions) =>
          inscriptions.filter(
            (inscription) => inscription.course_id === course_id
          )
        )
      );
  }

  addInscription(course_id: number, student_id: number): Observable<any> {
    return this.http.post(base_url_2, {
      course_id,
      student_id,
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(base_url_2 + id);
  }
}
