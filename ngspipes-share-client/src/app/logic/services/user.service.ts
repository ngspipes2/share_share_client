import { Injectable }    from '@angular/core';
import { Subject } from 'rxjs';

import { HttpUtils } from './http-utils';
import { Server } from './server';
import { User } from '../domain/user';

@Injectable()
export class UserService {

    userEvent = new Subject<string>();
    userInsertEvent = new Subject<string>();
    userUpdateEvent = new Subject<string>();
    userDeleteEvent = new Subject<string>();



    constructor(private httpUtils: HttpUtils) {
        this.userInsertEvent.subscribe(userName => this.userEvent.next(userName));
        this.userUpdateEvent.subscribe(userName => this.userEvent.next(userName));
        this.userDeleteEvent.subscribe(userName => this.userEvent.next(userName));
    }



    getUsers() : Promise<User[]> {
        let url = Server.GET_ALL_USERS;

        return this.httpUtils.get(url)
            .then(response => {
                if(!response._body)
                    return [];

                let data : any = response.json();

                return this.serverUsersToClientUsers(data);
            });
    }

    private serverUsersToClientUsers(serverUsers : any[]) : User[] {
        return serverUsers.map(this.serverUserToClientUser);
    }

    getUser(userName : string) : Promise<User> {
        let url = Server.GET_USER.replace('{userName}', userName);

        return this.httpUtils.get(url)
            .then(response => {
                if(!response._body || response.status===404)
                    return null;

                let data : any = response.json();

                return this.serverUserToClientUser(data);
            });
    }

    private serverUserToClientUser(serverUser : any) : User {
        if(!serverUser)
            return null;

        return new User(
            serverUser.userName,
            serverUser.password,
            serverUser.email,
            serverUser.gravatarEmail,
            new Date(serverUser.creationDate),
            serverUser.role);
    }

    createUser(user : User) : Promise<string> {
        let url = Server.INSERT_USER;

        let data = this.clientUserToServerUser(user);

        return this.httpUtils.post(url, data)
            .then((response) => {
                this.fireInsertEvent(user.userName);
                return user.userName;
            });
    }

    private clientUserToServerUser(user : User) : any{
        return {
            userName : user.userName,
            password : user.password,
            email : user.email,
            gravatarEmail : user.gravatarEmail,
            creationDate : user.creationDate,
            role : user.role
        };
    }

    updateUser(user : User) : Promise<boolean> {
        let url = Server.UPDATE_USER.replace("{userName}", user.userName);

        let data = this.clientUserToServerUser(user);

        return this.httpUtils.post(url, data)
            .then((response) => {
                this.fireUpdateEvent(user.userName);
                return true;
            });
    }

    deleteUser(userName : string) : Promise<boolean> {
        let url = Server.DELETE_USER.replace("{userName}", userName);

        return this.httpUtils.post(url, { })
            .then((response) => {
                this.fireDeleteEvent(userName);
                return true;
            });
    }

    fireInsertEvent(userName: string) {
        this.userInsertEvent.next(userName);
    }

    fireUpdateEvent(userName: string) {
        this.userUpdateEvent.next(userName);
    }

    fireDeleteEvent(userName: string) {
        this.userDeleteEvent.next(userName);
    }

}
