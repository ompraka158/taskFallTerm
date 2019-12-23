import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material-module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ModalComponent } from './components/modal/modal.component';import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [DashboardComponent, ModalComponent],
  exports: [DashboardComponent, ModalComponent]
})
export class CoreModule { }
