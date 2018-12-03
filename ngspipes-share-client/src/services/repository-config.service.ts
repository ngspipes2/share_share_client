import { Injectable }    from '@angular/core';
import { Subject } from 'rxjs';

import { RepositoryConfig } from '../entities/repository-config';
import { PreferencesService } from './preferences.service';

@Injectable()
export class RepositoryConfigService {

    private static CONFIGS_KEY : string = "RepositoriesConfig";



    configEvent = new Subject<string>();
    configCreateEvent = new Subject<string>();
    configUpdateEvent = new Subject<string>();
    configDeleteEvent = new Subject<string>();



    constructor(private preferencesService : PreferencesService) {
        this.configCreateEvent.subscribe(repositoryName => this.configEvent.next(repositoryName));
        this.configUpdateEvent.subscribe(repositoryName => this.configEvent.next(repositoryName));
        this.configDeleteEvent.subscribe(repositoryName => this.configEvent.next(repositoryName));
    }



    public getAllConfigs() : Promise<RepositoryConfig[]> {
        let key = RepositoryConfigService.CONFIGS_KEY;
        let defaultValue = undefined;
        return this.preferencesService.getPreference(key, defaultValue)
        .then(this.parseConfigs);
    }

    private parseConfigs(configsStr : string) : RepositoryConfig[] {
        if(!configsStr)
            return [];

        return JSON.parse(configsStr);
    }

    public getConfig(repositoryName : string) : Promise<RepositoryConfig> {
        return this.getAllConfigs()
        .then(configs => configs.find(config => config.repositoryName === repositoryName));
    }

    public createConfig(config : RepositoryConfig) : Promise<boolean> {
        return this.getAllConfigs()
        .then(configs => {
            if(configs.find(c => c.repositoryName === config.repositoryName))
                throw "There is already an config for Repository:" + config.repositoryName;

            configs.push(config);

            let key = RepositoryConfigService.CONFIGS_KEY;
            let value = JSON.stringify(configs);

            return this.preferencesService.setPreference(key, value)
            .then((result) => {
                if(result)
                    this.fireCreateEvent(config.repositoryName);

                return result;
            });
        });
    }

    public updateConfig(config : RepositoryConfig) : Promise<boolean> {
        return this.getAllConfigs()
        .then(configs => {
            if(!configs.find(c => c.repositoryName === config.repositoryName))
                throw "There is no config for Repository:" + config.repositoryName;

            let storedConfig = configs.find(c => c.repositoryName === config.repositoryName);
            storedConfig.description = config.description;
            storedConfig.configs = config.configs;

            let key = RepositoryConfigService.CONFIGS_KEY;
            let value = JSON.stringify(configs);

            return this.preferencesService.setPreference(key, value)
            .then((result) => {
                if(result)
                    this.fireUpdateEvent(config.repositoryName);

                return result;
            });
        });
    }

    public deleteConfig(repositoryName : string) : Promise<boolean> {
        return this.getAllConfigs()
        .then(configs => {
            if(!configs.find(c => c.repositoryName === repositoryName))
                throw "There is no config for Repository:" + repositoryName;

            configs = configs.filter(config => config.repositoryName !== repositoryName);

            let key = RepositoryConfigService.CONFIGS_KEY;
            let value = JSON.stringify(configs);

            return this.preferencesService.setPreference(key, value)
            .then((result) => {
                if(result)
                    this.fireDeleteEvent(repositoryName);

                return result;
            });
        });
    }


    fireCreateEvent(repositoryName: string) {
        this.configCreateEvent.next(repositoryName);
    }

    fireUpdateEvent(repositoryName: string) {
        this.configUpdateEvent.next(repositoryName);
    }

    fireDeleteEvent(repositoryName: string) {
        this.configDeleteEvent.next(repositoryName);
    }

}
