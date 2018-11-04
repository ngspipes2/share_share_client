import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app/material.module';

import { ImageModule } from './image/image.module';
import { DialogModule } from './dialog/dialog.module';
import { HeaderModule } from './header/header.module';
import { BodyModule } from './body/body.module';

import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';

import { AuthGuard } from '../services/auth-guard.service';
import { RepositoriesConfigComponent } from './body/repositories-config/repositories-config.component';

const appRoutes: Routes = [
    { path: 'repositoriesconfig', component: RepositoriesConfigComponent, pathMatch: 'full', canActivate: [AuthGuard]},
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
    ],
    entryComponents : [
    ]
})

export class ComponentsModule { }
