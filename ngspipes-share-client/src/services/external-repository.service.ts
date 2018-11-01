import { Injectable }    from '@angular/core';
import { Subject } from 'rxjs';

import { HttpService } from './http.service';
import { ServersRoutes } from './servers-routes';
import { ExternalRepository, ExternalRepositoryType } from '../entities/external-repository';

@Injectable()
export class ExternalRepositoryService {

    repositoryEvent = new Subject<string>();
    repositoryCreateEvent = new Subject<string>();
    repositoryUpdateEvent = new Subject<string>();
    repositoryDeleteEvent = new Subject<string>();



    constructor(private httpService: HttpService) {
        this.repositoryCreateEvent.subscribe(repositoryName => this.repositoryEvent.next(repositoryName));
        this.repositoryUpdateEvent.subscribe(repositoryName => this.repositoryEvent.next(repositoryName));
        this.repositoryDeleteEvent.subscribe(repositoryName => this.repositoryEvent.next(repositoryName));
    }



    public getAllRepositories() : Promise<ExternalRepository[]> {
        let url = ServersRoutes.GET_ALL_EXTERNAL_REPOSITORIES_ROUTE;

        return this.httpService.get(url)
            .then(response => {
                if(!response.text())
                    return [];

                let data : any = response.json();

                return this.serverRepositoriesToClientRepositories(data);
            });
    }

    private serverRepositoriesToClientRepositories(repositories : any[]) : ExternalRepository[] {
        return repositories.map(this.serverRepositoryToClienteRepository);
    }

    public getRepository(repositoryName : string) : Promise<ExternalRepository> {
        let url = ServersRoutes.GET_EXTERNAL_REPOSITORY_ROUTE.replace('{repositoryName}', repositoryName);

        return this.httpService.get(url)
            .then(response => {
                if(!response.text() || response.status===404)
                    return null;

                let data : any = response.json();

                return this.serverRepositoryToClienteRepository(data);
            });
    }

    private serverRepositoryToClienteRepository(repository : any) : ExternalRepository {
        return new ExternalRepository(
            repository.repositoryName,
            repository.type,
            repository.description,
            new Date(repository.publishDate),
            repository.publisher.userName,
            repository.location
        );
    }

    public createRepository(repository : ExternalRepository) : Promise<boolean> {
        let url = ServersRoutes.CREATE_EXTERNAL_REPOSITORY_ROUTE;

        let data = this.clientRepositoryToServerRepository(repository);

        return this.httpService.post(url, data)
            .then((response) => {
                this.fireCreateEvent(repository.repositoryName);
                return true;
            });
    }

    private clientRepositoryToServerRepository(repository : ExternalRepository) : any {
        return {
            repositoryName : repository.repositoryName,
            type : repository.type,
            description : repository.description,
            publishDate : repository.publishDate,
            publisher : { userName : repository.publisherName },
            location : repository.location
        };
    }

    public updateRepository(repository : ExternalRepository) : Promise<boolean> {
        let url = ServersRoutes.UPDATE_EXTERNAL_REPOSITORY_ROUTE.replace("{repositoryName}", repository.repositoryName);

        let data = this.clientRepositoryToServerRepository(repository);

        return this.httpService.put(url, data)
            .then((response) => {
                this.fireUpdateEvent(repository.repositoryName);
                return true;
            });
    }

    public deleteRepository(repositoryName : string) : Promise<boolean> {
        let url = ServersRoutes.DELETE_EXTERNAL_REPOSITORY_ROUTE.replace("{repositoryName}", repositoryName);

        return this.httpService.delete(url)
            .then((response) => {
                this.fireDeleteEvent(repositoryName);
                return true;
            });
    }

    public getRepositoriesOfUser(userName : string) : Promise<ExternalRepository[]> {
        let url = ServersRoutes.GET_ALL_EXTERNAL_REPOSITORIES_ROUTE + "?userName=" + userName;

        return this.httpService.get(url)
            .then(response => {
                if(!response.text())
                    return [];

                let data : any = response.json();

                return this.serverRepositoriesToClientRepositories(data);
            });
    }

    public getRepositoriesNames() : Promise<string[]> {
        let url = ServersRoutes.GET_EXTERNAL_REPOSITORIES_NAMES_ROUTE;

        return this.httpService.get(url)
            .then(response => {
                if(!response.text())
                    return [];

               return JSON.parse(response.text());
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
