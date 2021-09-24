import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAppointmentPageRoutingModule } from './view-appointment-routing.module';

import { ViewAppointmentPage } from './view-appointment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAppointmentPageRoutingModule
  ],
  declarations: [ViewAppointmentPage]
})
export class ViewAppointmentPageModule {}
