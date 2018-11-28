import { Component, Input, OnInit } from '@angular/core';

import { Repository, EntityType, LocationType } from '../../../../../entities/repository';
import { RepositoryService } from '../../../../../services/repository.service';
import { SessionService } from '../../../../../services/session.service';

import { DialogManager } from '../../../../dialog/dialog.manager';
import { Filter, TextFilter, IconFilter } from '../../../../utils/filter-list/filter-list.component';

import { OperationsManager } from '../../../../operations.manager';

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
    creating : boolean;
    publishing : boolean;
    repositories : Repository[] = [];

    filters : Filter[];



    constructor(private repositoryService : RepositoryService,
                private dialogManager : DialogManager,
                private sessionService : SessionService,
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

        this.repositoryService.getRepositoriesAccessibleByUser(this.userName)
        .then(repositories => {
            this.loading = false;
            this.repositories = repositories;
            this.repositories = this.repositories.sort((a,b) => {
                if (a.repositoryName < b.repositoryName)
                    return -1;
                if (a.repositoryName > b.repositoryName)
                    return 1;

                return 0;
            });
        })
        .catch(error => {
            this.loading = false;
            this.dialogManager.openErrorDialog("Error getting repositories of user " + this.userName + "!", error);
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

    publishRepositoryClick() {
        this.publishing = true;

        let repository = new Repository(null, null, null, null, null, false, null, null);

        this.operationsManager.publishRepository(repository)
        .then(() => this.publishing = false)
        .catch(() => this.publishing = false);
    }

    createRepositoryClick() {
        this.creating = true;

        let repository = new Repository(null, null, null, null, null, false, null, null);

        this.operationsManager.createRepository(repository)
        .then(() => this.creating = false)
        .catch(() => this.creating = false);
    }

}
