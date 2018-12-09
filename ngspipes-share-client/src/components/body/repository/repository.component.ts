import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Repository, LocationType } from '../../../entities/repository';
import { SessionService } from '../../../services/session.service';
import { RepositoryService } from '../../../services/repository.service';

import { OperationsManager } from '../../operations.manager';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit, OnDestroy {

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
                private operationsManager : OperationsManager) { }



    ngOnInit() {
        this.loginSubscription = this.sessionService.loginEvent.subscribe(() => {
            this.checkEditable();
        });

        this.logoutSubscription = this.sessionService.logoutEvent.subscribe(() => {
            this.checkEditable();
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
        .then(() => this.loading = false)
        .catch(() => this.loading = false);

        this.checkEditable();
    }

    loadRepository() : Promise<Repository> {
        return this.operationsManager.getRepository(this.repositoryName)
        .then(repository => {
            this.repository = repository;
            return repository;
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
