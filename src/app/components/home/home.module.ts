import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from 'src/app/shared/material.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    MaterialModule,
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
