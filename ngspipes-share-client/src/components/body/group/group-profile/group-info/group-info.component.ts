import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';

import { Group } from '../../../../../entities/group';
import { GroupService } from '../../../../../services/group.service';
import { OperationsManager } from '../../../../operations.manager';
import { DialogManager } from '../../../../dialog/dialog.manager';

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
    loading : boolean;



    constructor(private dialogManager : DialogManager,
                private groupService : GroupService,
                private operationsManager : OperationsManager) { }



    ngOnInit() {
        this.groupSubscription = this.groupService.groupEvent.subscribe(() => this.load());
        this.load();
    }

    ngOnDestroy() {
        this.groupSubscription.unsubscribe();
    }

    ngOnChanges() {
        this.load();
    }

    load() {
        this.loading = true;

        this.groupService.getGroup(this.groupName)
        .then(group => {
            this.loading = false;
            this.group = group;
        })
        .catch(error => {
            this.loading = false;
            this.dialogManager.openErrorDialog("Error getting group!", error);
            console.error(error);
        });
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
