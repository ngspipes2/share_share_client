import { Component, OnInit, OnDestroy } from '@angular/core';;
import { Router } from "@angular/router";
import { OverlayContainer } from '@angular/cdk/overlay';
import { Md5 } from 'ts-md5/dist/md5';

import { User } from '../../logic/domain/user';
import { UserService } from '../../logic/services/user.service';
import { SessionService } from '../../logic/services/session.service';
import { PreferencesService } from '../../logic/services/preferences.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    user : User;
    userUpdateSubscription : any;
    loginSubscription : any;
    logoutSubscription : any;
    themeChangeSubscription : any;
    currentTheme : string;


    constructor(private sessionService : SessionService,
                private userService : UserService,
                private preferencesService : PreferencesService,
                private router : Router,
                private overlayContainer : OverlayContainer) { }



    ngOnInit() {
        this.userUpdateSubscription = this.userService.userUpdateEvent.subscribe((userName) => {
            if(this.user && this.user.userName === userName)
                this.loadUser(userName);
        });

        this.loginSubscription = this.sessionService.loginEvent.subscribe((credentials) => {
            this.loadUser(credentials[0]);
        });

        this.logoutSubscription = this.sessionService.logoutEvent.subscribe((credentials) => {
            this.user = undefined;
        });

        this.themeChangeSubscription = this.preferencesService.themeChangeEvent.subscribe(() => {
            this.loadTheme();
        });

        this.loadTheme();
    }

    loadUser(userName : string) {
        this.userService.getUser(userName)
            .then((user) => {
                this.user = user;
            })
            .catch((error) => {
                window.alert("Error getting user with userName:" + userName);
                console.error(error);
            });
    }

    ngOnDestroy() {
        this.userUpdateSubscription.unsubscribe();
        this.loginSubscription.unsubscribe();
        this.logoutSubscription.unsubscribe();
        this.themeChangeSubscription.unsubscribe();
    }

    profileClick() {
        this.router.navigate(['/users/' + this.user.userName]);
    }

    logoutClick() {
        this.sessionService.logout()
            .then((response) => {
                if(response)
                    this.router.navigate(['/login']);
                else
                    window.alert("Could not logout!");
            })
            .catch((error) => {
                window.alert("Error while logout!");
                console.error(error);
            });
    }

    setTheme(theme : string) {
        this.preferencesService.setTheme(theme)
        .then((result) => {
            if(!result)
                console.error("Theme could not be set!");
        })
        .catch((error) => {
            console.log("Error setting theme!");
            console.error(error);
        });
    }

    loadTheme() {
        this.preferencesService.getTheme()
            .then((theme) => {
                this.overlayContainer.getContainerElement().classList.remove(this.currentTheme);
                this.currentTheme = theme;
                this.overlayContainer.getContainerElement().classList.add(theme)
            })
            .catch((error) => {
                console.log("Error getting theme!");
                console.error(error);
            });
    }

    getUserImage() : string {
        let baseUri = "https://www.gravatar.com/avatar";
        let hash = Md5.hashStr(this.user.gravatarEmail.trim().toLowerCase());

        return baseUri + "/" + hash;
    }

}
