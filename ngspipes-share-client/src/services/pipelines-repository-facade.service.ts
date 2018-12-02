import { Injectable }    from '@angular/core';

import { HttpService } from './http.service';
import { ServersRoutes } from './servers-routes';

import { RepositoryConfig, Config } from '../entities/repository-config';

@Injectable()
export class PipelinesRepositoryFacadeService {

    constructor(private httpService: HttpService) { }



    public getRepositoryImage(repositoryConfig : RepositoryConfig) : Promise<any> {
        let url = ServersRoutes.PIPELINES_FACADE_GET_LOGO_ROUTE;
        let data = {
            repositoryLocation : repositoryConfig.location,
            repositoryConfig : this.createConfig(repositoryConfig.configs)
        };

        return this.httpService.post(url, data)
        .then(response => {
            if(!response.text() || response.status===404)
                return null;

            return response.text();
        });
    }

    private createConfig(configs : Config[] ) : any {
        let config = {};

        configs.forEach(c => config[c.name] = c.value);

        return config;
    }


    public setRepositoryImage(repositoryConfig : RepositoryConfig, file : any) : Promise<boolean> {
        return this.readFile(file)
        .then(content => {
            let url = ServersRoutes.PIPELINES_FACADE_SET_LOGO_ROUTE;
            let data = {
                data : content,
                repositoryLocation : repositoryConfig.location,
                repositoryConfig : this.createConfig(repositoryConfig.configs)
            };

            return this.httpService.post(url, data)
            .then(response => {
                return response.status === 200;
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
