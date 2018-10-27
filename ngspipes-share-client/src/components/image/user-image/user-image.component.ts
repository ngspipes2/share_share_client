import {
    Component,
    Input,
    OnInit,
    OnDestroy,
    ElementRef
} from '@angular/core';

import { UserService } from '../../../services/user.service';
import { SessionService } from '../../../services/session.service';

@Component({
    selector: 'app-user-image',
    templateUrl: './user-image.component.html',
    styleUrls: ['./user-image.component.scss']
})
export class UserImageComponent implements OnInit, OnDestroy {

    @Input()
    userName : string;
    @Input()
    spinnerDiameter : number = 100;
    @Input()
    spinnerColor : string = "accent";

    userUpdateSubscription : any;
    imageURL : string;
    loading : boolean;
    inited : boolean = false;

    observer: IntersectionObserver;



    constructor(private sessionService : SessionService,
                private userService : UserService,
                public element: ElementRef) {}



    ngOnInit(): void {
        this.observer = new IntersectionObserver(this.handleIntersect.bind(this));
        this.observer.observe(this.element.nativeElement);

        this.userUpdateSubscription = this.userService.userUpdateEvent.subscribe((userName) => {
          if(userName === this.userName && this.inited)
            this.load();
        });
    }

    ngOnDestroy(): void {
        this.observer.disconnect();
        this.userUpdateSubscription.unsubscribe();
    }

    //LAZY LOAD
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

        this.userService.getUserImage(this.userName)
            .then(image => {
                this.loading = false;

                if(image)
                    this.imageURL = this.userService.getUserImageURL(this.userName);
                else
                    this.imageURL = undefined;
            })
            .catch(error => {
                this.loading = false;
                this.imageURL = undefined;
            })
    }

}
