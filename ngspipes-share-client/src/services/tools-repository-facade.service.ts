import { Injectable }    from '@angular/core';

import { HttpService } from './http.service';
import { ServersRoutes } from './servers-routes';

import { RepositoryConfig, Config } from '../entities/repository-config';

@Injectable()
export class ToolsRepositoryFacadeService {

    constructor(private httpService: HttpService) { }



    public getRepositoryImage(repositoryConfig : RepositoryConfig) : Promise<any> {
        let url = ServersRoutes.TOOLS_FACADE_GET_LOGO_ROUTE;
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

}
