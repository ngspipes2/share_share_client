import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Repository, EntityType, LocationType } from '../../../../../entities/repository';
import { RepositoryService } from '../../../../../services/repository.service';
import { SessionService } from '../../../../../services/session.service';
import { DialogManager } from '../../../../dialog/dialog.manager';
import { Filter, TextFilter, IconFilter } from '../../../../utils/filter-list/filter-list.component';

@Component({
  selector: 'app-my-tools-repositories-list',
  templateUrl: './my-tools-repositories-list.component.html',
  styleUrls: ['./my-tools-repositories-list.component.scss']
})
export class MyToolsRepositoriesListComponent implements OnInit {

    loginSubscription : any;
    repositorySubscription : any;

    loading : boolean;
    publishing : boolean;
    creating : boolean;
    userName : string;
    repositories : Repository[] = [];

    filters : Filter[];



    constructor(private sessionService : SessionService,
                private repositoryService : RepositoryService,
                private dialogManager : DialogManager,
                private router : Router) {
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
            this.repositories = repositories.filter(repository => repository.entityType === EntityType.TOOLS);
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

    publishRepositoryClick() {
        this.dialogManager.openNewRepositoryNameDialog().afterClosed().subscribe(name => {
            if(!name)
                return;

                this.dialogManager.openNewRepositoryLocationDialog().afterClosed().subscribe(location => {
                    if(!location)
                        return;

                    let userName = this.sessionService.getCurrentCredentials()[0];
                    let repository = new Repository(name, EntityType.TOOLS, LocationType.EXTERNAL, null, null, false, userName, location);

                    this.createRepository(repository);
                });
        });
    }

    createRepositoryClick() {
        this.dialogManager.openNewRepositoryNameDialog().afterClosed().subscribe(name => {
            if(!name)
                return;

            let userName = this.sessionService.getCurrentCredentials()[0];
            let repository = new Repository(name, EntityType.TOOLS, LocationType.INTERNAL, null, null, false, userName, null);

            this.createRepository(repository);
        });
    }

    createRepository(repository : Repository) {
        if(repository.locationType === LocationType.EXTERNAL)
            this.publishing = true;
        else
            this.creating = true;

        this.repositoryService.createRepository(repository)
        .then(() => {
            if(repository.locationType === LocationType.EXTERNAL)
                this.publishing = false;
            else
                this.creating = false;

            this.dialogManager.openSuccessDialog("Repository created successfully!", null);
            this.router.navigate(['/repositories/' + repository.repositoryName]);
        })
        .catch(error => {
            if(repository.locationType === LocationType.EXTERNAL)
                this.publishing = false;
            else
                this.creating = false;

            this.dialogManager.openErrorDialog("Error creating Repository!", error);
            console.error(error);
        });
    }

}
