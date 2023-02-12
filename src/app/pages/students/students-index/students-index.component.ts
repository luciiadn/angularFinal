import { Component, OnInit, ViewChild } from '@angular/core';
import { Student } from 'src/app/interfaces/student.interface';
import { StudentsService } from 'src/app/services/students.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormComponent } from '../student-form/student-form.component';

@Component({
  selector: 'app-students',
  templateUrl: './students-index.component.html',
  styleUrls: ['./students-index.component.scss']
})
export class StudentsIndexComponent implements OnInit {

  public loading: boolean = true;
  public students: Student[] = [];
  public displayedColumns: string[] = ['id', 'first_name', 'last_name', 'house',  'actions'];
  public dataSource = new MatTableDataSource<Student>();

  constructor(
    private studentsService: StudentsService,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.studentsService.getAll().subscribe({
      next: (resp) => {
        this.dataSource = new MatTableDataSource<Student>(resp);
        this.loading = false;
      },
      error: (err) => console.log(err)
    })
  }

  openDialogStudentForm() {
    
    const dialogRef = this.dialog.open(StudentFormComponent, {
      data: {title: 'Agregar Alumno'}
    })

    dialogRef.afterClosed().subscribe( (data: Student | null) => {
      if(data){
       
       this.studentsService.create(data).subscribe({
        next: (resp) => {
          this.getAll();
        },
        error: (err) => console.log(err)
       });
      }
    });
  }

  deleteStudent(id: number){
    this.studentsService.delete(id).subscribe({
      next: (resp) => {
        this.getAll();
      },
      error: (err) => console.log(err)
     });

  }

}
