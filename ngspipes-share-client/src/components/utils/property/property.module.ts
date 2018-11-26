import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../app/material.module';

import { PropertyComponent } from './property.component';
import { StringPropertyComponent } from './string-property/string-property.component';
import { NumberPropertyComponent } from './number-property/number-property.component';
import { DatePropertyComponent } from './date-property/date-property.component';
import { BooleanPropertyComponent } from './boolean-property/boolean-property.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
      PropertyComponent,
      StringPropertyComponent,
      NumberPropertyComponent,
      DatePropertyComponent,
      BooleanPropertyComponent
  ],
  exports: [
      PropertyComponent,
      StringPropertyComponent,
      NumberPropertyComponent,
      DatePropertyComponent,
      BooleanPropertyComponent
  ]
})
export class PropertyModule { }
