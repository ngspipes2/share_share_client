import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

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
    loadEvent : Subject<any> = new Subject();

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
                setTimeout(() => this.loadEvent.next());
            }
        });

        this.repositoryCreateSubscription = this.repositoryService.repositoryCreateEvent.subscribe(repositoryName => {
            if(repositoryName === this.repositoryName)
                this.loadEvent.next();
        });

        this.repositoryDeleteSubscription = this.repositoryService.repositoryDeleteEvent.subscribe(repositoryName => {
            if(repositoryName === this.repositoryName)
                this.loadEvent.next();
        });
    }

    ngOnDestroy() {
        this.loginSubscription.unsubscribe();
        this.logoutSubscription.unsubscribe();
        this.paramsSubscription.unsubscribe();
        this.repositoryCreateSubscription.unsubscribe();
        this.repositoryDeleteSubscription.unsubscribe();
    }

    load() : Promise<any> {
        return this.loadRepository()
        .then(() => this.checkEditable());
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
