import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { GroupService } from '../../../services/group.service';

@Component({
    selector: 'app-select-group-dialog',
    templateUrl: './select-group-dialog.component.html',
    styleUrls: ['./select-group-dialog.component.scss']
})
export class SelectGroupDialogComponent implements OnInit, OnDestroy {

    groupNames : string[] = [];

    groupSubscription : any;

    control = new FormControl();
    filteredOptions: Observable<any[]>;
    loadEvent : Subject<any> = new Subject();



    constructor(private groupService : GroupService,
                private dialogRef : MatDialogRef<SelectGroupDialogComponent>) { }



    ngOnInit() {
        this.filteredOptions = this.control.valueChanges.pipe(
          startWith(''),
          map(value => this.filter(value))
        );

        this.groupSubscription = this.groupService.groupEvent.subscribe(() => this.loadEvent.next());

        setTimeout(() => this.loadEvent.next());
    }

    ngOnDestroy() {
        this.groupSubscription.unsubscribe();
    }

    filter(value: string): any[] {
        const filterValue = value.toLowerCase();
        return this.groupNames.filter(name => name.toLowerCase().indexOf(filterValue) !== -1);
    }

    load() : Promise<any> {
        return this.groupService.getGroupsNames()
        .then(groupNames => this.groupNames = groupNames)
        .catch(error => {
            this.dialogRef.close({
                result: null,
                error: "Error getting Groups names! " + error
            });
        });
    }

    select(groupName : string) {
        this.dialogRef.close({
            result: groupName,
            error: null
        });
    }

}
