import { Injectable }    from '@angular/core';

import { HttpService } from './http.service';
import { ServersRoutes } from './servers-routes';
import { PipelineFormat } from '../entities/pipeline';
import { ToolFormat } from '../entities/tool';


export enum ArtefactType {
    FILE = "FILE",
    FOLDER = "FOLDER"
}

export class ImportExportToolFormat {
    constructor(public format : ToolFormat, public type : ArtefactType) { }
}

export class ImportExportPipelineFormat {
    constructor(public format : PipelineFormat, public type : ArtefactType) { }
}

@Injectable()
export class ImportExportService {

    constructor(private httpService: HttpService) { }

}
