import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { Repository, EntityType, LocationType } from '../../../../../entities/repository';
import { RepositoryService } from '../../../../../services/repository.service';
import { OperationsManager } from '../../../../operations.manager';

@Component({
    selector: 'app-repository-info',
    templateUrl: './repository-info.component.html',
    styleUrls: ['./repository-info.component.scss']
})
export class RepositoryInfoComponent {

    @Input()
    repositoryName : string;
    @Input()
    editable : boolean;

    repositorySubscription : any;

    repository : Repository;
    loadEvent : Subject<any> = new Subject();



    constructor(private repositoryService : RepositoryService,
                private operationsManager : OperationsManager) { }



    ngOnInit() {
        this.repositorySubscription = this.repositoryService.repositoryEvent.subscribe(() => this.loadEvent.next());
        setTimeout(() => this.loadEvent.next());
    }

    ngOnDestroy() {
        this.repositorySubscription.unsubscribe();
    }

    ngOnChanges() {
        this.loadEvent.next();
    }

    load() : Promise<any> {
        return this.operationsManager.getRepository(this.repositoryName)
        .then(repository => this.repository = repository);
    }

    changeImage(file : any) : Promise<any> {
        if(!file)
            return Promise.resolve(true);

        return this.operationsManager.changeRepositoryImage(this.repository, file);
    }

    saveClick() : Promise<any> {
        return this.operationsManager.saveRepository(this.repository);
    }

    getDateFieldLabel() {
        if(!this.repository || this.repository.locationType === LocationType.INTERNAL)
            return "Creation Date";

        return "Publication Date";
    }

    getOwnerFieldLabel() {
        if(!this.repository || this.repository.locationType === LocationType.INTERNAL)
            return "Owner";

        return "Publisher";
    }

    getType() {
        if(!this.repository)
            return "";

        if(this.repository.locationType === LocationType.EXTERNAL)
            return this.repository.entityType === EntityType.TOOLS ? "External Tools Repository" : "External Pipelines Repository";
        else
            return this.repository.entityType === EntityType.TOOLS ? "Internal Tools Repository" : "Internal Pipelines Repository";
    }

    showPublicFieldWarning() {
        return this.repository && this.repository.locationType === LocationType.EXTERNAL && this.editable;
    }

}
