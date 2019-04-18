import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../app/material.module';
import { ImageModule } from '../../image/image.module';
import { UtilsModule } from '../../utils/utils.module';

import { ProfileOptionComponent } from './profile-option/profile-option.component';
import { LogoutOptionComponent } from './logout-option/logout-option.component';
import { DeleteAccountOptionComponent } from './delete-account-option/delete-account-option.component';
import { ThemeOptionComponent } from './theme-option/theme-option.component';
import { ChangePasswordOptionComponent } from './change-password-option/change-password-option.component';
import { MyTokensOptionComponent } from './my-tokens-option/my-tokens-option.component';
import { RepositoriesConfigOptionComponent } from './repositories-config-option/repositories-config-option.component';

import { ProfileButtonComponent } from './profile-button.component';
import { HelpOptionComponent } from './help-option/help-option.component';

@NgModule({
  declarations: [
      ProfileOptionComponent,
      LogoutOptionComponent,
      DeleteAccountOptionComponent,
      ThemeOptionComponent,
      ChangePasswordOptionComponent,
      MyTokensOptionComponent,
      RepositoriesConfigOptionComponent,
      ProfileButtonComponent,
      HelpOptionComponent
  ],
  imports: [
      MaterialModule,
      CommonModule,
      ImageModule,
      UtilsModule
  ],
  exports : [
      ProfileButtonComponent
  ]
})
export class ProfileButtonModule { }
