import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Group } from '../../logic/domain/group';
import { UserService } from '../../logic/services/user.service';
import { GroupService } from '../../logic/services/group.service';
import { SessionService } from '../../logic/services/session.service';
import { DialogService } from '../dialog/dialog.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit, OnDestroy {

    paramsSubscription : any;
    loginSubscription : any;
    logoutSubscription : any;
    groupSubscription : any;

    groupName : string;
    editable : boolean;
    loadingGroup : boolean;

    group : Group;



    constructor(private groupService : GroupService,
                private sessionService : SessionService,
                private activatedRoute : ActivatedRoute,
                private router : Router,
                private dialogService : DialogService) { }



    ngOnInit() {
        this.paramsSubscription = this.activatedRoute.params.subscribe(() => {
            this.groupName = this.activatedRoute.snapshot.params.groupName;
            this.load();
        });

        this.loginSubscription = this.sessionService.loginEvent.subscribe((credentails) => {
            this.checkEditable();
        });

        this.logoutSubscription = this.sessionService.logoutEvent.subscribe(() => {
            this.checkEditable();
        });

        this.groupSubscription = this.groupService.groupEvent.subscribe((groupName) => {
            if(this.groupName === groupName)
                this.loadGroup();
        });

        this.groupName = this.activatedRoute.snapshot.params.groupName;
        this.load();
    }

    ngOnDestroy() {
        this.paramsSubscription.unsubscribe();

        this.loginSubscription.unsubscribe();
        this.logoutSubscription.unsubscribe();

        this.groupSubscription.unsubscribe();
    }

    load() {
        this.checkEditable();
        this.loadGroup();
    }

    checkEditable() {
        let credentials = this.sessionService.getCurrentCredentials();
        this.editable = credentials && this.group && credentials[0] === this.group.ownerName;
    }

    loadGroup() {
        this.loadingGroup = true;

        this.groupService.getGroup(this.groupName)
        .then((group) => {
            this.loadingGroup = false;

            this.group = group;

            if(!group)
                this.dialogService.openWarningDialog("Non existent group", "There is no group with groupName: " + this.groupName);

            this.checkEditable();
          })
          .catch((error) => {
            this.loadingGroup = false;

            this.dialogService.openErrorDialog("Error", "Error getting Group with groupName: " + this.groupName);
            console.error(error);
        });
    }

    addMemberClick() {
        this.dialogService.openSelectUserDialog().afterClosed().subscribe((userName) => {
            if(!userName)
                return;

            this.loadingGroup = true;

            this.group.members.push(userName);

            this.groupService.updateGroup(this.group)
            .then((result) => {
                this.loadingGroup = false;

                if(result) {
                    this.dialogService.openSuccessDialog("Success", "Member added successfuly!");
                } else {
                    this.group.members = this.group.members.filter(name => name !== userName);
                    this.dialogService.openWarningDialog("Error", "Member could not be added! Try again later!");
                }
            })
            .catch((error) => {
                this.loadingGroup = false;

                this.group.members = this.group.members.filter(name => name !== userName);
                this.dialogService.openErrorDialog("Error adding member", error);
                console.error(error);
            });
        });
    }

}
