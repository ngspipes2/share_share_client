import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';

import { RepositoryService } from '../../../services/repository.service';

@Component({
  selector: 'app-new-repository-name-dialog',
  templateUrl: './new-repository-name-dialog.component.html',
  styleUrls: ['./new-repository-name-dialog.component.scss']
})
export class NewRepositoryNameDialogComponent implements OnInit, OnDestroy {

    validCharactersRegex : RegExp = new RegExp(/[a-zA-Z0-9\-_]+$/);
    repositorySubscription : any;
    repositoriesNames : string[] = [];

    repositoryName : string;
    validRepositoryName : boolean = false;
    invalidMessage : string;
    loadEvent : Subject<any> = new Subject();



    constructor(private dialogRef: MatDialogRef<NewRepositoryNameDialogComponent>,
                private repositoryService : RepositoryService) { }



    ngOnInit() {
        this.repositorySubscription = this.repositoryService.repositoryEvent.subscribe(() => this.loadEvent.next());
        setTimeout(() => this.loadEvent.next());
    }

    ngOnDestroy() {
        this.repositorySubscription.unsubscribe();
    }

    load() : Promise<any> {
        return this.repositoryService.getRepositoriesNames()
        .then(repositoriesNames => this.repositoriesNames = repositoriesNames)
        .catch(error => {
            this.dialogRef.close({
                result: null,
                error: "Could not load repositories names! " + error
            });
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
        this.dialogRef.close({
            result: this.repositoryName,
            error: null
        });
    }

}
