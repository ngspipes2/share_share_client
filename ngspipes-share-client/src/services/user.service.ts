import { Injectable }    from '@angular/core';
import { Subject } from 'rxjs';

import { HttpService } from './http.service';
import { ServersRoutes } from './servers-routes';
import { User, UserRole } from '../entities/user';
import { SessionService } from './session.service';

@Injectable()
export class UserService {

    userEvent = new Subject<string>();
    userCreateEvent = new Subject<string>();
    userUpdateEvent = new Subject<string>();
    userDeleteEvent = new Subject<string>();



    constructor(private httpService: HttpService, private sessionService : SessionService) {
        this.userCreateEvent.subscribe(userName => this.userEvent.next(userName));
        this.userUpdateEvent.subscribe(userName => this.userEvent.next(userName));
        this.userDeleteEvent.subscribe(userName => this.userEvent.next(userName));
    }



    public getAllUsers() : Promise<User[]> {
        let url = ServersRoutes.GET_ALL_USERS_ROUTE;

        return this.httpService.get(url)
            .then(response => {
                if(!response.text())
                    return [];

                let data : any = response.json();

                return this.serverUsersToClientUsers(data);
            });
    }

    private serverUsersToClientUsers(serverUsers : any[]) : User[] {
        return serverUsers.map(this.serverUserToClientUser);
    }

    public getUser(userName : string) : Promise<User> {
        let url = ServersRoutes.GET_USER_ROUTE.replace('{userName}', userName);

        return this.httpService.get(url)
            .then(response => {
                if(!response.text() || response.status===404)
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
            serverUser.name,
            new Date(serverUser.creationDate),
            serverUser.role);
    }

    public createUser(user : User) : Promise<string> {
        let url = ServersRoutes.CREATE_USER_ROUTE;

        let data = user;

        return this.httpService.post(url, data)
            .then((response) => {
                this.fireCreateEvent(user.userName);
                return user.userName;
            });
    }

    public updateUser(user : User) : Promise<boolean> {
        let url = ServersRoutes.UPDATE_USER_ROUTE.replace("{userName}", user.userName);

        let data = user;

        return this.httpService.put(url, data)
            .then((response) => {
                this.fireUpdateEvent(user.userName);
                return true;
            });
    }

    public deleteUser(userName : string) : Promise<boolean> {
        let url = ServersRoutes.DELETE_USER_ROUTE.replace("{userName}", userName);

        return this.httpService.delete(url)
            .then((response) => {
                this.fireDeleteEvent(userName);
                return true;
            });
    }

    public getUserImage(userName : string) : Promise<any> {
        let url = ServersRoutes.GET_USER_IMAGE_ROUTE.replace('{userName}', userName);

        return this.httpService.get(url)
            .then(response => {
                if(!response.text() || response.status===404)
                    return null;

                return response.text();
            });
    }

    public changeUserImage(userName : string, file : any) : Promise<boolean> {
        let url = ServersRoutes.CHANGE_USER_IMAGE_ROUTE.replace('{userName}', userName);

        return this.httpService.uploadFile(url, file)
            .then((response) => {
                this.fireUpdateEvent(userName);
                return true;
            });
    }

    public deleteUserImage(userName : string) : Promise<boolean> {
        let url = ServersRoutes.DELETE_USER_IMAGE_ROUTE.replace('{userName}', userName);

        return this.httpService.delete(url)
            .then((response) => {
                this.fireUpdateEvent(userName);
                return true;
            });
    }

    public changeUserPassword(userName : string, currentPassword : string, newPassword : string) : Promise<boolean> {
        let url = ServersRoutes.CHANGE_USER_PASSWORD_ROUTE.replace("{userName}", userName);

        let data = {
            currentPassword : currentPassword,
            newPassword : newPassword
        };

        return this.httpService.post(url, data)
            .then((response) => {
                if(this.sessionService.getCurrentCredentials()[0] === userName) {
                    return this.sessionService.login(userName, data.newPassword)
                    .then(() => {
                        this.fireUpdateEvent(userName);
                        return true;
                    });
                }

                this.fireUpdateEvent(userName);
                return true;
            });
    }

    public getUsersNames() : Promise<string[]> {
        return this.httpService.get(ServersRoutes.GET_USERS_NAMES_ROUTE)
        .then((response) => {
            if(!response.text())
                return [];

            return JSON.parse(response.text());
        });
    }

    public getUserImageURL(userName : string) : string {
        return ServersRoutes.GET_USER_IMAGE_ROUTE.replace("{userName}", userName);
    }


    fireCreateEvent(userName: string) {
        this.userCreateEvent.next(userName);
    }

    fireUpdateEvent(userName: string) {
        this.userUpdateEvent.next(userName);
    }

    fireDeleteEvent(userName: string) {
        this.userDeleteEvent.next(userName);
    }

}
