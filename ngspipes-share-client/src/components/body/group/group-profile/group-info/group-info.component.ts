import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { Group } from '../../../../../entities/group';
import { GroupService } from '../../../../../services/group.service';
import { OperationsManager } from '../../../../operations.manager';

@Component({
    selector: 'app-group-info',
    templateUrl: './group-info.component.html',
    styleUrls: ['./group-info.component.scss']
})
export class GroupInfoComponent implements OnInit, OnDestroy, OnChanges {

    @Input()
    groupName : string;
    @Input()
    editable : boolean;

    groupSubscription : any;

    group : Group;
    loadEvent : Subject<any> = new Subject();



    constructor(private groupService : GroupService,
                private operationsManager : OperationsManager) { }



    ngOnInit() {
        this.groupSubscription = this.groupService.groupEvent.subscribe(() => this.loadEvent.next());
        setTimeout(() => this.loadEvent.next());
    }

    ngOnDestroy() {
        this.groupSubscription.unsubscribe();
    }

    ngOnChanges() {
        this.loadEvent.next();
    }

    load() : Promise<any> {
        return this.operationsManager.getGroup(this.groupName)
        .then(group => this.group = group);
    }

    changeImage(file : any) : Promise<any> {
        if(!file)
            return Promise.resolve(true);

        return this.operationsManager.changeGroupImage(this.group, file);
    }

    saveClick() : Promise<any> {
        return this.operationsManager.saveGroup(this.group);
    }

}
