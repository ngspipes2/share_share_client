import { Injectable }    from '@angular/core';
import { Subject } from 'rxjs';

import { HttpService } from './http.service';
import { ServersRoutes } from './servers-routes';
import { InternalRepository, InternalRepositoryType } from '../entities/internal-repository';

@Injectable()
export class InternalRepositoryService {

    repositoryEvent = new Subject<string>();
    repositoryCreateEvent = new Subject<string>();
    repositoryUpdateEvent = new Subject<string>();
    repositoryDeleteEvent = new Subject<string>();



    constructor(private httpService: HttpService) {
        this.repositoryCreateEvent.subscribe(repositoryName => this.repositoryEvent.next(repositoryName));
        this.repositoryUpdateEvent.subscribe(repositoryName => this.repositoryEvent.next(repositoryName));
        this.repositoryDeleteEvent.subscribe(repositoryName => this.repositoryEvent.next(repositoryName));
    }



    public getAllRepositories() : Promise<InternalRepository[]> {
        let url = ServersRoutes.GET_ALL_INTERNAL_REPOSITORIES_ROUTE;

        return this.httpService.get(url)
            .then(response => {
                if(!response.text())
                    return [];

                let data : any = response.json();

                return this.serverRepositoriesToClientRepositories(data);
            });
    }

    private serverRepositoriesToClientRepositories(repositories : any[]) : InternalRepository[] {
        return repositories.map(this.serverRepositoryToClienteRepository);
    }

    public getRepository(repositoryName : string) : Promise<InternalRepository> {
        let url = ServersRoutes.GET_INTERNAL_REPOSITORY_ROUTE.replace('{repositoryName}', repositoryName);

        return this.httpService.get(url)
            .then(response => {
                if(!response.text() || response.status===404)
                    return null;

                let data : any = response.json();

                return this.serverRepositoryToClienteRepository(data);
            });
    }

    private serverRepositoryToClienteRepository(repository : any) : InternalRepository {
        return new InternalRepository(
            repository.repositoryName,
            repository.type,
            repository.description,
            new Date(repository.creationDate),
            repository.isPublic,
            repository.owner.userName,
            repository.type === InternalRepositoryType.TOOLS ?
                (ServersRoutes.TOOLS_SERVER_URI + "/" + repository.repositoryName) : (ServersRoutes.PIPELINES_SERVER_URI + "/" + repository.repositoryName)
        );
    }

    public createRepository(repository : InternalRepository) : Promise<boolean> {
        let url = ServersRoutes.CREATE_INTERNAL_REPOSITORY_ROUTE;

        let data = this.clientRepositoryToServerRepository(repository);

        return this.httpService.post(url, data)
            .then((response) => {
                this.fireCreateEvent(repository.repositoryName);
                return true;
            });
    }

    private clientRepositoryToServerRepository(repository : InternalRepository) : any {
        return {
            repositoryName : repository.repositoryName,
            type : repository.type,
            description : repository.description,
            creationDate : repository.creationDate,
            isPublic : repository.isPublic,
            owner : { userName : repository.ownerName },
            location : repository.location
        };
    }

    public updateRepository(repository : InternalRepository) : Promise<boolean> {
        let url = ServersRoutes.UPDATE_INTERNAL_REPOSITORY_ROUTE.replace("{repositoryName}", repository.repositoryName);

        let data = this.clientRepositoryToServerRepository(repository);

        return this.httpService.put(url, data)
            .then((response) => {
                this.fireUpdateEvent(repository.repositoryName);
                return true;
            });
    }

    public deleteRepository(repositoryName : string) : Promise<boolean> {
        let url = ServersRoutes.DELETE_INTERNAL_REPOSITORY_ROUTE.replace("{repositoryName}", repositoryName);

        return this.httpService.delete(url)
            .then((response) => {
                this.fireDeleteEvent(repositoryName);
                return true;
            });
    }

    public getRepositoriesOfUser(userName : string) : Promise<InternalRepository[]> {
        let url = ServersRoutes.GET_ALL_INTERNAL_REPOSITORIES_ROUTE + "?userName=" + userName;

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
