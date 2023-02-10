import { MatTableModule } from '@angular/material/table';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { InscriptionsIndexComponent } from './inscriptions-index/inscriptions-index.component';


const routes: Routes = [
  {path: '', component: InscriptionsIndexComponent}
];

@NgModule({
  declarations: [
    InscriptionsIndexComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatTableModule
  ],
  exports: [RouterModule]
})
export class InscriptionsModule { }
