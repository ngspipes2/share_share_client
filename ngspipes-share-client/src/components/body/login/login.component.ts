import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { User, UserRole } from '../../../entities/user';
import { UserService } from '../../../services/user.service';
import { SessionService } from '../../../services/session.service';
import { DialogManager } from '../../dialog/dialog.manager';
import { OperationsManager } from '../../operations.manager';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    user : User;
    userName : string;
    password : string;
    hide : boolean = true;
    loading : boolean;
    logingIn : boolean;
    creatingAccount : boolean;



    constructor(private userService : UserService,
                private sessionService : SessionService,
                private dialogManager : DialogManager,
                private router : Router,
                private operationsManager : OperationsManager) { }



    ngOnInit() {
        let credentials = this.sessionService.getCurrentCredentials();

        if(credentials) {
            this.userName = credentials[0];
            this.password = credentials[1];
            this.loadUser();
        }
    }

    loadUser() {
        this.loading = true;

        this.userService.getUser(this.userName)
            .then((user) => {
                this.loading = false;
                this.user = user;
            })
            .catch((error) => {
                this.loading = false;
                console.log("Error getting user with userName:" + this.userName);
                console.error(error);
            });
    }

    loginClick() {
        this.login(this.userName, this.password);
    }

    createAccountClick() {
        this.creatingAccount = true;

        let user = new User(this.userName, this.password, null, null, null, UserRole.NORMAL);

        this.operationsManager.createUser(user, false)
        .then((result) => {
            this.creatingAccount = false;
            this.login(user.userName, user.password);
        })
        .catch(() => this.creatingAccount = false);
    }

    login(userName : string, password : string) {
        this.logingIn = true;

        this.sessionService.login(userName, password)
        .then((result) => {
            this.logingIn = false;

            if(!result)
                this.dialogManager.openErrorDialog("Invalid credentials!", "");
            else
                this.router.navigate(['/users/' + userName]);
        })
        .catch((error) => {
            this.logingIn = false;

            this.dialogManager.openErrorDialog("Error while login!", "");
            console.error(error);
        });
    }

    userNameChanged() {
        if(this.user && this.user.userName !== this.userName)
            this.user = undefined;
    }

}
