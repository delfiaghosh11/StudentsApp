import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraduatesRoutingModule } from './graduates-routing.module';
import { GraduatesComponent } from './graduates.component';
import { DataService } from '../services/data.service';

@NgModule({
  declarations: [GraduatesComponent],
  imports: [
    CommonModule,
    GraduatesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [DataService],
})
export class GraduatesModule {}
