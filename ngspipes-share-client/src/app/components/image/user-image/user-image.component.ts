import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { UserService } from '../../../logic/services/user.service';
import { Server } from '../../../logic/services/server';
import { SessionService } from '../../../logic/services/session.service';

@Component({
    selector: 'app-user-image',
    templateUrl: './user-image.component.html',
    styleUrls: ['./user-image.component.scss']
})
export class UserImageComponent implements OnInit, OnDestroy {

    @Input()
    userName : string;
    @Input()
    spinnerDiameter : number;

    userUpdateSubscription : any;
    imageURI : string;
    loading : boolean;



    constructor(private sessionService : SessionService, private userService : UserService, private http : Http) { }



    ngOnInit() {
        this.userUpdateSubscription = this.userService.userUpdateEvent.subscribe((userName) => {
            if(userName === this.userName)
                this.load();
        });

        this.load();
    }

    ngOnDestroy() {
        this.userUpdateSubscription.unsubscribe();
    }

    load() {
        this.loading = true;

        let url = Server.GET_USER_IMAGE.replace('{userName}', this.userName);
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
