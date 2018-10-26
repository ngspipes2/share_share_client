import { Injectable }    from '@angular/core';
import { Subject } from 'rxjs';

import { HttpService } from './http.service';
import { ServersRoutes } from './servers-routes';
import { GroupMember } from '../entities/group-member';

@Injectable()
export class GroupMemberService {

    memberEvent = new Subject<number>();
    memberCreateEvent = new Subject<number>();
    memberUpdateEvent = new Subject<number>();
    memberDeleteEvent = new Subject<number>();



    constructor(private httpService: HttpService) {
        this.memberCreateEvent.subscribe(memberId => this.memberEvent.next(memberId));
        this.memberUpdateEvent.subscribe(memberId => this.memberEvent.next(memberId));
        this.memberDeleteEvent.subscribe(memberId => this.memberEvent.next(memberId));
    }



    public getAllMembers() : Promise<GroupMember[]> {
        let url = ServersRoutes.GET_ALL_GROUP_MEMBERS_ROUTE;

        return this.httpService.get(url)
            .then(response => {
                if(!response.text())
                    return [];

                let data : any = response.json();

                return this.serverMembersToClientMembers(data);
            });
    }

    private serverMembersToClientMembers(serverMembers : any[]) : GroupMember[] {
        return serverMembers.map(this.serverMemberToClientMember);
    }

    public getMember(memberId : number) : Promise<GroupMember> {
        let url = ServersRoutes.GET_GROUP_MEMBER_ROUTE.replace('{memberId}', memberId.toString());

        return this.httpService.get(url)
            .then(response => {
                if(!response.text() || response.status===404)
                    return null;

                let data : any = response.json();

                return this.serverMemberToClientMember(data);
            });
    }

    private serverMemberToClientMember(serverMember : any) : GroupMember {
        return new GroupMember(
            serverMember.id,
            new Date(serverMember.creationDate),
            serverMember.user.userName,
            serverMember.group.groupName,
            serverMember.writeAccess,
        );
    }

    public createMember(member : GroupMember) : Promise<number> {
        let url = ServersRoutes.CREATE_GROUP_MEMBER_ROUTE;

        let data = this.clientMemberToServerMember(member);

        return this.httpService.post(url, data)
            .then((response) => {
                member.id = Number(response.text());
                this.fireCreateEvent(member.id);
                return member.id;
            });
    }

    private clientMemberToServerMember(member : GroupMember) : any {
        return {
            id : member.id,
            creationDate : member.creationDate,
            user : { userName : member.userName },
            group : { groupName : member.groupName },
            writeAccess : member.writeAccess
        };
    }

    public updateMember(member : GroupMember) : Promise<boolean> {
        let url = ServersRoutes.UPDATE_GROUP_MEMBER_ROUTE.replace("{memberId}", member.id.toString());

        let data = this.clientMemberToServerMember(member);

        return this.httpService.put(url, data)
            .then((response) => {
                this.fireUpdateEvent(member.id);
                return true;
            });
    }

    public deleteMember(memberId : number) : Promise<boolean> {
        let url = ServersRoutes.DELETE_GROUP_MEMBER_ROUTE.replace("{memberId}", memberId.toString());

        return this.httpService.delete(url)
            .then((response) => {
                this.fireDeleteEvent(memberId);
                return true;
            });
    }

    public getMembersOfGroup(groupName : string) : Promise<GroupMember[]> {
        let url = ServersRoutes.GET_ALL_GROUP_MEMBERS_ROUTE + "?groupName=" + groupName;

        return this.httpService.get(url)
            .then(response => {
                if(!response.text())
                    return [];

                let data : any = response.json();

                return this.serverMembersToClientMembers(data);
            });
    }

    public getMembersWithUser(userName : string) : Promise<GroupMember[]> {
        let url = ServersRoutes.GET_ALL_GROUP_MEMBERS_ROUTE + "?userName=" + userName;

        return this.httpService.get(url)
            .then(response => {
                if(!response.text())
                    return [];

                let data : any = response.json();

                return this.serverMembersToClientMembers(data);
            });
    }


    fireCreateEvent(memberId: number) {
        this.memberCreateEvent.next(memberId);
    }

    fireUpdateEvent(memberId: number) {
        this.memberUpdateEvent.next(memberId);
    }

    fireDeleteEvent(memberId: number) {
        this.memberDeleteEvent.next(memberId);
    }

}
