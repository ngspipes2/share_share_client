import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Group } from '../../../entities/group';
import { SessionService } from '../../../services/session.service';
import { GroupService } from '../../../services/group.service';

import { DialogManager } from '../../dialog/dialog.manager';

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

    loginSubscription : any;
    logoutSubscription : any;
    paramsSubscription : any;
    groupCreateSubscription : any;
    groupDeleteSubscription : any;

    groupName : string;
    editable : boolean;
    loading : boolean;

    group : Group;



    constructor(private sessionService : SessionService,
                private activatedRoute : ActivatedRoute,
                private groupService : GroupService,
                private dialogManager : DialogManager,
                private router : Router) { }



    ngOnInit() {
        this.loginSubscription = this.sessionService.loginEvent.subscribe(() => {
            this.load();
        });

        this.logoutSubscription = this.sessionService.logoutEvent.subscribe(() => {
            this.load();
        });

        this.paramsSubscription = this.activatedRoute.params.subscribe(() => {
            if(this.groupName !== this.activatedRoute.snapshot.params.groupName) {
                this.groupName = this.activatedRoute.snapshot.params.groupName;
                this.load();
            }
        });

        this.groupCreateSubscription = this.groupService.groupCreateEvent.subscribe((groupName) => {
            if(this.groupName === groupName)
                this.load();
        });

        this.groupDeleteSubscription = this.groupService.groupDeleteEvent.subscribe((groupName) => {
            if(this.groupName === groupName)
                this.load();
        });
    }

    ngOnDestroy() {
        this.loginSubscription.unsubscribe();
        this.logoutSubscription.unsubscribe();
        this.paramsSubscription.unsubscribe();
        this.groupCreateSubscription.unsubscribe();
        this.groupDeleteSubscription.unsubscribe();
    }

    load() {
        this.loading = true;

        this.loadGroup()
        .then(() => {
            this.loading = false;
            this.checkEditable();
        })
        .catch(() => {
            this.loading = false;
        });
    }

    loadGroup() : Promise<Group> {
        return this.groupService.getGroup(this.groupName)
        .then(group => {
            this.group = group;

            if(!group)
                this.dialogManager.openWarningDialog("There is no Group " + this.groupName, null);

            return group;
        })
        .catch(error => {
            this.dialogManager.openErrorDialog("Error getting Group!", error);
            console.error(error);
            throw error;
        });
    }

    checkEditable() {
        let currentUserName = this.sessionService.getCurrentCredentials()[0];
        this.editable = this.group.ownerName === currentUserName;
    }

}
