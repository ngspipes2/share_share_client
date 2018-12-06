import { Injectable }    from '@angular/core';
import { Subject } from 'rxjs';

import { HttpService } from './http.service';
import { ServersRoutes } from './servers-routes';

import { Tool, Command, Parameter, Output, ExecutionContext } from '../entities/tool';
import { RepositoryConfig, Config } from '../entities/repository-config';
import { Repository } from '../entities/repository';
import { RepositoryService } from './repository.service';
@Injectable()
export class ToolsRepositoryFacadeService {

    toolEvent = new Subject<string[]>();
    toolCreateEvent = new Subject<string[]>();
    toolUpdateEvent = new Subject<string[]>();
    toolDeleteEvent = new Subject<string[]>();



    constructor(private httpService: HttpService,
                private repositoryService : RepositoryService) {
        this.toolCreateEvent.subscribe(id => this.toolEvent.next(id));
        this.toolUpdateEvent.subscribe(id => this.toolEvent.next(id));
        this.toolDeleteEvent.subscribe(id => this.toolEvent.next(id));
    }



    public getRepositoryImage(repositoryConfig : RepositoryConfig) : Promise<any> {
        let url = ServersRoutes.TOOLS_FACADE_GET_LOGO_ROUTE;
        return this.execute(repositoryConfig, url, null)
        .then(response => {
            if(!response.text() || response.status===404)
                return null;

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
            let url = ServersRoutes.TOOLS_FACADE_SET_LOGO_ROUTE;
            return this.execute(repositoryConfig, url, content)
            .then(response => {
                let success = response.status === 200;

                if(success)
                    this.repositoryService.fireUpdateEvent(repositoryConfig.repositoryName);

                return success;
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


    public getToolsNames(repositoryConfig : RepositoryConfig) : Promise<string[]> {
        let url = ServersRoutes.TOOLS_FACADE_GET_TOOLS_NAMES_ROUTE;
        return this.execute(repositoryConfig, url, null)
        .then(response => {
            if(!response.text())
                return [];

            let data : any = response.json();

            return data;
        });
    }


    public getTools(repositoryConfig : RepositoryConfig) : Promise<Tool[]> {
        let url = ServersRoutes.TOOLS_FACADE_GET_ALL_TOOLS_ROUTE;
        return this.execute(repositoryConfig, url, null)
        .then(response => {
            if(!response.text())
                return [];

            let data : any = response.json();

            return this.serverToolsToClientTools(data);
        });
    }

    private serverToolsToClientTools(tools : any[]) : Tool[] {
        return tools.map(this.serverToolToClientTool.bind(this));
    }

    private serverToolToClientTool(tool: any) : Tool {
        return new Tool(
            tool.name,
            tool.author,
            tool.description,
            tool.version,
            tool.documentation,
            this.serverCommandsToClientCommands(tool.commands),
            this.serverExecutionContextsToClientExecutionContexts(tool.executionContexts),
            tool.logo
        );
    }

    private serverCommandsToClientCommands(commands : any[]) : Command[] {
        return commands.map(this.serverCommandToClientCommand.bind(this));
    }

    private serverCommandToClientCommand(command : any) : Command {
        return new Command(
            command.name,
            command.description,
            command.recommendedMemory,
            command.recommendedDisk,
            command.recommendedCpu,
            this.serverParametersToClientParameters(command.parameters),
            this.serverOutputsToClientOutputs(command.outputs),
            command.command
        );
    }

    private serverParametersToClientParameters(parameters : any[]) : Parameter[] {
        return parameters.map(this.serverParameterToClientParameter.bind(this));
    }

    private serverParameterToClientParameter(parameter : any) : Parameter {
        return new Parameter(
            parameter.name,
            parameter.description,
            parameter.values,
            parameter.type,
            parameter.required,
            parameter.prefix,
            parameter.suffix,
            parameter.separator,
            parameter.depends,
            parameter.dependentValues,
            parameter.subParameters ? this.serverParametersToClientParameters(parameter.subParameters) : []
        );
    }

    private serverOutputsToClientOutputs(outputs : any[]) : Output[] {
        return outputs.map(this.serverOutputToClientOutput.bind(this));
    }

    private serverOutputToClientOutput(output : any) : Output {
        return new Output(
            output.type,
            output.name,
            output.description,
            output.value
        );
    }

    private serverExecutionContextsToClientExecutionContexts(contexts : any[]) : ExecutionContext[] {
        return contexts.map(this.serverExecutionContextToClientExecutionContext.bind(this));
    }

    private serverExecutionContextToClientExecutionContext(context : any) : ExecutionContext {
        return new ExecutionContext(
            context.name,
            context.context,
            context.config
        );
    }


    public getTool(repositoryConfig : RepositoryConfig, toolName : string) : Promise<Tool> {
        let url = ServersRoutes.TOOLS_FACADE_GET_TOOL_ROUTE.replace("{toolName}", toolName);
        return this.execute(repositoryConfig, url, null)
        .then(response => {
            if(!response.text() || response.status===404)
                return null;

            let data : any = response.json();

            return this.serverToolToClientTool(data);
        });
    }


    public createTool(repositoryConfig : RepositoryConfig, tool : Tool) : Promise<string> {
        let url = ServersRoutes.TOOLS_FACADE_INSERT_TOOL_ROUTE;
        let data = this.clientToolToServerTool(tool);
        return this.execute(repositoryConfig, url, data)
        .then(response => {
            this.fireCreateEvent([repositoryConfig.repositoryName, tool.name]);
            return tool.name;
        });
    }

    private clientToolsToServerTools(tools : Tool[]) : any[] {
        return tools.map(this.clientToolToServerTool.bind(this));
    }

    private clientToolToServerTool(tool: Tool) : any {
        return {
            name: tool.name,
            author: tool.author,
            description: tool.description,
            version: tool.version,
            documentation: tool.documentation,
            commands: this.clientCommandsToServerCommands(tool.commands),
            executionContexts: this.clientExecutionContextsToServerExecutionContexts(tool.executionContexts),
            logo: tool.logo
        };
    }

    private clientCommandsToServerCommands(commands : Command[]) : any[] {
        return commands.map(this.clientCommandToServerCommand.bind(this));
    }

    private clientCommandToServerCommand(command : Command) : any {
        return {
            name: command.name,
            description: command.description,
            recommendedMemory: command.recommendedMemory,
            recommendedDisk: command.recommendedDisk,
            recommendedCpu: command.recommendedCpu,
            parameters: this.clientParametersToServerParameters(command.parameters),
            outputs: this.clientOutputsToServerOutputs(command.outputs),
            command: command.command
        };
    }

    private clientParametersToServerParameters(parameters : Parameter[]) : any[] {
        return parameters.map(this.clientParameterToServerParameter.bind(this));
    }

    private clientParameterToServerParameter(parameter : Parameter) : any {
        return {
            name: parameter.name,
            description: parameter.description,
            values: parameter.values,
            type: parameter.type,
            required: parameter.required,
            prefix: parameter.prefix,
            suffix: parameter.suffix,
            separator: parameter.separator,
            depends: parameter.depends,
            dependentValues: parameter.dependentValues,
            subParameters: this.clientParametersToServerParameters(parameter.subParameters)
        };
    }

    private clientOutputsToServerOutputs(outputs : Output[]) : any[] {
        return outputs.map(this.clientOutputToServerOutput.bind(this));
    }

    private clientOutputToServerOutput(output : Output) : any {
        return {
            type: output.type,
            name: output.name,
            description: output.description,
            value: output.value
        };
    }

    private clientExecutionContextsToServerExecutionContexts(contexts : ExecutionContext[]) : any[] {
        return contexts.map(this.clientExecutionContextToServerExecutionContext.bind(this));
    }

    private clientExecutionContextToServerExecutionContext(context : ExecutionContext) : any {
        return {
            name: context.name,
            context: context.context,
            config: context.config
        };
    }


    public updateTool(repositoryConfig : RepositoryConfig, tool : Tool) : Promise<boolean> {
        let url = ServersRoutes.TOOLS_FACADE_UPDATE_TOOL_ROUTE.replace("{toolName}", tool.name);
        let data = this.clientToolToServerTool(tool);
        return this.execute(repositoryConfig, url, data)
        .then(response => {
            this.fireUpdateEvent([repositoryConfig.repositoryName, tool.name]);
            return true;
        });
    }


    public deleteTool(repositoryConfig : RepositoryConfig, toolName : string) : Promise<boolean> {
        let url = ServersRoutes.TOOLS_FACADE_DELETE_TOOL_ROUTE.replace("{toolName}", toolName);
        return this.execute(repositoryConfig, url, null)
        .then(response => {
            this.fireDeleteEvent([repositoryConfig.repositoryName, toolName]);
            return true;
        });
    }


    fireCreateEvent(id: string[]) {
        this.toolCreateEvent.next(id);
    }

    fireUpdateEvent(id: string[]) {
        this.toolUpdateEvent.next(id);
    }

    fireDeleteEvent(id: string[]) {
        this.toolDeleteEvent.next(id);
    }

}
