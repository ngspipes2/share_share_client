import { Component, OnInit, OnDestroy } from '@angular/core';

import { Repository, EntityType, LocationType } from '../../../../../entities/repository';
import { RepositoryService } from '../../../../../services/repository.service';
import { SessionService } from '../../../../../services/session.service';
import { DialogManager } from '../../../../dialog/dialog.manager';
import { Filter, TextFilter, IconFilter } from '../../../../utils/filter-list/filter-list.component';

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

    filters : Filter[];



    constructor(private sessionService : SessionService,
                private repositoryService : RepositoryService,
                private dialogManager : DialogManager) {
        this.filters = [
            new TextFilter(this.acceptName.bind(this), "", "RepositoryName"),
            new IconFilter(this.acceptOwner.bind(this), true, "Owner", "person", null),
            new IconFilter(this.acceptMember.bind(this), true, "Member", "people", null)
        ];
    }



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
        this.repositories = undefined;
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

    acceptName(repository : Repository, text : string) {
        let name = repository.repositoryName.toLowerCase();
        text = text.toLowerCase();

        return name.indexOf(text) !== -1;
    }

    acceptOwner(repository : Repository, accept : boolean) : boolean {
        if(!accept && repository.ownerName === this.userName)
            return false;

        return true;
    }

    acceptMember(repository : Repository, accept : boolean) : boolean {
        if(!accept && repository.ownerName !== this.userName)
            return false;

        return true;
    }

}
