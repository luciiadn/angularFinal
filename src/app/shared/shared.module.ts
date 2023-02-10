import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogAlertComponent } from './components/dialog-alert/dialog-alert.component';
import { AccessDirective } from './directives/access.directive';



@NgModule({
  declarations: [
    DialogAlertComponent,
    AccessDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    AccessDirective
  ]
})
export class SharedModule { }
