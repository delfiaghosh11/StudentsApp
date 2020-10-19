import { GraduateDetailsComponent } from './graduate-details/graduate-details.component';
import { CollegesComponent } from './colleges/colleges.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { DepartmentsComponent } from './departments/departments.component';
import { StudentsComponent } from './students/students.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'colleges', component: CollegesComponent },
  { path: 'departments/:cid', component: DepartmentsComponent },
  { path: 'students/:did', component: StudentsComponent },
  { path: 'details/:sid', component: StudentDetailsComponent },
  {
    path: 'graduates',
    loadChildren: () =>
      import('./graduates/graduates.module').then((m) => m.GraduatesModule),
  },
  { path: 'gradDetails/:gid', component: GraduateDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
