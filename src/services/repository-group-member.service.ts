import { Injectable }    from '@angular/core';
import { Subject } from 'rxjs';

import { HttpService } from './http.service';
import { ServersRoutes } from './servers-routes';
import { RepositoryGroupMember } from '../entities/repository-group-member';

@Injectable()
export class RepositoryGroupMemberService {

    memberEvent = new Subject<number>();
    memberCreateEvent = new Subject<number>();
    memberUpdateEvent = new Subject<number>();
    memberDeleteEvent = new Subject<number>();



    constructor(private httpService: HttpService) {
        this.memberCreateEvent.subscribe(memberId => this.memberEvent.next(memberId));
        this.memberUpdateEvent.subscribe(memberId => this.memberEvent.next(memberId));
        this.memberDeleteEvent.subscribe(memberId => this.memberEvent.next(memberId));
    }



    public getAllMembers() : Promise<RepositoryGroupMember[]> {
        let url = ServersRoutes.GET_ALL_REPOSITORY_GROUP_MEMBERS_ROUTE;

        return this.httpService.get(url)
            .then(response => {
                if(!response.text())
                    return [];

                let data : any = response.json();

                return this.serverMembersToClientMembers(data);
            });
    }

    private serverMembersToClientMembers(serverMembers : any[]) : RepositoryGroupMember[] {
        return serverMembers.map(this.serverMemberToClientMember);
    }

    public getMember(memberId : number) : Promise<RepositoryGroupMember> {
        let url = ServersRoutes.GET_REPOSITORY_GROUP_MEMBER_ROUTE.replace('{memberId}', memberId.toString());

        return this.httpService.get(url)
            .then(response => {
                if(!response.text() || response.status===404)
                    return null;

                let data : any = response.json();

                return this.serverMemberToClientMember(data);
            });
    }

    private serverMemberToClientMember(serverMember : any) : RepositoryGroupMember {
        return new RepositoryGroupMember(
            serverMember.id,
            new Date(serverMember.creationDate),
            serverMember.group.groupName,
            serverMember.repository.repositoryName,
            serverMember.writeAccess,
        );
    }

    public createMember(member : RepositoryGroupMember) : Promise<number> {
        let url = ServersRoutes.CREATE_REPOSITORY_GROUP_MEMBER_ROUTE;

        let data = this.clientMemberToServerMember(member);

        return this.httpService.post(url, data)
            .then((response) => {
                member.id = Number(response.text());
                this.fireCreateEvent(member.id);
                return member.id;
            });
    }

    private clientMemberToServerMember(member : RepositoryGroupMember) : any {
        return {
            id : member.id,
            creationDate : member.creationDate,
            group : { groupName : member.groupName },
            repository : { repositoryName : member.repositoryName },
            writeAccess : member.writeAccess
        };
    }

    public updateMember(member : RepositoryGroupMember) : Promise<boolean> {
        let url = ServersRoutes.UPDATE_REPOSITORY_GROUP_MEMBER_ROUTE.replace("{memberId}", member.id.toString());

        let data = this.clientMemberToServerMember(member);

        return this.httpService.put(url, data)
            .then((response) => {
                this.fireUpdateEvent(member.id);
                return true;
            });
    }

    public deleteMember(memberId : number) : Promise<boolean> {
        let url = ServersRoutes.DELETE_REPOSITORY_GROUP_MEMBER_ROUTE.replace("{memberId}", memberId.toString());

        return this.httpService.delete(url)
            .then((response) => {
                this.fireDeleteEvent(memberId);
                return true;
            });
    }

    public getMembersOfRepository(repositoryName : string) : Promise<RepositoryGroupMember[]> {
        let url = ServersRoutes.GET_ALL_REPOSITORY_GROUP_MEMBERS_ROUTE + "?repositoryName=" + repositoryName;

        return this.httpService.get(url)
            .then(response => {
                if(!response.text())
                    return [];

                let data : any = response.json();

                return this.serverMembersToClientMembers(data);
            });
    }

    public getMembersWithGroup(groupName : string) : Promise<RepositoryGroupMember[]> {
        let url = ServersRoutes.GET_ALL_REPOSITORY_GROUP_MEMBERS_ROUTE + "?groupName=" + groupName;

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
