import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PipelinesRepository } from '../../logic/domain/pipelines-repository';
import { PipelinesRepositoryService } from '../../logic/services/pipelines-repository.service';
import { SessionService } from '../../logic/services/session.service';
import { DialogService } from '../dialog/dialog.service';

@Component({
    selector: 'app-pipelines-repository',
    templateUrl: './pipelines-repository.component.html',
    styleUrls: ['./pipelines-repository.component.scss']
})
export class PipelinesRepositoryComponent implements OnInit, OnDestroy {

    paramsSubscription : any;
    loginSubscription : any;
    logoutSubscription : any;
    repositorySubscription : any;

    repositoryId : number;
    editable : boolean;
    loadingRepository : boolean;

    repository : PipelinesRepository;



    constructor(private repositoryService : PipelinesRepositoryService,
                private sessionService : SessionService,
                private dialogService : DialogService,
                private activatedRoute : ActivatedRoute,
                private router : Router) { }



    ngOnInit() {
        this.paramsSubscription = this.activatedRoute.params.subscribe(() => {
            this.repositoryId = this.activatedRoute.snapshot.params.repositoryId;
            this.load();
        });

        this.loginSubscription = this.sessionService.loginEvent.subscribe((credentails) => {
            this.checkEditable();
        });

        this.logoutSubscription = this.sessionService.logoutEvent.subscribe(() => {
            this.checkEditable();
        });

        this.repositorySubscription = this.repositoryService.pipelinesRepositoryEvent.subscribe((repositoryId) => {
            if(this.repositoryId === repositoryId)
                this.load();
        });

        this.repositoryId = this.activatedRoute.snapshot.params.repositoryId;
        this.load();
    }

    ngOnDestroy() {
        this.paramsSubscription.unsubscribe();

        this.loginSubscription.unsubscribe();
        this.logoutSubscription.unsubscribe();

        this.repositorySubscription.unsubscribe();
    }

    load() {
        this.loadRepository()
        .then(() => this.checkEditable())
        .catch(() => this.checkEditable());
    }

    checkEditable() {
        let credentials = this.sessionService.getCurrentCredentials();
        this.editable = credentials && this.repository && credentials[0] === this.repository.ownerName;
    }

    loadRepository() : Promise<PipelinesRepository> {
        this.loadingRepository = true;

        return this.repositoryService.getRepository(this.repositoryId)
        .then((repository) => {
            this.loadingRepository = false;

            this.repository = repository;

            if(!repository)
                this.dialogService.openWarningDialog("Non existent repository", "There is no repository with id: " + this.repositoryId);

            return repository;
        })
        .catch((error) => {
            this.loadingRepository = false;

            this.dialogService.openErrorDialog("Error", "Error getting Repository with id: " + this.repositoryId);
            console.error(error);

            throw error;
        });
    }

    createPipelineClick() {

    }

    addUserClick() {
        this.dialogService.openSelectUserDialog().afterClosed().subscribe((userName) => {
            if(!userName)
                return;

            this.loadingRepository = true;

            this.repository.usersAccess.push(userName);

            this.repositoryService.updateRepository(this.repository)
            .then((result) => {
                this.loadingRepository = false;

                if(result) {
                    this.dialogService.openSuccessDialog("Success", "User added successfuly!");
                } else {
                    this.repository.usersAccess = this.repository.usersAccess.filter(name => name !== userName);
                    this.dialogService.openWarningDialog("Error", "User could not be added! Try again later!");
                }
            })
            .catch((error) => {
                this.loadingRepository = false;

                this.repository.usersAccess = this.repository.usersAccess.filter(name => name !== userName);
                this.dialogService.openErrorDialog("Error adding user", error);
                console.error(error);
            });
        });
    }

    addGroupClick() {
        this.dialogService.openSelectGroupDialog().afterClosed().subscribe((groupName) => {
            if(!groupName)
                return;

            this.loadingRepository = true;

            this.repository.groupsAccess.push(groupName);

            this.repositoryService.updateRepository(this.repository)
            .then((result) => {
                this.loadingRepository = false;

                if(result) {
                    this.dialogService.openSuccessDialog("Success", "Group added successfuly!");
                } else {
                    this.repository.groupsAccess = this.repository.groupsAccess.filter(name => name !== groupName);
                    this.dialogService.openWarningDialog("Error", "Group could not be added! Try again later!");
                }
            })
            .catch((error) => {
                this.loadingRepository = false;

                this.repository.groupsAccess = this.repository.groupsAccess.filter(name => name !== groupName);
                this.dialogService.openErrorDialog("Error adding group", error);
                console.error(error);
            });
        });
    }

}
