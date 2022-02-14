import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlyAdminService } from '../admin/services/only-admin.service';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

const routes: Routes = [
  { 
    path: 'dashboard',
    canActivate: [OnlyAdminService],
    data: { role: 'admin' },
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'edit/user/:token',
        component: EditUserComponent
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AdminRoutingModule { }
