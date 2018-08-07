import {
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Output,
    PLATFORM_ID,
    Renderer2,
    TemplateRef,
    ViewChild
} from '@angular/core';

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
    spinnerDiameter : number = 100;
    @Input()
    spinnerColor : string = "accent";

    repositoryUpdateSubscription : any;
    imageURI : string;
    loading : boolean;
    inited : boolean = false;

    observer: IntersectionObserver;



    constructor(
        private sessionService : SessionService,
        private pipelinesRepositoryService : PipelinesRepositoryService,
        private http : Http,
        public element: ElementRef) {}



    ngOnInit() {
        this.observer = new IntersectionObserver(this.handleIntersect.bind(this));
        this.observer.observe(this.element.nativeElement);

        this.repositoryUpdateSubscription = this.pipelinesRepositoryService.pipelinesRepositoryUpdateEvent.subscribe((repositoryId) => {
            if(repositoryId === this.repositoryId && this.inited)
                this.load();
        });
    }

    ngOnDestroy() {
        this.observer.disconnect();
        this.repositoryUpdateSubscription.unsubscribe();
    }

    handleIntersect(entries, observer) : void {
        entries.forEach((entry: IntersectionObserverEntry) => {
            if (entry.isIntersecting && !this.inited) {
                this.inited = true;
                this.load();
            }
        });
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
