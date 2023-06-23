import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PrintPageComponent } from './components/print-page/print-page.component';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { ReadTableComponent } from './components/read-table/read-table.component';
import { CmarksComponent } from './cmarks/cmarks.component';
import { RmarksComponent } from './rmarks/rmarks.component';
import { CfeesComponent } from './cfees/cfees.component';
import { RfeesComponent } from './rfees/rfees.component';
const routes: Routes = [
{
  path: '', component: LoginComponent
},{
  path: 'Dashboard', component: DashboardComponent
},
{
  path: 'create', component: CreateFormComponent
},
{
  path: 'read', component: ReadTableComponent
},
{
  path:'cmarks',component: CmarksComponent
},
{
  path:'rmarks',component: RmarksComponent
},
{
  path:'cfees',component:CfeesComponent
},
{
  path:'rfees',component:RfeesComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
