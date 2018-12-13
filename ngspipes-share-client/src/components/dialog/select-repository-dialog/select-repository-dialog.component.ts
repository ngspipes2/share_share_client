import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { RepositoryService } from '../../../services/repository.service';

@Component({
  selector: 'app-select-repository-dialog',
  templateUrl: './select-repository-dialog.component.html',
  styleUrls: ['./select-repository-dialog.component.scss']
})
export class SelectRepositoryDialogComponent implements OnInit, OnDestroy {

    repositoryNames : string[] = [];

    repositorySubscription : any;

    control = new FormControl();
    filteredOptions: Observable<any[]>;
    loadEvent : Subject<any> = new Subject();



    constructor(private repositoryService : RepositoryService,
                private dialogRef : MatDialogRef<SelectRepositoryDialogComponent>) { }



    ngOnInit() {
        this.filteredOptions = this.control.valueChanges.pipe(
          startWith(''),
          map(value => this.filter(value))
        );

        this.repositorySubscription = this.repositoryService.repositoryEvent.subscribe(() => this.loadEvent.next());

        setTimeout(() => this.loadEvent.next());
    }

    ngOnDestroy() {
        this.repositorySubscription.unsubscribe();
    }

    filter(value: string): any[] {
        const filterValue = value.toLowerCase();
        return this.repositoryNames.filter(name => name.toLowerCase().indexOf(filterValue) !== -1);
    }

    load() : Promise<any> {
        return this.repositoryService.getRepositoriesNames()
        .then(repositoryNames => this.repositoryNames = repositoryNames)
        .catch(error => {
            this.dialogRef.close({
                result: null,
                error: "Error getting Repositories names! " + error
            });
        });
    }

    select(repositoryName : string) {
        this.dialogRef.close({
            result: repositoryName,
            error: null
        });
    }

}
