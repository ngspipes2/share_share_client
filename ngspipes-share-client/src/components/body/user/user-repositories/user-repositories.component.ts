import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Repository, EntityType, LocationType } from '../../../../entities/repository';
import { RepositoryService } from '../../../../services/repository.service';
import { SessionService } from '../../../../services/session.service';
import { DialogManager } from '../../../dialog/dialog.manager';

@Component({
    selector: 'app-user-repositories',
    templateUrl: './user-repositories.component.html',
    styleUrls: ['./user-repositories.component.scss']
})
export class UserRepositoriesComponent {

    @Input()
    userName : string;
    @Input()
    editable : boolean;

    creating : boolean;
    publishing : boolean;



    constructor(private sessionService : SessionService,
                private repositoryService : RepositoryService,
                private dialogManager : DialogManager,
                private router : Router) { }



    publishRepositoryClick() {
        this.dialogManager.openNewRepositoryNameDialog().afterClosed().subscribe(name => {
            if(!name)
                return;

                this.dialogManager.openSelectRepositoryEntityTypeDialog().afterClosed().subscribe(entityType => {
                    if(!entityType)
                        return;

                    this.dialogManager.openNewRepositoryLocationDialog().afterClosed().subscribe(location => {
                        if(!location)
                            return;

                        let userName = this.sessionService.getCurrentCredentials()[0];
                        let repository = new Repository(name, entityType, LocationType.EXTERNAL, null, null, false, userName, location);

                        this.createRepository(repository);
                    });
                });
        });
    }

    createRepositoryClick() {
        this.dialogManager.openNewRepositoryNameDialog().afterClosed().subscribe(name => {
            if(!name)
                return;

            this.dialogManager.openSelectRepositoryEntityTypeDialog().afterClosed().subscribe(entityType => {
                if(!entityType)
                    return;

                let userName = this.sessionService.getCurrentCredentials()[0];
                let repository = new Repository(name, entityType, LocationType.INTERNAL, null, null, false, userName, null);

                this.createRepository(repository);
            });
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
