import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
    loadEvent : Subject<any> = new Subject();



    constructor(private userService : UserService,
                private dialogRef : MatDialogRef<SelectUserDialogComponent>) { }



    ngOnInit() {
        this.filteredOptions = this.control.valueChanges.pipe(
          startWith(''),
          map(value => this.filter(value))
        );

        this.userSubscription = this.userService.userEvent.subscribe(() => this.loadEvent.next());

        setTimeout(() => this.loadEvent.next());
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }

    filter(value: string): any[] {
        const filterValue = value.toLowerCase();
        return this.userNames.filter(name => name.toLowerCase().indexOf(filterValue) !== -1);
    }

    load() : Promise<any> {
        return this.userService.getUsersNames()
        .then(userNames => this.userNames = userNames)
        .catch(error => {
            this.dialogRef.close({
                result: null,
                error: "Error getting Users names! " + error
            });
        });
    }

    select(userName : string) {
        this.dialogRef.close({
            result: userName,
            error: null
        });
    }

}
