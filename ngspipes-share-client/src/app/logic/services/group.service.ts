import { Injectable }    from '@angular/core';
import { Subject } from 'rxjs';

import { HttpUtils } from './http-utils';
import { Server } from './server';
import { Group } from '../domain/group';

@Injectable()
export class GroupService {

    groupEvent = new Subject<string>();
    groupInsertEvent = new Subject<string>();
    groupUpdateEvent = new Subject<string>();
    groupDeleteEvent = new Subject<string>();



    constructor(private httpUtils: HttpUtils) {
        this.groupInsertEvent.subscribe(groupName => this.groupEvent.next(groupName));
        this.groupUpdateEvent.subscribe(groupName => this.groupEvent.next(groupName));
        this.groupDeleteEvent.subscribe(groupName => this.groupEvent.next(groupName));
    }



    getGroups() : Promise<Group[]> {
        let url = Server.GET_ALL_GROUPS;

        return this.httpUtils.get(url)
            .then(response => {
                if(!response._body)
                    return [];

                let data : any = response.json();

                return this.serverGroupsToClientGroups(data);
            });
    }

    private serverGroupsToClientGroups(serverGroups : any[]) : Group[] {
        return serverGroups.map(this.serverGroupToClientGroup);
    }

    getGroup(groupName : string) : Promise<Group> {
        let url = Server.GET_GROUP.replace('{groupName}', groupName);

        return this.httpUtils.get(url)
            .then(response => {
                if(!response._body || response.status===404)
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
            serverGroup.owner.userName,
            serverGroup.members.map(member => member.userName)
        );
    }

    createGroup(group : Group) : Promise<string> {
        let url = Server.INSERT_GROUP;

        let data = this.clientGroupToServerGroup(group);

        return this.httpUtils.post(url, data)
            .then((response) => {
                this.fireInsertEvent(group.groupName);
                return group.groupName;
            });
    }

    private clientGroupToServerGroup(group : Group) : any {
        return {
            groupName : group.groupName,
            description : group.description,
            creationDate : group.creationDate,
            owner : { userName : group.ownerName },
            members : group.members.map(member => { return {userName : member} })
        };
    }

    updateGroup(group : Group) : Promise<boolean> {
        let url = Server.UPDATE_GROUP.replace("{groupName}", group.groupName);

        let data = this.clientGroupToServerGroup(group);

        return this.httpUtils.put(url, data)
            .then((response) => {
                this.fireUpdateEvent(group.groupName);
                return true;
            });
    }

    deleteGroup(groupName : string) : Promise<boolean> {
        let url = Server.DELETE_GROUP.replace("{groupName}", groupName);

        return this.httpUtils.delete(url)
            .then((response) => {
                this.fireDeleteEvent(groupName);
                return true;
            });
    }

    getGroupsOfUser(userName : string) : Promise<Group[]> {
        let url = Server.GET_GROUPS_OF_USER.replace("{userName}", userName);

        return this.httpUtils.get(url)
            .then(response => {
                if(!response._body)
                    return [];

                let data : any = response.json();

                return this.serverGroupsToClientGroups(data);
            });
    }

    getGroupsWithMember(userName : string) : Promise<Group[]> {
        let url = Server.GET_GROUPS_WITH_MEMBER.replace("{userName}", userName);

        return this.httpUtils.get(url)
            .then(response => {
                if(!response._body)
                    return [];

                let data : any = response.json();

                return this.serverGroupsToClientGroups(data);
            });
    }

    updateImage(groupName : string, file : any) : Promise<boolean> {
        let url = Server.UPDATE_GROUP_IMAGE.replace('{groupName}', groupName);

        return this.httpUtils.uploadFile(url, file)
            .then((response) => {
                this.fireUpdateEvent(groupName);
                return true;
            });
    }

    deleteImage(groupName : string) : Promise<boolean> {
        let url = Server.DELETE_GROUP_IMAGE.replace('{groupName}', groupName);

        return this.httpUtils.delete(url)
            .then((response) => {
                this.fireUpdateEvent(groupName);
                return true;
            });
    }

    fireInsertEvent(groupName: string) {
        this.groupInsertEvent.next(groupName);
    }

    fireUpdateEvent(groupName: string) {
        this.groupUpdateEvent.next(groupName);
    }

    fireDeleteEvent(groupName: string) {
        this.groupDeleteEvent.next(groupName);
    }

}
