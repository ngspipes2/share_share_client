import { Component, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { Router } from "@angular/router";

import { User } from '../../logic/domain/user';
import { UserService } from '../../logic/services/user.service';
import { SessionService } from '../../logic/services/session.service';
import { DialogService } from '../dialog/dialog.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    user : User;
    userName : string;
    password : string;
    hide : boolean = true;
    loading : boolean;



    constructor(private userService : UserService,
                private sessionService : SessionService,
                private dialogService : DialogService,
                private router : Router) { }



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

    newUserClick() {
        let user = new User(this.userName, this.password, null, null, null, "NORMAL");

        this.loading = true;

        this.userService.createUser(user)
            .then((response) => {
                this.loading = false;
                this.login(user.userName, user.password);
            })
            .catch((error) => {
                this.loading = false;
                this.dialogService.openErrorDialog("Error", "Error creating new user!");
                console.error(error);
            });
    }

    login(userName : string, password : string) {
        this.loading = true;

        this.sessionService.login(userName, password)
            .then((result) => {
                this.loading = false;

                if(!result)
                    this.dialogService.openErrorDialog("Invalid credentials!", "");
                else
                    this.router.navigate(['/users/' + userName]);
            })
            .catch((error) => {
                this.loading = false;

                this.dialogService.openErrorDialog("Error while login!", "");
                console.error(error);
            });
    }

    userNameChanged() {
        if(this.user && this.userName !== this.userName)
            this.user = undefined;
    }

}
