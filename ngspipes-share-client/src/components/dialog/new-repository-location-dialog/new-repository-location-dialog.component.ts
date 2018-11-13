import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-new-repository-location-dialog',
    templateUrl: './new-repository-location-dialog.component.html',
    styleUrls: ['./new-repository-location-dialog.component.scss']
})
export class NewRepositoryLocationDialogComponent {

    location : string;



    constructor(private dialogRef : MatDialogRef<NewRepositoryLocationDialogComponent>) { }



    okClicked() {
        this.dialogRef.close(this.location);
    }

}
