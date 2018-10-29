import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../app/material.module';
import { ImageModule } from '../../image/image.module';

import { ProfileOptionComponent } from './profile-option/profile-option.component';
import { LogoutOptionComponent } from './logout-option/logout-option.component';
import { DeleteAccountOptionComponent } from './delete-account-option/delete-account-option.component';
import { ThemeOptionComponent } from './theme-option/theme-option.component';
import { ChangePasswordOptionComponent } from './change-password-option/change-password-option.component';

import { ProfileButtonComponent } from './profile-button.component';

@NgModule({
  declarations: [
      ProfileOptionComponent,
      LogoutOptionComponent,
      DeleteAccountOptionComponent,
      ThemeOptionComponent,
      ChangePasswordOptionComponent,
      ProfileButtonComponent
  ],
  imports: [
      MaterialModule,
      CommonModule,
      ImageModule
  ],
  exports : [
      ProfileButtonComponent
  ]
})
export class ProfileButtonModule { }
