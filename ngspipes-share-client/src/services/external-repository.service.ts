import { Injectable }    from '@angular/core';
import { Subject } from 'rxjs';

import { HttpService } from './http.service';
import { ServersRoutes } from './servers-routes';
import { ExternalRepository, ExternalRepositoryType } from '../entities/external-repository';

@Injectable()
export class ExternalRepositoryService {

    repositoryEvent = new Subject<number>();
    repositoryCreateEvent = new Subject<number>();
    repositoryUpdateEvent = new Subject<number>();
    repositoryDeleteEvent = new Subject<number>();



    constructor(private httpService: HttpService) {
        this.repositoryCreateEvent.subscribe(repositoryId => this.repositoryEvent.next(repositoryId));
        this.repositoryUpdateEvent.subscribe(repositoryId => this.repositoryEvent.next(repositoryId));
        this.repositoryDeleteEvent.subscribe(repositoryId => this.repositoryEvent.next(repositoryId));
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

    public getRepository(repositoryId : number) : Promise<ExternalRepository> {
        let url = ServersRoutes.GET_EXTERNAL_REPOSITORY_ROUTE.replace('{repositoryId}', repositoryId.toString());

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
            repository.id,
            repository.type,
            repository.name,
            repository.description,
            new Date(repository.publishDate),
            repository.publisher.userName,
            repository.location
        );
    }

    public createRepository(repository : ExternalRepository) : Promise<number> {
        let url = ServersRoutes.CREATE_EXTERNAL_REPOSITORY_ROUTE;

        let data = this.clientRepositoryToServerRepository(repository);

        return this.httpService.post(url, data)
            .then((response) => {
                repository.id = Number(response.text());
                this.fireCreateEvent(repository.id);
                return repository.id;
            });
    }

    private clientRepositoryToServerRepository(repository : ExternalRepository) : any {
        return {
            id : repository.id,
            type : repository.type,
            name : repository.name,
            description : repository.description,
            publishDate : repository.publishDate,
            publisher : { userName : repository.publisherName },
            location : repository.location
        };
    }

    public updateRepository(repository : ExternalRepository) : Promise<boolean> {
        let url = ServersRoutes.UPDATE_EXTERNAL_REPOSITORY_ROUTE.replace("{repositoryId}", repository.id.toString());

        let data = this.clientRepositoryToServerRepository(repository);

        return this.httpService.put(url, data)
            .then((response) => {
                this.fireUpdateEvent(repository.id);
                return true;
            });
    }

    public deleteRepository(repositoryId : number) : Promise<boolean> {
        let url = ServersRoutes.DELETE_EXTERNAL_REPOSITORY_ROUTE.replace("{repositoryId}", repositoryId.toString());

        return this.httpService.delete(url)
            .then((response) => {
                this.fireDeleteEvent(repositoryId);
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


    fireCreateEvent(repositoryId: number) {
        this.repositoryCreateEvent.next(repositoryId);
    }

    fireUpdateEvent(repositoryId: number) {
        this.repositoryUpdateEvent.next(repositoryId);
    }

    fireDeleteEvent(repositoryId: number) {
        this.repositoryDeleteEvent.next(repositoryId);
    }

}
