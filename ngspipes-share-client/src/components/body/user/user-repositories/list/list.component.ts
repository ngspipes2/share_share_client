import { Component, Input, OnInit } from '@angular/core';

import { Repository, EntityType, LocationType } from '../../../../../entities/repository';
import { RepositoryService } from '../../../../../services/repository.service';

import { DialogManager } from '../../../../dialog/dialog.manager';

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

    filterText : string = "";
    filterAcceptOwner : boolean = true;
    filterAcceptMember : boolean = true;
    filterAcceptToolsRepositories : boolean = true;
    filterAcceptPipelinesRepositories : boolean = true;



    constructor(private repositoryService : RepositoryService,
                private dialogManager : DialogManager) { }



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

    accept(repository : Repository) : boolean {
        if(repository.repositoryName.toLowerCase().indexOf(this.filterText.toLowerCase()) === -1)
            return false;

        if(!this.filterAcceptOwner && repository.ownerName === this.userName)
            return false;

        if(!this.filterAcceptMember && repository.ownerName !== this.userName)
            return false;

        if(!this.filterAcceptToolsRepositories && repository.entityType === EntityType.TOOLS)
            return false;

        if(!this.filterAcceptPipelinesRepositories && repository.entityType === EntityType.PIPELINES)
            return false;

        return true;
    }

}
