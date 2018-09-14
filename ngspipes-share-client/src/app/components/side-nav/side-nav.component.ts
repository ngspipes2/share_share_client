import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";

import { Group } from '../../logic/domain/group';
import { ToolsRepository } from '../../logic/domain/tools-repository';
import { PipelinesRepository } from '../../logic/domain/pipelines-repository';
import { GroupService } from '../../logic/services/group.service';
import { ToolsRepositoryService } from '../../logic/services/tools-repository.service';
import { PipelinesRepositoryService } from '../../logic/services/pipelines-repository.service';
import { SessionService } from '../../logic/services/session.service';
import { DialogService } from '../dialog/dialog.service';

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



    constructor(private groupService : GroupService,
                private toolsRepositoryService : ToolsRepositoryService,
                private pipelinesRepositoryService : PipelinesRepositoryService,
                private sessionService : SessionService,
                private dialogService : DialogService,
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

        this.groupsSubscription = this.groupService.groupEvent.subscribe(() => {
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

        this.groupService.getGroupsOfUser(userName)
        .then((groups) => {
            this.loadingGroups = false;
            this.groups = groups;
        })
        .catch((error) => {
            this.loadingGroups = false;
            this.dialogService.openErrorDialog("Error", "Error getting Groups of " + userName);
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
            this.dialogService.openErrorDialog("Error", "Error getting Tools Repositories of " + userName);
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
            this.dialogService.openErrorDialog("Error", "Error getting Pipelines Repositories of " + userName);
            console.error(error);
        });
    }

    createGroupClick() {
        this.dialogService.openNewGroupNameDialog().afterClosed().subscribe((groupName) => {
            if(!groupName)
                return;

            this.loadingGroups = true;

            let owner = this.sessionService.getCurrentCredentials()[0];
            let group = new Group(groupName, "", new Date(), owner, []);

            this.groupService.createGroup(group)
            .then(() => {
                this.loadingGroups = false;
                this.dialogService.openSuccessDialog("New Group created successfully!", "");
                this.router.navigate(['/groups/' + groupName]);
            })
            .catch((error) => {
                this.loadingGroups = false;
                this.dialogService.openErrorDialog("Error creating new Group!", error);
            });
        });
    }

    createToolsRepositoryClick() {
        this.dialogService.openNewToolsRepositoryNameDialog().afterClosed().subscribe((repositoryName) => {
            if(!repositoryName)
                return;

            this.loadingToolsRepositories = true;

            let owner = this.sessionService.getCurrentCredentials()[0];
            let repository = new ToolsRepository(0, repositoryName, "", new Date(), false, owner, [], []);

            this.toolsRepositoryService.createRepository(repository)
            .then((id) => {
                this.loadingToolsRepositories = false;
                this.dialogService.openSuccessDialog("ToolsRepository created successfully!", "");
                this.router.navigate(['/toolsRepositories/' + id]);
            })
            .catch((error) => {
                this.loadingToolsRepositories = false;
                this.dialogService.openErrorDialog("Error creating ToolsRepository!", error);
            });
        });
    }

    createPipelinesRepositoryClick() {
        this.dialogService.openNewPipelinesRepositoryNameDialog().afterClosed().subscribe((repositoryName) => {
            if(!repositoryName)
                return;

            this.loadingPipelinesRepositories = true;

            let owner = this.sessionService.getCurrentCredentials()[0];
            let repository = new PipelinesRepository(0, repositoryName, "", new Date(), false, owner, [], []);

            this.pipelinesRepositoryService.createRepository(repository)
            .then((id) => {
                this.loadingPipelinesRepositories = false;
                this.dialogService.openSuccessDialog("PipelinesRepository created successfully!", "");
                this.router.navigate(['/pipelinesRepositories/' + id]);
            })
            .catch((error) => {
                this.loadingPipelinesRepositories = false;
                this.dialogService.openErrorDialog("Error creating PipelinesRepository!", error);
            });
        });
    }

}
