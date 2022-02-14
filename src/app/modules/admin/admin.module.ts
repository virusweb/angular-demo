import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharableModule } from '../sharable/sharable.module';

//Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { EditUserComponent } from './components/edit-user/edit-user.component';

@NgModule({
  declarations: [
    DashboardComponent,
    EditUserComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharableModule
  ]
})
export class AdminModule { }
