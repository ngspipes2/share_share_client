import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";

import { Group } from '../../logic/domain/group';
import { ToolsRepository } from '../../logic/domain/tools-repository';
import { PipelinesRepository } from '../../logic/domain/pipelines-repository';
import { GroupService } from '../../logic/services/group.service';
import { ToolsRepositoryService } from '../../logic/services/tools-repository.service';
import { PipelinesRepositoryService } from '../../logic/services/pipelines-repository.service';
import { SessionService } from '../../logic/services/session.service';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {

    loginSubscription : any;
    logoutSubscription : any;
    groupsSubscription : any;
    toolsRepositorySubscription : any;
    pipelinesRepositorySubscription : any;

    loadingGroups : boolean;
    loadingToolsRepositories : boolean;
    loadingPipelinesRepositories : boolean;

    groups : Group[];
    toolsRepositories : ToolsRepository[];
    pipelinesRepositories : PipelinesRepository[];



    constructor(private groupServive : GroupService,
                private toolsRepositoryService : ToolsRepositoryService,
                private pipelinesRepositoryService : PipelinesRepositoryService,
                private sessionService : SessionService,
                private router : Router) { }



    ngOnInit() {
        this.loginSubscription = this.sessionService.loginEvent.subscribe(() => {
            this.load();
        });

        this.logoutSubscription = this.sessionService.logoutEvent.subscribe(() => {
            this.groups = undefined;
            this.toolsRepositories = undefined;
            this.pipelinesRepositories = undefined;
        });

        this.groupsSubscription = this.groupServive.groupEvent.subscribe(() => {
            this.loadGroups();
        });

        this.toolsRepositorySubscription = this.toolsRepositoryService.toolsRepositoryEvent.subscribe(() => {
            this.loadToolsRepositories();
        });

        this.pipelinesRepositorySubscription = this.pipelinesRepositoryService.pipelinesRepositoryEvent.subscribe(() => {
            this.loadPipelinesRepositories();
        });

        if(this.sessionService.getCurrentCredentials())
            this.load();
    }

    ngOnDestroy() {
        this.loginSubscription.unsubscribe();
        this.logoutSubscription.unsubscribe();
        this.groupsSubscription.unsubscribe();
        this.toolsRepositorySubscription.unsubscribe();
        this.pipelinesRepositorySubscription.unsubscribe();
    }

    load() {
        this.loadGroups();
        this.loadToolsRepositories();
        this.loadPipelinesRepositories();
    }

    loadGroups() {
        this.loadingGroups = true;

        let userName = this.sessionService.getCurrentCredentials()[0];

        this.groupServive.getGroupsOfUser(userName)
        .then((groups) => {
            this.loadingGroups = false;
            this.groups = groups;
        })
        .catch((error) => {
            this.loadingGroups = false;
            window.alert("Error getting Groups of " + userName);
            console.error(error);
        });
    }

    loadToolsRepositories() {
        this.loadingToolsRepositories = true;

        let userName = this.sessionService.getCurrentCredentials()[0];

        this.toolsRepositoryService.getRepositoriesOfUser(userName)
        .then((repositories) => {
            this.loadingToolsRepositories = false;
            this.toolsRepositories = repositories;
        })
        .catch((error) => {
            this.loadingToolsRepositories = false;
            window.alert("Error getting Tools Repositories of " + userName);
            console.error(error);
        });
    }

    loadPipelinesRepositories() {
        this.loadingPipelinesRepositories = true;

        let userName = this.sessionService.getCurrentCredentials()[0];

        this.pipelinesRepositoryService.getRepositoriesOfUser(userName)
        .then((repositories) => {
            this.loadingPipelinesRepositories = false;
            this.pipelinesRepositories = repositories;
        })
        .catch((error) => {
            this.loadingPipelinesRepositories = false;
            window.alert("Error getting Pipelines Repositories of " + userName);
            console.error(error);
        });
    }

    createGroupClick() {
        this.router.navigate(['/createGroup']);
    }

    createToolsRepositoryClick() {
        this.router.navigate(['/createToolsRepository']);
    }

    createPipelinesRepositoryClick() {
        this.router.navigate(['/createPipelinesRepository']);
    }

}
