import { Injectable }    from '@angular/core';
import { Subject } from 'rxjs';

import { HttpService } from './http.service';
import { ServersRoutes } from './servers-routes';
import { InternalRepository, InternalRepositoryType } from '../entities/internal-repository';

@Injectable()
export class InternalRepositoryService {

    repositoryEvent = new Subject<number>();
    repositoryCreateEvent = new Subject<number>();
    repositoryUpdateEvent = new Subject<number>();
    repositoryDeleteEvent = new Subject<number>();



    constructor(private httpService: HttpService) {
        this.repositoryCreateEvent.subscribe(repositoryId => this.repositoryEvent.next(repositoryId));
        this.repositoryUpdateEvent.subscribe(repositoryId => this.repositoryEvent.next(repositoryId));
        this.repositoryDeleteEvent.subscribe(repositoryId => this.repositoryEvent.next(repositoryId));
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

    public getRepository(repositoryId : number) : Promise<InternalRepository> {
        let url = ServersRoutes.GET_INTERNAL_REPOSITORY_ROUTE.replace('{repositoryId}', repositoryId.toString());

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
            repository.id,
            repository.type,
            repository.name,
            repository.description,
            new Date(repository.creationDate),
            repository.isPublic,
            repository.owner.userName,
            repository.type === InternalRepositoryType.TOOLS ?
                (ServersRoutes.TOOLS_SERVER_URI + "/" + repository.id) : (ServersRoutes.PIPELINES_SERVER_URI + "/" + repository.id)
        );
    }

    public createRepository(repository : InternalRepository) : Promise<number> {
        let url = ServersRoutes.CREATE_INTERNAL_REPOSITORY_ROUTE;

        let data = this.clientRepositoryToServerRepository(repository);

        return this.httpService.post(url, data)
            .then((response) => {
                repository.id = Number(response.text());
                this.fireCreateEvent(repository.id);
                return repository.id;
            });
    }

    private clientRepositoryToServerRepository(repository : InternalRepository) : any {
        return {
            id : repository.id,
            type : repository.type,
            name : repository.name,
            description : repository.description,
            creationDate : repository.creationDate,
            isPublic : repository.isPublic,
            owner : { userName : repository.ownerName },
            location : repository.location
        };
    }

    public updateRepository(repository : InternalRepository) : Promise<boolean> {
        let url = ServersRoutes.UPDATE_INTERNAL_REPOSITORY_ROUTE.replace("{repositoryId}", repository.id.toString());

        let data = this.clientRepositoryToServerRepository(repository);

        return this.httpService.put(url, data)
            .then((response) => {
                this.fireUpdateEvent(repository.id);
                return true;
            });
    }

    public deleteRepository(repositoryId : number) : Promise<boolean> {
        let url = ServersRoutes.DELETE_INTERNAL_REPOSITORY_ROUTE.replace("{repositoryId}", repositoryId.toString());

        return this.httpService.delete(url)
            .then((response) => {
                this.fireDeleteEvent(repositoryId);
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
