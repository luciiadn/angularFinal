import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
})
export class StudentFormComponent {

  studentForm = this.fb.group({
    first_name: ['', [Validators.required, Validators.minLength(3)]],
    last_name: ['', [Validators.required, Validators.minLength(3)]],
    house: [, [Validators.required]]
  });

  get first_name() { return this.studentForm.get('first_name') }
  get last_name() { return this.studentForm.get('last_name') }
  get house() { return this.studentForm.get('house') }

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  submit(){
     if(this.studentForm.invalid){
      return
     }

     this.dialogRef.close(this.studentForm.value)
  }

  getErrorMessage(controlName: string){
    const control = this.studentForm.get(controlName);

    if(control?.hasError('required')){
      return 'El campo es requerido'
    }

    if(control?.hasError('minlength')){
      return 'Debe tener al menos 3 caracteres'
    }

    return false;
  }

}
