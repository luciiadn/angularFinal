import { Inscriptions } from './../../../interfaces/student.interface';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { InscriptionsService } from 'src/app/services/inscriptions.service';

@Component({
  selector: 'app-inscriptions-index',
  templateUrl: './inscriptions-index.component.html',
  styleUrls: ['./inscriptions-index.component.css']
})
export class InscriptionsIndexComponent implements OnInit {

  dataSource = new MatTableDataSource<Inscriptions>();

  displayedColumns: string[] = [
    'id',
    'student_name',
    'course_name',

  ];

  constructor(
    private inscriptionsService: InscriptionsService
  ) { }

  ngOnInit(): void {

    this.getAllStudentsInscriptions();
  }

  getAllStudentsInscriptions(){
    this.inscriptionsService.getAllStudentsInscriptions().subscribe({
      next: (resp: Inscriptions[]) => {
        console.log(resp)
        this.dataSource.data = resp
      }
    })
  }

}
