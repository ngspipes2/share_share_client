import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

import { AuthGuard } from './logic/services/auth-guard.service';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { SimpleDialogComponent } from './components/dialog/simple-dialog/simple-dialog.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'users/:userName', component: UserComponent, pathMatch: 'full', canActivate: [AuthGuard]}
];


@NgModule({
    declarations: [
        HeaderComponent,
        LoginComponent,
        UserComponent,
        SideNavComponent,
        SimpleDialogComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        RouterModule.forRoot(appRoutes /*,{enableTracing: true//debugging purposes only}*/)
    ],
    exports: [
        HeaderComponent,
        LoginComponent,
        UserComponent,
        SideNavComponent,
        SimpleDialogComponent,
        RouterModule
    ],
    entryComponents : [ SimpleDialogComponent ]
})

export class ComponentsModule { }
