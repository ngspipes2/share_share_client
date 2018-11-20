import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Repository, EntityType, LocationType } from '../../../../entities/repository';
import { RepositoryService } from '../../../../services/repository.service';
import { SessionService } from '../../../../services/session.service';
import { DialogManager } from '../../../dialog/dialog.manager';

@Component({
  selector: 'app-my-tools-repositories',
  templateUrl: './my-tools-repositories.component.html',
  styleUrls: ['./my-tools-repositories.component.scss']
})
export class MyToolsRepositoriesComponent {

    creating : boolean;
    publishing : boolean;



    constructor(private router : Router,
                private repositoryService : RepositoryService,
                private sessionService : SessionService,
                private dialogManager : DialogManager) { }



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
