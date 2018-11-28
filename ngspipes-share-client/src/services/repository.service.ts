import { Injectable }    from '@angular/core';
import { Subject } from 'rxjs';

import { HttpService } from './http.service';
import { ServersRoutes } from './servers-routes';
import { Repository, EntityType, LocationType } from '../entities/repository';

@Injectable()
export class RepositoryService {

    repositoryEvent = new Subject<string>();
    repositoryCreateEvent = new Subject<string>();
    repositoryUpdateEvent = new Subject<string>();
    repositoryDeleteEvent = new Subject<string>();



    constructor(private httpService: HttpService) {
        this.repositoryCreateEvent.subscribe(repositoryName => this.repositoryEvent.next(repositoryName));
        this.repositoryUpdateEvent.subscribe(repositoryName => this.repositoryEvent.next(repositoryName));
        this.repositoryDeleteEvent.subscribe(repositoryName => this.repositoryEvent.next(repositoryName));
    }



    public getAllRepositories() : Promise<Repository[]> {
        let url = ServersRoutes.GET_ALL_REPOSITORIES_ROUTE;

        return this.httpService.get(url)
            .then(response => {
                if(!response.text())
                    return [];

                let data : any = response.json();

                return this.serverRepositoriesToClientRepositories(data);
            });
    }

    private serverRepositoriesToClientRepositories(repositories : any[]) : Repository[] {
        return repositories.map(this.serverRepositoryToClienteRepository);
    }

    public getRepository(repositoryName : string) : Promise<Repository> {
        let url = ServersRoutes.GET_REPOSITORY_ROUTE.replace('{repositoryName}', repositoryName);

        return this.httpService.get(url)
            .then(response => {
                if(!response.text() || response.status===404)
                    return null;

                let data : any = response.json();

                return this.serverRepositoryToClienteRepository(data);
            });
    }

    private serverRepositoryToClienteRepository(repository : any) : Repository {
        let repo = new Repository(
            repository.repositoryName,
            repository.entityType,
            repository.locationType,
            repository.description,
            new Date(repository.creationDate),
            repository.isPublic,
            repository.owner.userName,
            repository.location
        );

        if(repo.locationType === LocationType.INTERNAL) {
            repo.location = repo.location.replace(
                "{server}",
                repo.entityType === EntityType.TOOLS ? ServersRoutes.TOOLS_SERVER_URI : ServersRoutes.PIPELINES_SERVER_URI
            );
        }

        return repo;
    }

    public createRepository(repository : Repository) : Promise<string> {
        let url = ServersRoutes.CREATE_REPOSITORY_ROUTE;

        let data = this.clientRepositoryToServerRepository(repository);

        return this.httpService.post(url, data)
            .then((response) => {
                this.fireCreateEvent(repository.repositoryName);
                return repository.repositoryName;
            });
    }

    private clientRepositoryToServerRepository(repository : Repository) : any {
        let repo = {
            repositoryName : repository.repositoryName,
            entityType : repository.entityType,
            locationType : repository.locationType,
            description : repository.description,
            creationDate : repository.creationDate,
            isPublic : repository.isPublic,
            owner : { userName : repository.ownerName },
            location : repository.location
        };

        if(repo.locationType === LocationType.INTERNAL && repo.location) {
            repo.location = repo.location.replace(
                repo.entityType === EntityType.TOOLS ? ServersRoutes.TOOLS_SERVER_URI : ServersRoutes.PIPELINES_SERVER_URI,
                "{server}"
            );
        }

        return repo;
    }

    public updateRepository(repository : Repository) : Promise<boolean> {
        let url = ServersRoutes.UPDATE_REPOSITORY_ROUTE.replace("{repositoryName}", repository.repositoryName);

        let data = this.clientRepositoryToServerRepository(repository);

        return this.httpService.put(url, data)
            .then((response) => {
                this.fireUpdateEvent(repository.repositoryName);
                return true;
            });
    }

    public deleteRepository(repositoryName : string) : Promise<boolean> {
        let url = ServersRoutes.DELETE_REPOSITORY_ROUTE.replace("{repositoryName}", repositoryName);

        return this.httpService.delete(url)
            .then((response) => {
                this.fireDeleteEvent(repositoryName);
                return true;
            });
    }

    public getRepositoriesOfUser(userName : string) : Promise<Repository[]> {
        let url = ServersRoutes.GET_ALL_REPOSITORIES_ROUTE + "?userName=" + userName;

        return this.httpService.get(url)
            .then(response => {
                if(!response.text())
                    return [];

                let data : any = response.json();

                return this.serverRepositoriesToClientRepositories(data);
            });
    }

    public getRepositoriesNames() : Promise<string[]> {
        let url = ServersRoutes.GET_REPOSITORIES_NAMES_ROUTE;

        return this.httpService.get(url)
            .then(response => {
                if(!response.text())
                    return [];

               return JSON.parse(response.text());
            });
    }

    public getRepositoriesAccessibleByUser(userName : string) : Promise<Repository[]> {
        let url = ServersRoutes.GET_ALL_REPOSITORIES_ROUTE + "?accessibleBy=" + userName;

        return this.httpService.get(url)
            .then(response => {
                if(!response.text())
                    return [];

                let data : any = response.json();

                return this.serverRepositoriesToClientRepositories(data);
            });
    }


    fireCreateEvent(repositoryName: string) {
        this.repositoryCreateEvent.next(repositoryName);
    }

    fireUpdateEvent(repositoryName: string) {
        this.repositoryUpdateEvent.next(repositoryName);
    }

    fireDeleteEvent(repositoryName: string) {
        this.repositoryDeleteEvent.next(repositoryName);
    }

}
