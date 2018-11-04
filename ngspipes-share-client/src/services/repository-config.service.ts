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
        this.configCreateEvent.subscribe(location => this.configEvent.next(location));
        this.configUpdateEvent.subscribe(location => this.configEvent.next(location));
        this.configDeleteEvent.subscribe(location => this.configEvent.next(location));
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

    public getConfig(location : string) : Promise<RepositoryConfig> {
        return this.getAllConfigs()
        .then(configs => configs.find(config => config.location === location));
    }

    public createConfig(config : RepositoryConfig) : Promise<boolean> {
        return this.getAllConfigs()
        .then(configs => {
            if(configs.find(c => c.location === config.location))
                throw "There is already an config for location:" + config.location;

            configs.push(config);

            let key = RepositoryConfigService.CONFIGS_KEY;
            let value = JSON.stringify(configs);
            return this.preferencesService.setPreference(key, value);
        });
    }

    public updateConfig(config : RepositoryConfig) : Promise<boolean> {
        return this.getAllConfigs()
        .then(configs => {
            if(!configs.find(c => c.location === config.location))
                throw "There is no config for location:" + config.location;

            let storedConfig = configs.find(c => c.location === config.location);
            storedConfig.config = config.config;

            let key = RepositoryConfigService.CONFIGS_KEY;
            let value = JSON.stringify(configs);
            return this.preferencesService.setPreference(key, value);
        });
    }

    public deleteConfig(location : string) : Promise<boolean> {
        return this.getAllConfigs()
        .then(configs => {
            if(!configs.find(c => c.location === location))
                throw "There is no config for location:" + location;

            configs = configs.filter(config => config.location !== location);

            let key = RepositoryConfigService.CONFIGS_KEY;
            let value = JSON.stringify(configs);
            return this.preferencesService.setPreference(key, value);
        });
    }


    fireCreateEvent(location: string) {
        this.configCreateEvent.next(location);
    }

    fireUpdateEvent(location: string) {
        this.configUpdateEvent.next(location);
    }

    fireDeleteEvent(location: string) {
        this.configDeleteEvent.next(location);
    }

}
