import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TokenDetailsModule } from './token-details/token-details.module';
import { TokensListModule } from './tokens-list/tokens-list.module';

import { AccessTokensComponent } from './access-tokens.component';

@NgModule({
  imports: [
    CommonModule,
    TokenDetailsModule,
    TokensListModule
  ],
  declarations: [
      AccessTokensComponent
  ],
  exports: [
      AccessTokensComponent
  ]
})
export class AccessTokensModule { }
