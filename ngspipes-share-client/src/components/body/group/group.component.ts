import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

    groupName : string;
    editable : boolean;
    loading = true;



    constructor(private sessionService : SessionService,
                private activatedRoute : ActivatedRoute,
                private groupService : GroupService,
                private dialogManager : DialogManager,
                private router : Router) { }



    ngOnInit() {
        this.loginSubscription = this.sessionService.loginEvent.subscribe(() => {
                this.checkEditable();
        });

        this.logoutSubscription = this.sessionService.logoutEvent.subscribe(() => {
                this.checkEditable();
        });

        this.paramsSubscription = this.activatedRoute.params.subscribe(() => {
            this.groupName = this.activatedRoute.snapshot.params.groupName;
            this.checkEditable();
        });

        this.checkEditable();
    }

    ngOnDestroy() {
        this.loginSubscription.unsubscribe();
        this.logoutSubscription.unsubscribe();
        this.paramsSubscription.unsubscribe();
    }

    checkEditable() {
        this.loading = true;

        this.groupService.getGroup(this.groupName)
        .then(group => {
            this.loading = false;
            let currentUserName = this.sessionService.getCurrentCredentials()[0];
            this.editable = group.ownerName === currentUserName;
        })
        .catch(error => {
            this.loading = false;
            this.dialogManager.openErrorDialog("Error getting user!", error);
            console.error(error);
        });
    }
}
