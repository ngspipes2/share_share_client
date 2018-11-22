import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../app/material.module';

import { UtilsModule } from '../../utils/utils.module';

import { RepositoryProfileModule } from './repository-profile/repository-profile.module';
import { RepositoryMembersModule } from './repository-members/repository-members.module';

import { RepositoryComponent } from './repository.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RepositoryProfileModule,
    RepositoryMembersModule,
    UtilsModule
  ],
  declarations: [
      RepositoryComponent
  ],
  exports: [
      RepositoryComponent
  ]
})
export class RepositoryModule { }
