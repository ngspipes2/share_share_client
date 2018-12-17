import { Injectable }    from '@angular/core';

import { HttpService } from './http.service';
import { ServersRoutes } from './servers-routes';
import { PipelineFormat, Pipeline } from '../entities/pipeline';
import { ToolFormat, Tool } from '../entities/tool';

@Injectable()
export class ImportExportService {

    constructor(private httpService: HttpService) { }



    public exportTool(tool : Tool, format : ToolFormat, outputName : string) : Promise<boolean> {
        let url = ServersRoutes.EXPORT_TOOLS_ROUTE + "?";
        url += "format=" + format;
        url += "&outputName=" + outputName;

        let data = [tool];

        return this.httpService.post(url, data)
        .then((response) => {
            return true;
        });
    }

    public exportTools(tools : Tool[], format : ToolFormat, outputName : string) : Promise<boolean> {
        let url = ServersRoutes.EXPORT_TOOLS_ROUTE + "?";
        url += "format=" + format;
        url += "&outputName=" + outputName;

        let data = tools;

        return this.httpService.post(url, data)
        .then((response) => {
            return true;
        });
    }

    public exportPipeline(pipeline : Pipeline, format : PipelineFormat, outputName : string) : Promise<boolean> {
        let url = ServersRoutes.EXPORT_PIPELINES_ROUTE + "?";
        url += "format=" + format;
        url += "&outputName=" + outputName;

        let data = [pipeline];

        return this.httpService.post(url, data)
        .then((response) => {
            return true;
        });
    }

    public exportPipelines(pipelines : Pipeline[], format : PipelineFormat, outputName : string) : Promise<boolean> {
        let url = ServersRoutes.EXPORT_PIPELINES_ROUTE + "?";
        url += "format=" + format;
        url += "&outputName=" + outputName;

        let data = pipelines;

        return this.httpService.post(url, data)
        .then((response) => {
            return true;
        });
    }


    public importTool(file : any) : Promise<Tool> {
        let url = ServersRoutes.IMPORT_TOOLS_ROUTE;

        return this.httpService.uploadFile(url, file)
        .then((tools) => {
            return tools[0];
        });
    }

    public importTools(file : any) : Promise<Tool[]> {
        let url = ServersRoutes.IMPORT_TOOLS_ROUTE;
        return this.httpService.uploadFile(url, file);
    }

    public importPipeline(file : any) : Promise<Pipeline> {
        let url = ServersRoutes.IMPORT_PIPELINES_ROUTE;

        return this.httpService.uploadFile(url, file)
        .then((pipelines) => {
            return pipelines[0];
        });
    }

    public importPipelines(file : any) : Promise<Pipeline[]> {
        let url = ServersRoutes.IMPORT_PIPELINES_ROUTE;
        return this.httpService.uploadFile(url, file);
    }

}
