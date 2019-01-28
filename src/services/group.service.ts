import { Injectable }    from '@angular/core';
import { Subject } from 'rxjs';

import { HttpService } from './http.service';
import { ServersRoutes } from './servers-routes';
import { Group } from '../entities/group';
import { CacheService } from './cache.service';

@Injectable()
export class GroupService {

    groupEvent = new Subject<string>();
    groupCreateEvent = new Subject<string>();
    groupUpdateEvent = new Subject<string>();
    groupDeleteEvent = new Subject<string>();



    constructor(private httpService: HttpService, private cacheService : CacheService) {
        this.groupCreateEvent.subscribe(groupName => this.groupEvent.next(groupName));
        this.groupUpdateEvent.subscribe(groupName => this.groupEvent.next(groupName));
        this.groupDeleteEvent.subscribe(groupName => this.groupEvent.next(groupName));
    }



    public getAllGroups() : Promise<Group[]> {
        let url = ServersRoutes.GET_ALL_GROUPS_ROUTE;

        return this.httpService.get(url)
            .then(response => {
                if(!response.text())
                    return [];

                let data : any = response.json();

                return this.serverGroupsToClientGroups(data);
            });
    }

    private serverGroupsToClientGroups(serverGroups : any[]) : Group[] {
        return serverGroups.map(this.serverGroupToClientGroup);
    }

    public getGroup(groupName : string) : Promise<Group> {
        let url = ServersRoutes.GET_GROUP_ROUTE.replace('{groupName}', groupName);

        return this.httpService.get(url)
            .then(response => {
                if(!response.text() || response.status===404)
                    return null;

                let data : any = response.json();

                return this.serverGroupToClientGroup(data);
            });
    }

    private serverGroupToClientGroup(serverGroup : any) : Group {
        return new Group(
            serverGroup.groupName,
            serverGroup.description,
            new Date(serverGroup.creationDate),
            serverGroup.owner.userName
        );
    }

    public createGroup(group : Group) : Promise<string> {
        let url = ServersRoutes.CREATE_GROUP_ROUTE;

        let data = this.clientGroupToServerGroup(group);

        return this.httpService.post(url, data)
            .then((response) => {
                this.fireCreateEvent(group.groupName);
                return group.groupName;
            });
    }

    private clientGroupToServerGroup(group : Group) : any {
        return {
            groupName : group.groupName,
            description : group.description,
            creationDate : group.creationDate,
            owner : { userName : group.ownerName }
        };
    }

    public updateGroup(group : Group) : Promise<boolean> {
        let url = ServersRoutes.UPDATE_GROUP_ROUTE.replace("{groupName}", group.groupName);

        let data = this.clientGroupToServerGroup(group);

        return this.httpService.put(url, data)
            .then((response) => {
                this.fireUpdateEvent(group.groupName);
                return true;
            });
    }

    public deleteGroup(groupName : string) : Promise<boolean> {
        let url = ServersRoutes.DELETE_GROUP_ROUTE.replace("{groupName}", groupName);

        return this.httpService.delete(url)
            .then((response) => {
                this.fireDeleteEvent(groupName);
                return true;
            });
    }

    public getGroupsOfUser(userName : string) : Promise<Group[]> {
        let url = ServersRoutes.GET_ALL_GROUPS_ROUTE + "?userName=" + userName;

        return this.httpService.get(url)
            .then(response => {
                if(!response.text())
                    return [];

                let data : any = response.json();

                return this.serverGroupsToClientGroups(data);
            });
    }

    public getGroupImage(groupName : string) : Promise<any> {
        if(this.cacheService.get("GROUP_" + groupName) !== undefined)
            return Promise.resolve(this.cacheService.get("GROUP_" + groupName));

        let url = ServersRoutes.GET_GROUP_IMAGE_ROUTE.replace('{groupName}', groupName);

        return this.httpService.get(url)
            .then(response => {
                if(!response.text() || response.status===404)
                    return null;

                this.cacheService.put("GROUP_" + groupName, response.text());

                return response.text();
            });
    }

    public changeGroupImage(groupName : string, file : any) : Promise<boolean> {
        let url = ServersRoutes.CHANGE_GROUP_IMAGE_ROUTE.replace('{groupName}', groupName);

        return this.httpService.uploadFile(url, file)
            .then((response) => {
                this.cacheService.remove("GROUP_" + groupName);

                this.fireUpdateEvent(groupName);

                return true;
            });
    }

    public deleteGroupImage(groupName : string) : Promise<boolean> {
        let url = ServersRoutes.DELETE_GROUP_IMAGE_ROUTE.replace('{groupName}', groupName);

        return this.httpService.delete(url)
            .then((response) => {
                this.cacheService.remove("GROUP_" + groupName);

                this.fireUpdateEvent(groupName);

                return true;
            });
    }

    public getGroupsNames() : Promise<string[]> {
        return this.httpService.get(ServersRoutes.GET_GROUPS_NAMES_ROUTE)
        .then((response) => {
            if(!response.text())
                return [];

            return JSON.parse(response.text());
        });
    }

    public getGroupImageURL(groupName : string) : string {
        return ServersRoutes.GET_GROUP_IMAGE_ROUTE.replace("{groupName}", groupName);
    }

    public getGroupsAccessibleByUser(userName : string) : Promise<Group[]> {
        let url = ServersRoutes.GET_ALL_GROUPS_ROUTE + "?accessibleBy=" + userName;

        return this.httpService.get(url)
            .then(response => {
                if(!response.text())
                    return [];

                let data : any = response.json();

                return this.serverGroupsToClientGroups(data);
            });
    }


    fireCreateEvent(groupName: string) {
        this.groupCreateEvent.next(groupName);
    }

    fireUpdateEvent(groupName: string) {
        this.groupUpdateEvent.next(groupName);
    }

    fireDeleteEvent(groupName: string) {
        this.groupDeleteEvent.next(groupName);
    }

}
