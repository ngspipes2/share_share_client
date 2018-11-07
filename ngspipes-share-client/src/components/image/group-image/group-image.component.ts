import {
    Component,
    Input,
    OnInit,
    OnDestroy,
    ElementRef
} from '@angular/core';

import { GroupService } from '../../../services/group.service';

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
    imageData : any;
    loading : boolean;
    inited : boolean = false;

    observer: IntersectionObserver;



    constructor(private groupService : GroupService,
                private element : ElementRef) {}



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

        this.groupService.getGroupImage(this.groupName)
            .then(image => {
                this.loading = false;
                this.imageData = image;
            })
            .catch(error => {
                this.loading = false;
                this.imageData = undefined;
            });
    }

}
