import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Subject } from 'rxjs';

import { RepositoryConfig } from '../../../../entities/repository-config';
import { RepositoryConfigService } from '../../../../services/repository-config.service';

import { OperationsManager } from '../../../operations.manager';

@Component({
    selector: 'app-config-details',
    templateUrl: './config-details.component.html',
    styleUrls: ['./config-details.component.scss']
})
export class ConfigDetailsComponent implements OnInit, OnDestroy, OnChanges {

    @Input()
    configRepositoryName : string;

    configSubscription : any;

    config : RepositoryConfig;
    loadEvent : Subject<any> = new Subject();



    constructor(private repositoryConfigService : RepositoryConfigService,
                private operationsManager : OperationsManager) { }



    ngOnInit() {
        this.configSubscription = this.repositoryConfigService.configUpdateEvent.subscribe(() => {
            if(this.configRepositoryName)
                this.loadEvent.next();
        });

        if(this.configRepositoryName)
            setTimeout(() => this.loadEvent.next());
    }

    ngOnChanges() {
        if(this.configRepositoryName)
            this.loadEvent.next();
    }

    ngOnDestroy() {
        this.configSubscription.unsubscribe();
    }

    load() : Promise<any> {
        return this.operationsManager.getRepositoryConfig(this.configRepositoryName)
        .then(config => this.config = config);
    }

    saveClick() : Promise<any> {
        return this.operationsManager.saveRepositoryConfig(this.config);
    }

    deleteClick() : Promise<any> {
        return this.operationsManager.deleteRepositoryConfig(this.config);
    }

}
