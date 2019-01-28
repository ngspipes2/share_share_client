import { Injectable }    from '@angular/core';
import { Subject } from 'rxjs';

import { HttpService } from './http.service';
import { ServersRoutes } from './servers-routes';

import {
    Pipeline,
    Output,
    Parameter,
    RepositoryType,
    ValueType, Value, ParameterValue, SimpleValue,
    Step,
    ExecType, Exec,
    CommandExec, PipelineExec,
    InputType, Input, ChainInput, ParameterInput, SimpleInput,
    Spread, StrategyType, Strategy, InputStrategy, OneToOneStratey, OneToManyStrategy
} from '../entities/pipeline';
import { RepositoryConfig, Config } from '../entities/repository-config';
import { Repository } from '../entities/repository';
import { RepositoryService } from './repository.service';
import { CacheService } from './cache.service';

@Injectable()
export class PipelinesRepositoryFacadeService {

    pipelineEvent = new Subject<string[]>();
    pipelineCreateEvent = new Subject<string[]>();
    pipelineUpdateEvent = new Subject<string[]>();
    pipelineDeleteEvent = new Subject<string[]>();



    constructor(private httpService: HttpService,
                private repositoryService : RepositoryService,
                private cacheService : CacheService) {
        this.pipelineCreateEvent.subscribe(id => this.pipelineEvent.next(id));
        this.pipelineUpdateEvent.subscribe(id => this.pipelineEvent.next(id));
        this.pipelineDeleteEvent.subscribe(id => this.pipelineEvent.next(id));
    }



    public getRepositoryImage(repositoryConfig : RepositoryConfig) : Promise<any> {
        if(this.cacheService.get("PIPELINES_REPOSITORY_" + repositoryConfig.repositoryName) !== undefined)
            return Promise.resolve(this.cacheService.get("PIPELINES_REPOSITORY_" + repositoryConfig.repositoryName));

        let url = ServersRoutes.PIPELINES_FACADE_GET_LOGO_ROUTE;
        return this.execute(repositoryConfig, url, null)
        .then(response => {
            if(!response.text() || response.status===404)
                return null;

            this.cacheService.put("PIPELINES_REPOSITORY_" + repositoryConfig.repositoryName, response.text());

            return response.text();
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

    private execute(repositoryConfig : RepositoryConfig, url : string, dataContent : any) : Promise<any> {
        return this.getRepository(repositoryConfig.repositoryName)
        .then(repository => {
            let data = {
                data: dataContent,
                repositoryLocation : repository.location,
                repositoryConfig : this.createServerConfig(repositoryConfig.configs)
            };

            return this.httpService.post(url, data);
        });
    }


    public setRepositoryImage(repositoryConfig : RepositoryConfig, file : any) : Promise<boolean> {
        return this.readFile(file)
        .then(content => {
            let url = ServersRoutes.PIPELINES_FACADE_SET_LOGO_ROUTE;
            return this.execute(repositoryConfig, url, content)
            .then(response => {
                this.cacheService.remove("PIPELINES_REPOSITORY_" + repositoryConfig.repositoryName);

                let success = response.status === 200;

                if(success)
                    this.repositoryService.fireUpdateEvent(repositoryConfig.repositoryName);

                return success;
            });;
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


    public getPipelinesNames(repositoryConfig : RepositoryConfig) : Promise<string[]> {
        let url = ServersRoutes.PIPELINES_FACADE_GET_PIPELINES_NAMES_ROUTE;
        return this.execute(repositoryConfig, url, null)
        .then(response => {
            if(!response.text())
                return [];

            let data : any = response.json();

            return data;
        });
    }


    public getPipelines(repositoryConfig : RepositoryConfig) : Promise<Pipeline[]> {
        let url = ServersRoutes.PIPELINES_FACADE_GET_ALL_PIPELINES_ROUTE;
        return this.execute(repositoryConfig, url, null)
        .then(response => {
            if(!response.text())
                return [];

            let data : any = response.json();

            return this.serverPipelinesToClientPipelines(data);
        });
    }

    private serverPipelinesToClientPipelines(pipelines : any[]) : Pipeline[] {
        return pipelines.map(this.serverPipelineToClientPipeline.bind(this));
    }

    private serverPipelineToClientPipeline(pipeline : any) : Pipeline {
        return pipeline;
    }


    public getPipeline(repositoryConfig : RepositoryConfig, pipelineName : string) : Promise<Pipeline> {
        let url = ServersRoutes.PIPELINES_FACADE_GET_PIPELINE_ROUTE.replace("{pipelineName}", pipelineName);
        return this.execute(repositoryConfig, url, null)
        .then(response => {
            if(!response.text() || response.status===404)
                return null;

            let data : any = response.json();

            return this.serverPipelineToClientPipeline(data);
        });
    }


    public createPipeline(repositoryConfig : RepositoryConfig, pipeline : Pipeline) : Promise<string> {
        let url = ServersRoutes.PIPELINES_FACADE_INSERT_PIPELINE_ROUTE;
        let data = this.clientPipelineToServerPipeline(pipeline);
        return this.execute(repositoryConfig, url, data)
        .then(response => {
            this.fireCreateEvent([repositoryConfig.repositoryName, pipeline.name]);
            return pipeline.name;
        });
    }

    private clientPipelinesToServerPipelines(pipelines : Pipeline[]) : any[] {
        return pipelines.map(this.clientPipelineToServerPipeline.bind(this));
    }

    private clientPipelineToServerPipeline(pipeline : Pipeline) : any {
        return pipeline;
    }


    public updatePipeline(repositoryConfig : RepositoryConfig, pipeline : Pipeline) : Promise<boolean> {
        let url = ServersRoutes.PIPELINES_FACADE_UPDATE_PIPELINE_ROUTE.replace("{pipelineName}", pipeline.name);
        let data = this.clientPipelineToServerPipeline(pipeline);
        return this.execute(repositoryConfig, url, data)
        .then(response => {
            this.fireUpdateEvent([repositoryConfig.repositoryName, pipeline.name]);
            return true;
        });
    }


    public deletePipeline(repositoryConfig : RepositoryConfig, pipelineName : string) : Promise<boolean> {
        let url = ServersRoutes.PIPELINES_FACADE_DELETE_PIPELINE_ROUTE.replace("{pipelineName}", pipelineName);
        return this.execute(repositoryConfig, url, null)
        .then(response => {
            this.fireDeleteEvent([repositoryConfig.repositoryName, pipelineName]);
            return true;
        });
    }


    fireCreateEvent(id: string[]) {
        this.pipelineCreateEvent.next(id);
    }

    fireUpdateEvent(id: string[]) {
        this.pipelineUpdateEvent.next(id);
    }

    fireDeleteEvent(id: string[]) {
        this.pipelineDeleteEvent.next(id);
    }

}
