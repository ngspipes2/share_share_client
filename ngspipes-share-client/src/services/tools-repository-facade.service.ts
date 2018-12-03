import { Injectable }    from '@angular/core';

import { HttpService } from './http.service';
import { ServersRoutes } from './servers-routes';

import { RepositoryConfig, Config } from '../entities/repository-config';
import { Repository } from '../entities/repository';
import { RepositoryService } from './repository.service';

@Injectable()
export class ToolsRepositoryFacadeService {

    constructor(private httpService: HttpService,
                private repositoryService : RepositoryService) { }



    public getRepositoryImage(repositoryConfig : RepositoryConfig) : Promise<any> {
        return this.getRepository(repositoryConfig.repositoryName)
        .then(repository => {
            let url = ServersRoutes.TOOLS_FACADE_GET_LOGO_ROUTE;
            let data = {
                repositoryLocation : repository.location,
                repositoryConfig : this.createServerConfig(repositoryConfig.configs)
            };

            return this.httpService.post(url, data)
            .then(response => {
                if(!response.text() || response.status===404)
                    return null;

                return response.text();
            });
        });
    }

    private getRepository(repositoryName : string) : Promise<Repository> {
        return this.repositoryService.getRepository(repositoryName)
        .then(repository => {
            if(!repository)
                throw "There is no Repository:" + repositoryName;

            return repository;
        });
    }

    private createServerConfig(configs : Config[] ) : any {
        let config = {};

        configs.forEach(c => config[c.name] = c.value);

        return config;
    }


    public setRepositoryImage(repositoryConfig : RepositoryConfig, file : any) : Promise<boolean> {
        return this.readFile(file)
        .then(content => {
            return this.getRepository(repositoryConfig.repositoryName)
            .then(repository => {
                let url = ServersRoutes.TOOLS_FACADE_SET_LOGO_ROUTE;
                let data = {
                    data : content,
                    repositoryLocation : repository.location,
                    repositoryConfig : this.createServerConfig(repositoryConfig.configs)
                };

                return this.httpService.post(url, data)
                .then(response => {
                    let success = response.status === 200;

                    if(success)
                        this.repositoryService.fireUpdateEvent(repositoryConfig.repositoryName);

                    return success;
                });
            });
        });
    }

    private readFile(file : any) : Promise<any> {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            fileReader.onload = e => {
                let arrayBuffer = fileReader.result;
                let array = new Uint8Array(arrayBuffer);
                resolve(Array.from(array));
            };
            fileReader.onerror = e => reject(e);
            fileReader.readAsArrayBuffer(file);
        });
    }

}
