import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../logic/domain/user';
import { Group } from '../../logic/domain/group';
import { ToolsRepository } from '../../logic/domain/tools-repository';
import { PipelinesRepository } from '../../logic/domain/pipelines-repository';
import { UserService } from '../../logic/services/user.service';
import { GroupService } from '../../logic/services/group.service';
import { ToolsRepositoryService } from '../../logic/services/tools-repository.service';
import { PipelinesRepositoryService } from '../../logic/services/pipelines-repository.service';
import { SessionService } from '../../logic/services/session.service';
import { DialogService } from '../dialog/dialog.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

    paramsSubscription : any;
    loginSubscription : any;
    logoutSubscription : any;
    userSubscription : any;
    groupSubscription : any;
    toolsRepositorySubscription : any;
    pipelinesRepositorySubscription : any;

    userName : string;
    editable : boolean;
    loadingUser : boolean;
    loadingGroups : boolean;
    loadingToolsRepositories : boolean;
    loadingPipelinesRepositories : boolean;

    user : User;
    groupsOfUser : Group[];
    toolsRepositoriesOfUser : ToolsRepository[];
    pipelinesRepositoriesOfUser : PipelinesRepository[];



    constructor(private userService : UserService,
                private groupService : GroupService,
                private toolsRepositoryService : ToolsRepositoryService,
                private pipelinesRepositoryService : PipelinesRepositoryService,
                private sessionService : SessionService,
                private activatedRoute : ActivatedRoute,
                private router : Router,
                private dialogService : DialogService) { }



    ngOnInit() {
        this.paramsSubscription = this.activatedRoute.params.subscribe(() => {
            this.userName = this.activatedRoute.snapshot.params.userName;
            this.load();
        });

        this.loginSubscription = this.sessionService.loginEvent.subscribe((credentails) => {
            this.checkEditable();
        });

        this.logoutSubscription = this.sessionService.logoutEvent.subscribe(() => {
            this.checkEditable();
        });

        this.userSubscription = this.userService.userEvent.subscribe((userName) => {
            if(this.userName === userName)
                this.loadUser();
        });

        this.groupSubscription = this.groupService.groupEvent.subscribe(() => {
            this.loadGroups();
        });

        this.toolsRepositorySubscription = this.toolsRepositoryService.toolsRepositoryEvent.subscribe(() => {
            this.loadToolsRepositories();
        });

        this.pipelinesRepositorySubscription = this.pipelinesRepositoryService.pipelinesRepositoryEvent.subscribe(() => {
            this.loadPipelinesRepositories();
        });

        this.userName = this.activatedRoute.snapshot.params.userName;
        this.load();
    }

    ngOnDestroy() {
        this.paramsSubscription.unsubscribe();

        this.loginSubscription.unsubscribe();
        this.logoutSubscription.unsubscribe();

        this.userSubscription.unsubscribe();
        this.groupSubscription.unsubscribe();
        this.toolsRepositorySubscription.unsubscribe();
        this.pipelinesRepositorySubscription.unsubscribe();
    }

    load() {
        this.checkEditable();
        this.loadUser();
        this.loadGroups();
        this.loadToolsRepositories();
        this.loadPipelinesRepositories();
    }

    checkEditable() {
        let credentials = this.sessionService.getCurrentCredentials();
        this.editable = credentials && credentials[0] === this.userName;
    }

    loadUser() {
        this.loadingUser = true;

        this.userService.getUser(this.userName)
        .then((user) => {
            this.loadingUser = false;

            this.user = user;

            if(!user)
                this.dialogService.openWarningDialog("Non existent user", "There is no user with userName: " + this.userName);

            if(user && this.sessionService.getCurrentCredentials()[0] === user.userName)
                user.password = this.sessionService.getCurrentCredentials()[1];
        })
        .catch((error) => {
            this.loadingUser = false;

            this.dialogService.openErrorDialog("Error", "Error getting User with userName: " + this.userName);
            console.error(error);
        });
    }

    loadGroups() {
        this.loadingGroups = true;

        this.groupService.getGroupsOfUser(this.userName)
        .then((groups) => {
            this.loadingGroups = false;
            this.groupsOfUser = groups;
        })
        .catch((error) => {
            this.loadingGroups = false;
            this.dialogService.openErrorDialog("Error", "Error getting Groups of User '" + this.userName + "'");
            console.error(error);
        });
    }

    loadToolsRepositories() {
        this.loadingToolsRepositories = true;

        this.toolsRepositoryService.getRepositoriesOfUser(this.userName)
        .then((repositories) => {
            this.loadingToolsRepositories = false;
            this.toolsRepositoriesOfUser = repositories;
        })
        .catch((error) => {
            this.loadingToolsRepositories = false;
            this.dialogService.openErrorDialog("Error", "Error getting Tools Repositoreies of User '" + this.userName + "'");
            console.error(error);
        });
    }

    loadPipelinesRepositories() {
        this.loadingPipelinesRepositories = true;

        this.pipelinesRepositoryService.getRepositoriesOfUser(this.userName)
        .then((repositories) => {
            this.loadingPipelinesRepositories = false;
            this.pipelinesRepositoriesOfUser = repositories;
        })
        .catch((error) => {
            this.loadingPipelinesRepositories = false;
            this.dialogService.openErrorDialog("Error", "Error getting Pipelines Repositories of User '" + this.userName + "'");
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
