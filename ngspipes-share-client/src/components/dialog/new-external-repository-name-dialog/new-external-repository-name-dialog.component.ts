import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { ExternalRepositoryService } from '../../../services/external-repository.service';

@Component({
  selector: 'app-new-external-repository-name-dialog',
  templateUrl: './new-external-repository-name-dialog.component.html',
  styleUrls: ['./new-external-repository-name-dialog.component.scss']
})
export class NewExternalRepositoryNameDialogComponent implements OnInit, OnDestroy {

    validCharactersRegex : RegExp = new RegExp(/[a-zA-Z0-9\-_]+$/);
    repositorySubscription : any;
    repositoriesNames : string[] = [];

    loading : boolean;
    repositoryName : string;
    validRepositoryName : boolean = false;
    invalidMessage : string;



    constructor(private dialogRef: MatDialogRef<NewExternalRepositoryNameDialogComponent>,
                private externalRepositoryService : ExternalRepositoryService) { }



    ngOnInit() {
        this.repositorySubscription = this.externalRepositoryService.repositoryEvent.subscribe(() => this.load());
        this.load();
    }

    ngOnDestroy() {
        this.repositorySubscription.unsubscribe();
    }

    load() {
        this.loading = true;

        this.externalRepositoryService.getRepositoriesNames()
        .then(repositoriesNames => {
            this.loading = false;
            this.repositoriesNames = repositoriesNames;
        })
        .catch(error => {
            this.loading = false;
            console.error("Could not load repositories names!", error);
        });
    }

    repositoryNameChanged() {
        if(!this.repositoryName || this.repositoryName.length < 1) {
            this.validRepositoryName = false;
            this.invalidMessage = undefined;
        } else if(this.repositoriesNames.indexOf(this.repositoryName) !== -1) {
            this.validRepositoryName = false;
            this.invalidMessage = "RepositoryName not available!";
        } else if(!this.validCharactersRegex.test(this.repositoryName) || new RegExp(/\s/).test(this.repositoryName)) {
            this.validRepositoryName = false;
            this.invalidMessage = "Invalid characters!";
        } else if(this.repositoryName.indexOf("Pipelines") !== -1 || this.repositoryName.indexOf("Tools") !== -1) {
            this.validRepositoryName = false;
            this.invalidMessage = "'Pipelines' and 'Tools' are reserved words for RepositoryName.";
        } else {
            this.validRepositoryName = true;
            this.invalidMessage = undefined;
        }
    }

    okClicked() {
        this.dialogRef.close(this.repositoryName);
    }

}
