import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NodesPageComponent } from './nodes-page/nodes-page.component';
import { StatusPageComponent } from './status-page/status-page.component';
import { ScanPageComponent } from './scan-page/scan-page.component';
import { ChartsPageComponent } from './charts-page/charts-page.component';

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
        path: 'charts',
        component: ChartsPageComponent
      },
      {
        path: 'nodes',
        component: NodesPageComponent
      },
      {
        path: 'scan',
        component: ScanPageComponent
      },
      {
        path: 'status',
        component: StatusPageComponent
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
