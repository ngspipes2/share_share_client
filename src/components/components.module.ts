import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app/material.module';

import { UtilsModule } from './utils/utils.module';
import { ImageModule } from './image/image.module';
import { DialogModule } from './dialog/dialog.module';
import { HeaderModule } from './header/header.module';
import { BodyModule } from './body/body.module';

import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';

import { AuthGuard } from '../services/auth-guard.service';
import { RepositoriesConfigComponent } from './body/repositories-config/repositories-config.component';
import { AccessTokensComponent } from './body/access-tokens/access-tokens.component';
import { LoginComponent } from './body/login/login.component';
import { UserComponent } from './body/user/user.component';
import { GroupComponent } from './body/group/group.component';
import { RepositoryComponent } from './body/repository/repository.component';

import { OperationsManager } from './operations.manager';

const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'repositoriesconfig', component: RepositoriesConfigComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'mytokens', component: AccessTokensComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'users/:userName', component: UserComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'groups/:groupName', component : GroupComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'repositories/:repositoryName', component : RepositoryComponent, pathMatch: 'full', canActivate: [AuthGuard] }
];

@NgModule({
    declarations: [ ],
    imports: [
        RouterModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterModule.forRoot(appRoutes /*,{enableTracing: true//debugging purposes only}*/),
        UtilsModule,
        ImageModule,
        DialogModule,
        HeaderModule,
        BodyModule
    ],
    exports: [
        RouterModule,
        HeaderComponent,
        BodyComponent
    ],
    providers: [
        OperationsManager
    ],
    entryComponents : [
    ]
})

export class ComponentsModule { }
