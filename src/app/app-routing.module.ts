import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchiveComponent } from './components/archive/archive.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NotecontainerComponent } from './components/notecontainer/notecontainer.component';
import { SignupComponent } from './components/signup/signup.component';
import { TrashComponent } from './components/trash/trash.component';

const routes: Routes = [{
  path:"",
  component:LoginComponent
},
{
  path:"signup",
  component:SignupComponent
},
{
  path:"dashboard",
  component:DashboardComponent,
  children:[
    {
      path:'notes',
      component:NotecontainerComponent
    },
    {
      path:'archive',
      component:ArchiveComponent
    },
    {
      path:'trash',
      component:TrashComponent
    }
  ]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
