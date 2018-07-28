import { Injectable }    from '@angular/core';
import { Subject } from 'rxjs';

import { HttpUtils } from './http-utils';
import { Server } from './server';
import { PipelinesRepository } from '../domain/pipelines-repository';

@Injectable()
export class PipelinesRepositoryService {

    pipelinesRepositoryEvent = new Subject<number>();
    pipelinesRepositoryInsertEvent = new Subject<number>();
    pipelinesRepositoryUpdateEvent = new Subject<number>();
    pipelinesRepositoryDeleteEvent = new Subject<number>();



    constructor(private httpUtils: HttpUtils) {
        this.pipelinesRepositoryInsertEvent.subscribe(repositoryId => this.pipelinesRepositoryEvent.next(repositoryId));
        this.pipelinesRepositoryUpdateEvent.subscribe(repositoryId => this.pipelinesRepositoryEvent.next(repositoryId));
        this.pipelinesRepositoryDeleteEvent.subscribe(repositoryId => this.pipelinesRepositoryEvent.next(repositoryId));
    }



    getRepositories() : Promise<PipelinesRepository[]> {
        let url = Server.GET_ALL_PIPELINES_REPOSITORIES;

        return this.httpUtils.get(url)
            .then(response => {
                if(!response._body)
                    return [];

                let data : any = response.json();

                return this.serverRepositoriesToClientRepositories(data);
            });
    }

    private serverRepositoriesToClientRepositories(serverRepositories : any[]) : PipelinesRepository[] {
        return serverRepositories.map(this.serverRepositoryToClientRepository);
    }

    getRepository(repositoryId : number) : Promise<PipelinesRepository> {
        let url = Server.GET_PIPELINES_REPOSITORY.replace('{repositoryId}', repositoryId.toString());

        return this.httpUtils.get(url)
            .then(response => {
                if(!response._body || response.status===404)
                    return null;

                let data : any = response.json();

                return this.serverRepositoryToClientRepository(data);
            });
    }

    private serverRepositoryToClientRepository(serverRepository : any) : PipelinesRepository {
        return new PipelinesRepository(
            serverRepository.id,
            serverRepository.name,
            serverRepository.description,
            new Date(serverRepository.creationDate),
            serverRepository.isPublic,
            serverRepository.owner.userName,
            serverRepository.groupsAccess.map(group => group.groupName),
            serverRepository.usersAccess.map(user => user.userName)
        );
    }

    createRepository(repository : PipelinesRepository) : Promise<number> {
        let url = Server.INSERT_PIPELINES_REPOSITORY;

        let data = this.clientRepositoryToServerRepository(repository);

        return this.httpUtils.post(url, data)
            .then((response) => {
                this.fireInsertEvent(repository.id);
                return response._body;
            });
    }

    private clientRepositoryToServerRepository(repository : PipelinesRepository) : any {
        return {
            id : repository.id,
            name : repository.name,
            description : repository.description,
            creationDate : repository.creationDate,
            isPublic : repository.isPublic,
            owner : { userName : repository.ownerName },
            groupsAccess : repository.groupsAccess.map(groupName => { return {groupName : groupName}; }),
            usersAccess : repository.usersAccess.map(userName => { return {userName : userName}; })
        };
    }

    updateRepository(repository : PipelinesRepository) : Promise<boolean> {
        let url = Server.UPDATE_PIPELINES_REPOSITORY.replace("{repositoryId}", repository.id.toString());

        let data = this.clientRepositoryToServerRepository(repository);

        return this.httpUtils.post(url, data)
            .then((response) => {
                this.fireUpdateEvent(repository.id);
                return true;
            });
    }

    deleteRepository(repositoryId : number) : Promise<boolean> {
        let url = Server.DELETE_PIPELINES_REPOSITORY.replace("{repositoryId}", repositoryId.toString());

        return this.httpUtils.post(url, { })
            .then((response) => {
                this.fireDeleteEvent(repositoryId);
                return true;
            });
    }

    getRepositoriesOfUser(userName : string) : Promise<PipelinesRepository[]> {
        let url = Server.GET_PIPELINES_REPOSITORIES_OF_USER.replace("{userName}", userName);

        return this.httpUtils.get(url)
            .then(response => {
                if(!response._body)
                    return [];

                let data : any = response.json();

                return this.serverRepositoriesToClientRepositories(data);
            });
    }

    fireInsertEvent(repositoryId: number) {
        this.pipelinesRepositoryInsertEvent.next(repositoryId);
    }

    fireUpdateEvent(repositoryId: number) {
        this.pipelinesRepositoryUpdateEvent.next(repositoryId);
    }

    fireDeleteEvent(repositoryId: number) {
        this.pipelinesRepositoryDeleteEvent.next(repositoryId);
    }

}
