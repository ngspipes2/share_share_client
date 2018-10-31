import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { UserService } from '../../../services/user.service';
import { GroupService } from '../../../services/group.service';
import { DialogManager } from '../../dialog/dialog.manager';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {

    userNames : string[] = [];
    groupNames : string[] = [];
    entities : any[] = [];

    userEventSubscription : any;
    groupEventSubscription : any;

    entitiesControl = new FormControl();
    filteredOptions: Observable<any[]>;



    constructor(private dialogManager : DialogManager,
                private userService : UserService,
                private groupService : GroupService) { }



    ngOnInit() {
        this.filteredOptions = this.entitiesControl.valueChanges.pipe(
          startWith(''),
          map(value => this.filter(value))
        );

        this.userEventSubscription = this.userService.userEvent.subscribe(() => this.loadUserNames());
        this.groupEventSubscription = this.groupService.groupEvent.subscribe(() => this.loadGroupNames());

        this.loadUserNames();
        this.loadGroupNames();
    }

    ngOnDestroy() {
        this.userEventSubscription.unsubscribe();
        this.groupEventSubscription.unsubscribe();
    }

    filter(value: string): any[] {
        const filterValue = value.toLowerCase();
        return this.entities.filter(entity => entity.name.toLowerCase().indexOf(filterValue) !== -1);
    }

    loadUserNames() {
        this.userService.getUsersNames()
        .then(userNames => {
            this.userNames = userNames;
            this.buildEntities();
        })
        .catch(error => {
            this.dialogManager.openErrorDialog("Error getting users names!", error);
            console.error(error);
        });
    }

    loadGroupNames() {
        this.groupService.getGroupsNames()
        .then(groupNames => {
            this.groupNames = groupNames;
            this.buildEntities();
        })
        .catch(error => {
            this.dialogManager.openErrorDialog("Error getting groups names!", error);
            console.error(error);
        });
    }

    buildEntities() {
        this.entities = [];

        this.userNames.forEach(name => this.entities.push({type: "USER", name : name}));
        this.groupNames.forEach(name => this.entities.push({type: "GROUP", name : name}));

        this.entities = this.entities.sort((a,b) => {
            if (a.name < b.name)
                return -1;
            if (a.name > b.name)
                return 1;

            return 0;
        });
    }

}