import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { UserService } from '../../../services/user.service';
import { GroupService } from '../../../services/group.service';
import { RepositoryService } from '../../../services/repository.service';

import { OperationsManager } from '../../operations.manager';
import { Utils } from '../../utils/utils';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {

    userNames : string[] = [];
    groupNames : string[] = [];
    repositoryNames : string[] = [];
    entities : any[] = [];

    userEventSubscription : any;
    groupEventSubscription : any;
    repositorySubscription : any;

    entitiesControl = new FormControl();
    filteredOptions: Observable<any[]>;



    constructor(private userService : UserService,
                private repositoryService : RepositoryService,
                private groupService : GroupService,
                private operationsManager : OperationsManager,
                private router : Router) { }



    ngOnInit() {
        this.filteredOptions = this.entitiesControl.valueChanges.pipe(
          startWith(''),
          map(value => this.filter(value))
        );

        this.userEventSubscription = this.userService.userEvent.subscribe(() => this.loadUserNames());
        this.groupEventSubscription = this.groupService.groupEvent.subscribe(() => this.loadGroupNames());
        this.repositorySubscription = this.repositoryService.repositoryEvent.subscribe(() => this.loadRepositoryNames());

        this.loadUserNames();
        this.loadGroupNames();
        this.loadRepositoryNames();
    }

    ngOnDestroy() {
        this.userEventSubscription.unsubscribe();
        this.groupEventSubscription.unsubscribe();
        this.repositorySubscription.unsubscribe();
    }

    filter(value: any): any[] {
        if(value && value.name)
            return [];

        const filterValue = value.toLowerCase();
        return this.entities.filter(entity => entity.name.toLowerCase().indexOf(filterValue) !== -1);
    }

    loadUserNames() {
        this.operationsManager.getUsersNames()
        .then(userNames => {
            this.userNames = userNames;
            this.buildEntities();
        });
    }

    loadGroupNames() {
        this.operationsManager.getGroupsNames()
        .then(groupNames => {
            this.groupNames = groupNames;
            this.buildEntities();
        });
    }

    loadRepositoryNames() {
        this.operationsManager.getRepositoriesNames()
        .then(repositoryNames => {
            this.repositoryNames = repositoryNames;
            this.buildEntities();
        });
    }

    buildEntities() {
        this.entities = [];

        this.userNames.forEach(name => this.entities.push({type: "USER", name : name}));
        this.groupNames.forEach(name => this.entities.push({type: "GROUP", name : name}));
        this.repositoryNames.forEach(name => this.entities.push({type: "REPOSITORY", name : name}));

        this.entities = Utils.sort(this.entities, entity => entity.name);
    }

    optionSelected(entity : any) {
        if(entity.type === "USER")
            this.router.navigate(["/users/" + entity.name]);
        else if(entity.type === "GROUP")
            this.router.navigate(["/groups/" + entity.name]);
        else if(entity.type === "REPOSITORY")
            this.router.navigate(["/repositories/" + entity.name]);
        else
            console.error("Unkown entity type " + entity.type);
    }

    entityToString(entity : any) : string {
        if(!entity)
            return entity;

        return entity.name;
    }

}
