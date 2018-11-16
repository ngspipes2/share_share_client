import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { GroupService } from '../../../services/group.service';

@Component({
    selector: 'app-select-group-dialog',
    templateUrl: './select-group-dialog.component.html',
    styleUrls: ['./select-group-dialog.component.scss']
})
export class SelectGroupDialogComponent implements OnInit {

    groupNames : string[] = [];

    groupSubscription : any;

    control = new FormControl();
    filteredOptions: Observable<any[]>;
    loading : boolean;



    constructor(private groupService : GroupService,
                private dialogRef : MatDialogRef<SelectGroupDialogComponent>) { }



    ngOnInit() {
        this.filteredOptions = this.control.valueChanges.pipe(
          startWith(''),
          map(value => this.filter(value))
        );

        this.groupSubscription = this.groupService.groupEvent.subscribe(() => this.loadGroupNames());

        this.loadGroupNames();
    }

    ngOnDestroy() {
        this.groupSubscription.unsubscribe();
    }

    filter(value: string): any[] {
        const filterValue = value.toLowerCase();
        return this.groupNames.filter(name => name.toLowerCase().indexOf(filterValue) !== -1);
    }

    loadGroupNames() {
        this.loading = true;

        this.groupService.getGroupsNames()
        .then(groupNames => {
            this.loading = false;
            this.groupNames = groupNames;
        })
        .catch(error => {
            this.loading = false;
            console.error(error);
        });
    }

}
