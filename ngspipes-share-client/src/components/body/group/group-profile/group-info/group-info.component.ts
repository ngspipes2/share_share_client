import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';

import { Group } from '../../../../../entities/group';
import { GroupService } from '../../../../../services/group.service';

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
    saving : boolean;
    changingImage : boolean;



    constructor(private dialogManager : DialogManager,
                private groupService : GroupService) { }



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

    dateToString(date : Date) : string {
        let day = date.getDate() > 10 ? date.getDate().toString() : '0'+date.getDate().toString();
        let month = (date.getMonth()+1) > 10 ? (date.getMonth()+1).toString() : '0'+(date.getMonth()+1).toString();;
        let year = date.getFullYear();
        let hour = date.getHours() > 10 ? date.getHours().toString() : '0'+date.getHours().toString();
        let minutes = date.getMinutes() > 10 ? date.getMinutes().toString() : '0'+date.getMinutes().toString();

        return day + "-" + month + "-" + year + " " + hour + ":" + minutes;
    }

    changeImage(file : any) {
        if(!file)
            return;

        this.changingImage = true;

        this.groupService.changeGroupImage(this.group.groupName, file)
        .then((response) => {
            this.changingImage = false;

            if(response)
                this.dialogManager.openSuccessDialog("Image uploaded successfully!", "");
            else
                this.dialogManager.openWarningDialog("Error uploading image!", "Image could not be uploaded try again later.");
        })
        .catch((error) => {
            this.changingImage = false;
            this.dialogManager.openErrorDialog("Error uploading image!", error);
            console.error(error);
        });
    }

    saveClick() {
        this.saving = true;

        this.groupService.updateGroup(this.group)
        .then(result => {
            this.saving = false;

            if(!result)
                this.dialogManager.openErrorDialog("Group could not be saved!", "Group could not be saved! Please try again latter.");
            else
                this.dialogManager.openSuccessDialog("Saved successfully", null);
        })
        .catch(error => {
            this.saving = false;
            this.dialogManager.openErrorDialog("Error saving group!", error);
            console.error(error);
        });
    }

}
