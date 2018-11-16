import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { UserService } from '../../../services/user.service';

@Component({
    selector: 'app-select-user-dialog',
    templateUrl: './select-user-dialog.component.html',
    styleUrls: ['./select-user-dialog.component.scss']
})
export class SelectUserDialogComponent implements OnInit, OnDestroy {

    userNames : string[] = [];

    userSubscription : any;

    control = new FormControl();
    filteredOptions: Observable<any[]>;
    loading : boolean;



    constructor(private userService : UserService,
                private dialogRef : MatDialogRef<SelectUserDialogComponent>) { }



    ngOnInit() {
        this.filteredOptions = this.control.valueChanges.pipe(
          startWith(''),
          map(value => this.filter(value))
        );

        this.userSubscription = this.userService.userEvent.subscribe(() => this.loadUserNames());

        this.loadUserNames();
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }

    filter(value: string): any[] {
        const filterValue = value.toLowerCase();
        return this.userNames.filter(name => name.toLowerCase().indexOf(filterValue) !== -1);
    }

    loadUserNames() {
        this.loading = true;

        this.userService.getUsersNames()
        .then(userNames => {
            this.loading = false;
            this.userNames = userNames;
        })
        .catch(error => {
            this.loading = false;
            console.error(error);
        });
    }

}
