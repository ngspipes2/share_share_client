import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Repository, LocationType } from '../../../entities/repository';
import { SessionService } from '../../../services/session.service';
import { RepositoryService } from '../../../services/repository.service';

import { DialogManager } from '../../dialog/dialog.manager';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit {

    loginSubscription : any;
    logoutSubscription : any;
    paramsSubscription : any;
    repositoryCreateSubscription : any;
    repositoryDeleteSubscription : any;

    repositoryName : string;
    editable : boolean;
    loading : boolean;

    repository : Repository;



    constructor(private sessionService : SessionService,
                private activatedRoute : ActivatedRoute,
                private repositoryService : RepositoryService,
                private dialogManager : DialogManager,
                private router : Router) { }



    ngOnInit() {
        this.loginSubscription = this.sessionService.loginEvent.subscribe(() => {
            this.load();
        });

        this.logoutSubscription = this.sessionService.logoutEvent.subscribe(() => {
            this.load();
        });

        this.paramsSubscription = this.activatedRoute.params.subscribe(() => {
            if(this.repositoryName !== this.activatedRoute.snapshot.params.repositoryName) {
                this.repositoryName = this.activatedRoute.snapshot.params.repositoryName;
                this.load();
            }
        });

        this.repositoryCreateSubscription = this.repositoryService.repositoryCreateEvent.subscribe(repositoryName => {
            if(repositoryName === this.repositoryName)
                this.load();
        });

        this.repositoryDeleteSubscription = this.repositoryService.repositoryDeleteEvent.subscribe(repositoryName => {
            if(repositoryName === this.repositoryName)
                this.load();
        });
    }

    ngOnDestroy() {
        this.loginSubscription.unsubscribe();
        this.logoutSubscription.unsubscribe();
        this.paramsSubscription.unsubscribe();
        this.repositoryCreateSubscription.unsubscribe();
        this.repositoryDeleteSubscription.unsubscribe();
    }

    load() {
        this.loading = true;

        this.loadRepository()
        .then(() => {
            this.loading = false;
            this.checkEditable();
        })
        .catch(() => {
            this.loading = false;
        });
    }

    loadRepository() : Promise<Repository> {
        return this.repositoryService.getRepository(this.repositoryName)
        .then(repository => {
            this.repository = repository;

            if(!repository)
                this.dialogManager.openWarningDialog("There is no Repository " + this.repositoryName, null);

            return repository;
        })
        .catch(error => {
            this.dialogManager.openErrorDialog("Error getting Repository!", error);
            console.error(error);
            throw error;
        });
    }

    checkEditable() {
        let currentUserName = this.sessionService.getCurrentCredentials()[0];
        this.editable = this.repository.ownerName === currentUserName;
    }

    isInternalRepository() : boolean {
        return this.repository.locationType === LocationType.INTERNAL;
    }

}
