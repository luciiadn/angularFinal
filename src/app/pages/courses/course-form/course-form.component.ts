import { Component, OnInit, Inject} from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styles: [
  ]
})
export class CourseFormComponent implements OnInit {

private course_id: number | null | undefined;

courseForm: FormGroup = this.fb.nonNullable.group({
  name: ['', Validators.required],
  teacher: ['', Validators.required],
  number_classes: [Validators.required],
  class_duration: [Validators.required],
});

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private CoursesService: CoursesService
  ) { }

  ngOnInit(): void {

    if(this.data.course_id){

      this.patchCourseForm(this.data.course_id);

    }
  }
  patchCourseForm(course_id: number){
    this.CoursesService.getById(course_id).subscribe( course => this.courseForm.patchValue(course));
  }
}
