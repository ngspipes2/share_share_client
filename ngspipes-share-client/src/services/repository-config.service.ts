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
        this.configCreateEvent.subscribe(name => this.configEvent.next(name));
        this.configUpdateEvent.subscribe(name => this.configEvent.next(name));
        this.configDeleteEvent.subscribe(name => this.configEvent.next(name));
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

    public getConfig(name : string) : Promise<RepositoryConfig> {
        return this.getAllConfigs()
        .then(configs => configs.find(config => config.name === name));
    }

    public createConfig(config : RepositoryConfig) : Promise<boolean> {
        return this.getAllConfigs()
        .then(configs => {
            if(configs.find(c => c.name === config.name))
                throw "There is already an config with name:" + config.name;

            configs.push(config);

            let key = RepositoryConfigService.CONFIGS_KEY;
            let value = JSON.stringify(configs);

            return this.preferencesService.setPreference(key, value)
            .then((result) => {
                if(result)
                    this.fireCreateEvent(config.name);

                return result;
            });
        });
    }

    public updateConfig(config : RepositoryConfig) : Promise<boolean> {
        return this.getAllConfigs()
        .then(configs => {
            if(!configs.find(c => c.name === config.name))
                throw "There is no config with name:" + config.name;

            let storedConfig = configs.find(c => c.name === config.name);
            storedConfig.description = config.description;
            storedConfig.location = config.location;
            storedConfig.configs = config.configs;

            let key = RepositoryConfigService.CONFIGS_KEY;
            let value = JSON.stringify(configs);

            return this.preferencesService.setPreference(key, value)
            .then((result) => {
                if(result)
                    this.fireUpdateEvent(config.name);

                return result;
            });
        });
    }

    public deleteConfig(name : string) : Promise<boolean> {
        return this.getAllConfigs()
        .then(configs => {
            if(!configs.find(c => c.name === name))
                throw "There is no config with name:" + name;

            configs = configs.filter(config => config.name !== name);

            let key = RepositoryConfigService.CONFIGS_KEY;
            let value = JSON.stringify(configs);

            return this.preferencesService.setPreference(key, value)
            .then((result) => {
                if(result)
                    this.fireDeleteEvent(name);

                return result;
            });
        });
    }

    public getConfigsForLocation(location : string) : Promise<RepositoryConfig[]> {
        return this.getAllConfigs()
        .then(configs => configs.filter(config => config.location === location));
    }


    fireCreateEvent(name: string) {
        this.configCreateEvent.next(name);
    }

    fireUpdateEvent(name: string) {
        this.configUpdateEvent.next(name);
    }

    fireDeleteEvent(name: string) {
        this.configDeleteEvent.next(name);
    }

}
