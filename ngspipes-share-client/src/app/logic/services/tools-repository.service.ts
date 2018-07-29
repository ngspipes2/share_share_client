import { Injectable }    from '@angular/core';
import { Subject } from 'rxjs';

import { HttpUtils } from './http-utils';
import { Server } from './server';
import { ToolsRepository } from '../domain/tools-repository';

@Injectable()
export class ToolsRepositoryService {

    toolsRepositoryEvent = new Subject<number>();
    toolsRepositoryInsertEvent = new Subject<number>();
    toolsRepositoryUpdateEvent = new Subject<number>();
    toolsRepositoryDeleteEvent = new Subject<number>();



    constructor(private httpUtils: HttpUtils) {
        this.toolsRepositoryInsertEvent.subscribe(repositoryId => this.toolsRepositoryEvent.next(repositoryId));
        this.toolsRepositoryUpdateEvent.subscribe(repositoryId => this.toolsRepositoryEvent.next(repositoryId));
        this.toolsRepositoryDeleteEvent.subscribe(repositoryId => this.toolsRepositoryEvent.next(repositoryId));
    }



    getRepositories() : Promise<ToolsRepository[]> {
        let url = Server.GET_ALL_TOOLS_REPOSITORIES;

        return this.httpUtils.get(url)
            .then(response => {
                if(!response._body)
                    return [];

                let data : any = response.json();

                return this.serverRepositoriesToClientRepositories(data);
            });
    }

    private serverRepositoriesToClientRepositories(serverRepositories : any[]) : ToolsRepository[] {
        return serverRepositories.map(this.serverRepositoryToClientRepository);
    }

    getRepository(repositoryId : number) : Promise<ToolsRepository> {
        let url = Server.GET_TOOLS_REPOSITORY.replace('{repositoryId}', repositoryId.toString());

        return this.httpUtils.get(url)
            .then(response => {
                if(!response._body || response.status===404)
                    return null;

                let data : any = response.json();

                return this.serverRepositoryToClientRepository(data);
            });
    }

    private serverRepositoryToClientRepository(serverRepository : any) : ToolsRepository {
        return new ToolsRepository(
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

    createRepository(repository : ToolsRepository) : Promise<number> {
        let url = Server.INSERT_TOOLS_REPOSITORY;

        let data = this.clientRepositoryToServerRepository(repository);

        return this.httpUtils.post(url, data)
            .then((response) => {
                this.fireInsertEvent(repository.id);
                return response._body;
            });
    }

    private clientRepositoryToServerRepository(repository : ToolsRepository) : any {
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

    updateRepository(repository : ToolsRepository) : Promise<boolean> {
        let url = Server.UPDATE_TOOLS_REPOSITORY.replace("{repositoryId}", repository.id.toString());

        let data = this.clientRepositoryToServerRepository(repository);

        return this.httpUtils.put(url, data)
            .then((response) => {
                this.fireUpdateEvent(repository.id);
                return true;
            });
    }

    deleteRepository(repositoryId : number) : Promise<boolean> {
        let url = Server.DELETE_TOOLS_REPOSITORY.replace("{repositoryId}", repositoryId.toString());

        return this.httpUtils.delete(url)
            .then((response) => {
                this.fireDeleteEvent(repositoryId);
                return true;
            });
    }

    getRepositoriesOfUser(userName : string) : Promise<ToolsRepository[]> {
        let url = Server.GET_TOOLS_REPOSITORIES_OF_USER.replace("{userName}", userName);

        return this.httpUtils.get(url)
            .then(response => {
                if(!response._body)
                    return [];

                let data : any = response.json();

                return this.serverRepositoriesToClientRepositories(data);
            });
    }

    updateImage(repositoryId : number, file : any) : Promise<boolean> {
        let url = Server.UPDATE_TOOLS_REPOSITORY_IMAGE.replace('{repositoryId}', repositoryId.toString());

        return this.httpUtils.uploadFile(url, file)
            .then((response) => {
                this.fireUpdateEvent(repositoryId);
                return true;
            });
    }

    deleteImage(repositoryId : number) : Promise<boolean> {
        let url = Server.DELETE_TOOLS_REPOSITORY_IMAGE.replace('{repositoryId}', repositoryId.toString());

        return this.httpUtils.delete(url)
            .then((response) => {
                this.fireUpdateEvent(repositoryId);
                return true;
            });
    }

    fireInsertEvent(repositoryId: number) {
        this.toolsRepositoryInsertEvent.next(repositoryId);
    }

    fireUpdateEvent(repositoryId: number) {
        this.toolsRepositoryUpdateEvent.next(repositoryId);
    }

    fireDeleteEvent(repositoryId: number) {
        this.toolsRepositoryDeleteEvent.next(repositoryId);
    }

}
