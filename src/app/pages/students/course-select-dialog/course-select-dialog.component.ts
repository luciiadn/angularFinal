import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-course-select-dialog',
  templateUrl: './course-select-dialog.component.html',
  styles: [
  ]
})
export class CourseSelectDialogComponent {

  selectedCourse: number = 0;
  courses;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.courses = this.data.courses;
  }


}
