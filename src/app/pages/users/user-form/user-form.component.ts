import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styles: [
  ]
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup = this.fb.nonNullable.group({
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    telephone_number: [, [Validators.required, Validators.pattern(/^\d+$/)]],
    address: ['', [Validators.required]],
    rol: ['', [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if(this.data.user_id){
      this.getUserData();
    }
  }

  getUserData(){
    this.usersService.getById(this.data.user_id).subscribe( user => {
      this.userForm.patchValue(user);
    })
  }

  getErrorMessage(controlName: string){
    const control = this.userForm.get(controlName);

    if(control?.hasError('required')){
      return 'El campo es requerido';
    }

    if (control?.hasError('minlength')) {
      const length = control?.getError('minlength').requiredLength;
      return `Debe tener al menos ${length} caracteres`;
    }

    if(control?.hasError('email')){
      return `Debe ser un email válido`
    }

    if(control?.getError('pattern')){
      return `Debe ingresar sólo números  `
    }

    return false;

  }

}
