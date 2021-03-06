import { Component, OnInit } from '@angular/core';

import { User, UserRole } from '../../../entities/user';
import { UserService } from '../../../services/user.service';
import { SessionService } from '../../../services/session.service';
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



    constructor(private userService : UserService,
                private sessionService : SessionService,
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

    loginClick() : Promise<any> {
        return this.login(this.userName, this.password);
    }

    createAccountClick() : Promise<any> {
        let user = new User(this.userName, this.password, null, null, null, UserRole.NORMAL);

        return this.operationsManager.createUser(user, false)
        .then((result) => {
            return this.login(user.userName, user.password);
        });
    }

    login(userName : string, password : string) : Promise<any> {
        return this.operationsManager.login(userName, password);
    }

    userNameChanged() {
        if(this.user && this.user.userName !== this.userName)
            this.user = undefined;
    }

}
