import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';

//Components
import { AlertComponent } from './components/alert/alert.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [
    AlertComponent, 
    ConfirmationModalComponent
  ],
  imports: [
    CommonModule,
    AlertModule,
    ModalModule
  ],
  exports: [
    AlertComponent,
    ConfirmationModalComponent
  ],
})
export class SharableModule { }
