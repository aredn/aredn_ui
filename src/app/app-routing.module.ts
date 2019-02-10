import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NodesPageComponent } from './nodes-page/nodes-page.component';
import { StatusPageComponent } from './status-page/status-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'status',
        pathMatch: 'full'
      },
      {
        path: 'status',
        component: StatusPageComponent
      },
      {
        path: 'nodes',
        component: NodesPageComponent
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
