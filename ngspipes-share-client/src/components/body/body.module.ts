import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../app/material.module';
import { FormsModule } from '@angular/forms';

import { SideNavModule } from './side-nav/side-nav.module';
import { RepositoriesConfigModule } from './repositories-config/repositories-config.module';
import { AccessTokensModule } from './access-tokens/access-tokens.module';
import { LoginModule } from './login/login.module';
import { UserModule } from './user/user.module';

import { BodyComponent } from './body.component';

@NgModule({
    declarations: [
        BodyComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        SideNavModule,
        RepositoriesConfigModule,
        AccessTokensModule,
        LoginModule,
        UserModule
    ],
    exports: [
        BodyComponent
    ]
})
export class BodyModule { }
