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

import { GroupService } from '../../../logic/services/group.service';
import { Server } from '../../../logic/services/server';
import { SessionService } from '../../../logic/services/session.service';

@Component({
    selector: 'app-group-image',
    templateUrl: './group-image.component.html',
    styleUrls: ['./group-image.component.scss']
})
export class GroupImageComponent implements OnInit, OnDestroy {

    @Input()
    groupName : string;
    @Input()
    spinnerDiameter : number = 100;
    @Input()
    spinnerColor : string = "accent";

    groupUpdateSubscription : any;
    imageURI : string;
    loading : boolean;
    inited : boolean = false;

    observer: IntersectionObserver;



    constructor(
        private sessionService : SessionService,
         private groupService : GroupService,
        private http : Http,
        public element: ElementRef) {}



    ngOnInit() {
        this.observer = new IntersectionObserver(this.handleIntersect.bind(this));
        this.observer.observe(this.element.nativeElement);

        this.groupUpdateSubscription = this.groupService.groupUpdateEvent.subscribe((groupName) => {
            if(groupName === this.groupName && this.inited)
                this.load();
        });
    }

    ngOnDestroy() {
        this.observer.disconnect();
        this.groupUpdateSubscription.unsubscribe();
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

        let url = Server.GET_GROUP_IMAGE.replace('{groupName}', this.groupName);
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
