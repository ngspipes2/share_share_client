import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MatToolbarModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule } from '@angular/material';

@NgModule({
    imports: [
        MatToolbarModule,
        MatGridListModule,
        MatInputModule,
        MatFormFieldModule,
        MatListModule,
        MatCardModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        MatMenuModule,
        MatIconModule,
        MatSidenavModule,
        MatExpansionModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatDialogModule  ],
    exports: [
        MatToolbarModule,
        MatGridListModule,
        MatInputModule,
        MatFormFieldModule,
        MatListModule,
        MatCardModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        MatMenuModule,
        MatIconModule,
        MatSidenavModule,
        MatExpansionModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatDialogModule  ]
})

export class MaterialModule { }
