import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material-module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ModalComponent } from './components/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    NgbModule
  ],
  declarations: [DashboardComponent, ModalComponent],
  exports: [DashboardComponent, ModalComponent, 
    NgbModule],
  entryComponents: [ModalComponent]
})
export class CoreModule { }
