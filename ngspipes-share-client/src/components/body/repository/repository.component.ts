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

    repositoryName : string;
    editable : boolean;
    isInternalRepository : boolean;
    loading = true;



    constructor(private sessionService : SessionService,
                private activatedRoute : ActivatedRoute,
                private repositoryService : RepositoryService,
                private dialogManager : DialogManager,
                private router : Router) { }



    ngOnInit() {
        this.loginSubscription = this.sessionService.loginEvent.subscribe(() => {
                this.checkEditable();
        });

        this.logoutSubscription = this.sessionService.logoutEvent.subscribe(() => {
                this.checkEditable();
        });

        this.paramsSubscription = this.activatedRoute.params.subscribe(() => {
            this.repositoryName = this.activatedRoute.snapshot.params.repositoryName;
            this.checkEditable();
        });

        this.checkEditable();
    }

    ngOnDestroy() {
        this.loginSubscription.unsubscribe();
        this.logoutSubscription.unsubscribe();
        this.paramsSubscription.unsubscribe();
    }

    checkEditable() {
        this.loading = true;

        this.repositoryService.getRepository(this.repositoryName)
        .then(repository => {
            this.loading = false;

            let currentUserName = this.sessionService.getCurrentCredentials()[0];
            this.editable = repository.ownerName === currentUserName;

            this.isInternalRepository = repository.locationType === LocationType.INTERNAL;
console.log(repository);
        })
        .catch(error => {
            this.loading = false;
            this.dialogManager.openErrorDialog("Error getting repository!", error);
            console.error(error);
        });
    }
}
