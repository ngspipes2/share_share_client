import { Component, OnInit, OnDestroy } from '@angular/core';

import { Repository, EntityType, LocationType } from '../../../../../entities/repository';
import { RepositoryService } from '../../../../../services/repository.service';
import { SessionService } from '../../../../../services/session.service';
import { DialogManager } from '../../../../dialog/dialog.manager';

@Component({
  selector: 'app-my-pipelines-repositories-list',
  templateUrl: './my-pipelines-repositories-list.component.html',
  styleUrls: ['./my-pipelines-repositories-list.component.scss']
})
export class MyPipelinesRepositoriesListComponent implements OnInit, OnDestroy {

    loginSubscription : any;
    repositorySubscription : any;

    loading : boolean;
    userName : string;
    repositories : Repository[] = [];

    filterText : string = "";
    filterAcceptOwner : boolean = true;
    filterAcceptMember : boolean = true;



    constructor(private sessionService : SessionService,
                private repositoryService : RepositoryService,
                private dialogManager : DialogManager) { }



    ngOnInit() {
        this.loginSubscription = this.sessionService.loginEvent.subscribe(() => this.load());
        this.repositorySubscription = this.repositoryService.repositoryEvent.subscribe(() => this.load());

        this.load();
    }

    ngOnDestroy() {
        this.loginSubscription.unsunscribe();
        this.repositorySubscription.unsunscribe();
    }

    load() {
        this.userName = this.sessionService.getCurrentCredentials()[0];

        this.loading = true;

        this.repositoryService.getRepositoriesAccessibleByUser(this.userName)
        .then(repositories => {
            this.loading = false;
            this.repositories = repositories.filter(repository => repository.entityType === EntityType.PIPELINES);
            this.repositories = this.repositories.sort((a,b) => {
                if (a.repositoryName < b.repositoryName)
                    return -1;
                if (a.repositoryName > b.repositoryName)
                    return 1;

                return 0;
            });
        })
        .catch(error=>{
            this.loading = false;
            this.dialogManager.openErrorDialog("Error getting repositories of current user!", error);
            console.error(error);
        });
    }

    accept(repository : Repository) : boolean {
        if(repository.repositoryName.toLowerCase().indexOf(this.filterText.toLowerCase()) === -1)
            return false;

        if(!this.filterAcceptOwner && repository.ownerName === this.userName)
            return false;

        if(!this.filterAcceptMember && repository.ownerName !== this.userName)
            return false;

        return true;
    }

}
