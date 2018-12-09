import { Component, Input, OnInit } from '@angular/core';

import { Repository, EntityType, LocationType } from '../../../../../entities/repository';
import { RepositoryService } from '../../../../../services/repository.service';

import { Filter, TextFilter, IconFilter } from '../../../../utils/filter-list/filter-list.component';

import { OperationsManager } from '../../../../operations.manager';
import { Utils } from '../../../../utils/utils';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    @Input()
    userName : string;
    @Input()
    editable : boolean;

    repositorySubscription : any;

    loading : boolean;
    repositories : Repository[] = [];

    filters : Filter[];



    constructor(private repositoryService : RepositoryService,
                private operationsManager : OperationsManager) {
        this.filters = [
            new TextFilter(this.acceptName.bind(this), "", "RepositoryName"),
            new IconFilter(this.acceptOwner.bind(this), true, "Owner", "person", null),
            new IconFilter(this.acceptMember.bind(this), true, "Member", "people", null),
            new IconFilter(this.acceptToolsRepository.bind(this), true, "Tools Repositories", "build", null),
            new IconFilter(this.acceptPipelinesRepository.bind(this), true, "Pipelines Repositories", "insert_drive_file", null)
        ];
    }



    ngOnInit() {
        this.repositorySubscription = this.repositoryService.repositoryEvent.subscribe(() => this.load());
        this.load();
    }

    ngOnDestroy() {
        this.repositorySubscription.unsubscribe();
    }

    ngOnChanges() {
        this.load();
    }

    load() {
        this.repositories = undefined;
        this.loading = true;

        this.operationsManager.getRepositoriesAccessibleByUser(this.userName)
        .then(repositories => {
            this.loading = false;
            this.repositories = Utils.sort(repositories, repository => repository.repositoryName);
        })
        .catch(error => this.loading = false);
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

    acceptToolsRepository(repository : Repository, accept : boolean) : boolean {
        if(!accept && repository.entityType === EntityType.TOOLS)
            return false;

        return true;
    }

    acceptPipelinesRepository(repository : Repository, accept : boolean) : boolean {
        if(!accept && repository.entityType === EntityType.PIPELINES)
            return false;

        return true;
    }

    publishRepositoryClick() : Promise<any> {
        let repository = new Repository(null, null, null, null, null, false, null, null);
        return this.operationsManager.publishRepository(repository);
    }

    createRepositoryClick() : Promise<any> {
        let repository = new Repository(null, null, null, null, null, false, null, null);
        return this.operationsManager.createRepository(repository);
    }

}
