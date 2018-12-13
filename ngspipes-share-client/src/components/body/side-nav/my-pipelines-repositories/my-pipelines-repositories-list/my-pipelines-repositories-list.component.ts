import { Component, OnInit, OnDestroy } from '@angular/core';

import { Repository, EntityType, LocationType } from '../../../../../entities/repository';
import { RepositoryService } from '../../../../../services/repository.service';
import { SessionService } from '../../../../../services/session.service';
import { Filter, TextFilter, IconFilter } from '../../../../utils/filter-list/filter-list.component';
import { OperationsManager } from '../../../../operations.manager';
import { Utils } from '../../../../utils/utils';

@Component({
  selector: 'app-my-pipelines-repositories-list',
  templateUrl: './my-pipelines-repositories-list.component.html',
  styleUrls: ['./my-pipelines-repositories-list.component.scss']
})
export class MyPipelinesRepositoriesListComponent implements OnInit, OnDestroy {

    loginSubscription : any;
    repositorySubscription : any;

    userName : string;
    repositories : Repository[] = [];

    filters : Filter[];



    constructor(private sessionService : SessionService,
                private repositoryService : RepositoryService,
                private operationsManager : OperationsManager) {
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
        this.loginSubscription.unsubscribe();
        this.repositorySubscription.unsubscribe();
    }

    load() {
        this.userName = this.sessionService.getCurrentCredentials()[0];
        this.repositories = undefined;

        this.operationsManager.getRepositoriesAccessibleByUser(this.userName)
        .then(repositories => {
            this.repositories = repositories.filter(repository => repository.entityType === EntityType.PIPELINES);
            this.repositories = Utils.sort(this.repositories, repository => repository.repositoryName);
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

    publishRepositoryClick() : Promise<any> {
        let repository = new Repository(name, EntityType.PIPELINES, null, null, null, false, null, null);
        return this.operationsManager.publishRepository(repository);
    }

    createRepositoryClick() : Promise<any> {
        let repository = new Repository(name, EntityType.PIPELINES, null, null, null, false, null, null);
        return this.operationsManager.createRepository(repository);
    }

}
