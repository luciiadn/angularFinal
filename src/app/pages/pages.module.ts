import { RoleGuard } from './../guards/role.guard';
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from './../layout/layout.module';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'inicio',
        component: HomeComponent
      },
      {
        path: 'inscripciones',
        canActivate: [RoleGuard],
        loadChildren: () =>
          import('./inscriptions/inscriptions.module').then(
            (m) => m.InscriptionsModule
          ),
      },
      {
        path: 'alumnos',
        loadChildren: () =>
          import('./students/students.module').then((m) => m.StudentsModule),
      },
      {
        path: 'cursos',
        loadChildren: () =>
          import('./courses/courses.module').then((m) => m.CoursesModule),
      },

    ]
  },

];

@NgModule({
  declarations: [HomeComponent, PagesComponent],
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule],
  exports: [RouterModule],
})
export class PagesModule {}
