import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoriesConfigComponent } from './repositories-config.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
      RepositoriesConfigComponent
  ],
  exports: [
      RepositoriesConfigComponent
  ]
})
export class RepositoriesConfigModule { }
