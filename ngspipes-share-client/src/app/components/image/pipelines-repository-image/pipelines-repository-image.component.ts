import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { PipelinesRepositoryService } from '../../../logic/services/pipelines-repository.service';
import { Server } from '../../../logic/services/server';
import { SessionService } from '../../../logic/services/session.service';

@Component({
    selector: 'app-pipelines-repository-image',
    templateUrl: './pipelines-repository-image.component.html',
    styleUrls: ['./pipelines-repository-image.component.scss']
})
export class PipelinesRepositoryImageComponent implements OnInit, OnDestroy {

    @Input()
    repositoryId : number;
    @Input()
    spinnerDiameter : number;

    repositoryUpdateSubscription : any;
    imageURI : string;
    loading : boolean;



    constructor(private sessionService : SessionService, private pipelinesRepositoryService : PipelinesRepositoryService, private http : Http) { }



    ngOnInit() {
        this.repositoryUpdateSubscription = this.pipelinesRepositoryService.pipelinesRepositoryUpdateEvent.subscribe((repositoryId) => {
            if(repositoryId === this.repositoryId)
                this.load();
        });

        this.load();
    }

    ngOnDestroy() {
        this.repositoryUpdateSubscription.unsubscribe();
    }

    load() {
        this.loading = true;

        let url = Server.GET_PIPELINES_REPOSITORY_IMAGE.replace('{repositoryId}', this.repositoryId.toString());
        let credentials = this.sessionService.getCurrentCredentials();
        let headers = new Headers();

        if(credentials)
            headers.append("Authorization", "Basic " + btoa(credentials[0]+":"+credentials[1]));

        this.http.get(url, {headers: headers})
            .toPromise()
            .then(() => {
                this.loading = false;
                this.imageURI = url;
            })
            .catch(error => {
                this.loading = false;
                this.imageURI = undefined;
            })
    }

}
