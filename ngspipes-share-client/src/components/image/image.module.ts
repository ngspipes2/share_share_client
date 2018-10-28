import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../app/material.module';


import { UserImageComponent } from './user-image/user-image.component';

@NgModule({
  declarations: [
      UserImageComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      MaterialModule
  ],
  exports : [
      UserImageComponent
  ]
})
export class ImageModule { }
