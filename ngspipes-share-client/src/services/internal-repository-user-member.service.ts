import { Injectable }    from '@angular/core';
import { Subject } from 'rxjs';

import { HttpService } from './http.service';
import { ServersRoutes } from './servers-routes';
import { InternalRepositoryUserMember } from '../entities/internal-repository-user-member';

@Injectable()
export class InternalRepositoryUserMemberService {

    memberEvent = new Subject<number>();
    memberCreateEvent = new Subject<number>();
    memberUpdateEvent = new Subject<number>();
    memberDeleteEvent = new Subject<number>();



    constructor(private httpService: HttpService) {
        this.memberCreateEvent.subscribe(memberId => this.memberEvent.next(memberId));
        this.memberUpdateEvent.subscribe(memberId => this.memberEvent.next(memberId));
        this.memberDeleteEvent.subscribe(memberId => this.memberEvent.next(memberId));
    }



    public getAllMembers() : Promise<InternalRepositoryUserMember[]> {
        let url = ServersRoutes.GET_ALL_INTERNAL_REPOSITORY_USER_MEMBERS_ROUTE;

        return this.httpService.get(url)
            .then(response => {
                if(!response.text())
                    return [];

                let data : any = response.json();

                return this.serverMembersToClientMembers(data);
            });
    }

    private serverMembersToClientMembers(serverMembers : any[]) : InternalRepositoryUserMember[] {
        return serverMembers.map(this.serverMemberToClientMember);
    }

    public getMember(memberId : number) : Promise<InternalRepositoryUserMember> {
        let url = ServersRoutes.GET_INTERNAL_REPOSITORY_USER_MEMBER_ROUTE.replace('{memberId}', memberId.toString());

        return this.httpService.get(url)
            .then(response => {
                if(!response.text() || response.status===404)
                    return null;

                let data : any = response.json();

                return this.serverMemberToClientMember(data);
            });
    }

    private serverMemberToClientMember(serverMember : any) : InternalRepositoryUserMember {
        return new InternalRepositoryUserMember(
            serverMember.id,
            new Date(serverMember.creationDate),
            serverMember.user.userName,
            serverMember.repository.id,
            serverMember.writeAccess,
        );
    }

    public createMember(member : InternalRepositoryUserMember) : Promise<number> {
        let url = ServersRoutes.CREATE_INTERNAL_REPOSITORY_USER_MEMBER_ROUTE;

        let data = this.clientMemberToServerMember(member);

        return this.httpService.post(url, data)
            .then((response) => {
                member.id = Number(response.text());
                this.fireCreateEvent(member.id);
                return member.id;
            });
    }

    private clientMemberToServerMember(member : InternalRepositoryUserMember) : any {
        return {
            id : member.id,
            creationDate : member.creationDate,
            user : { userName : member.userName },
            repository : { id : member.repositoryId },
            writeAccess : member.writeAccess
        };
    }

    public updateMember(member : InternalRepositoryUserMember) : Promise<boolean> {
        let url = ServersRoutes.UPDATE_INTERNAL_REPOSITORY_USER_MEMBER_ROUTE.replace("{memberId}", member.id.toString());

        let data = this.clientMemberToServerMember(member);

        return this.httpService.put(url, data)
            .then((response) => {
                this.fireUpdateEvent(member.id);
                return true;
            });
    }

    public deleteMember(memberId : number) : Promise<boolean> {
        let url = ServersRoutes.DELETE_INTERNAL_REPOSITORY_USER_MEMBER_ROUTE.replace("{memberId}", memberId.toString());

        return this.httpService.delete(url)
            .then((response) => {
                this.fireDeleteEvent(memberId);
                return true;
            });
    }

    public getMembersOfRepository(repositoryId : number) : Promise<InternalRepositoryUserMember[]> {
        let url = ServersRoutes.GET_ALL_INTERNAL_REPOSITORY_USER_MEMBERS_ROUTE + "?repositoryId=" + repositoryId;

        return this.httpService.get(url)
            .then(response => {
                if(!response.text())
                    return [];

                let data : any = response.json();

                return this.serverMembersToClientMembers(data);
            });
    }

    public getMembersWithUser(userName : string) : Promise<InternalRepositoryUserMember[]> {
        let url = ServersRoutes.GET_ALL_INTERNAL_REPOSITORY_USER_MEMBERS_ROUTE + "?userName=" + userName;

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