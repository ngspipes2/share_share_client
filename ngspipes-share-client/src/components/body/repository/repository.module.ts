import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepositoryProfileModule } from './repository-profile/repository-profile.module';
import { RepositoryMembersModule } from './repository-members/repository-members.module';

import { RepositoryComponent } from './repository.component';

@NgModule({
  imports: [
    CommonModule,
    RepositoryProfileModule,
    RepositoryMembersModule
  ],
  declarations: [
      RepositoryComponent
  ],
  exports: [
      RepositoryComponent
  ]
})
export class RepositoryModule { }
