import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';

import { User } from '../../../../../entities/user';
import { UserService } from '../../../../../services/user.service';
import { OperationsManager } from '../../../../operations.manager';
import { DialogManager } from '../../../../dialog/dialog.manager';

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnDestroy, OnChanges {

    @Input()
    userName : string;
    @Input()
    editable : boolean;

    userSubscription : any;

    user : User;
    loading : boolean;



    constructor(private dialogManager : DialogManager,
                private userService : UserService,
                private operationsManager : OperationsManager) { }



    ngOnInit() {
        this.userSubscription = this.userService.userEvent.subscribe(() => this.load());
        this.load();
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }

    ngOnChanges() {
        this.load();
    }

    load() {
        this.loading = true;

        this.userService.getUser(this.userName)
        .then(user => {
            this.loading = false;
            this.user = user;
        })
        .catch(error => {
            this.loading = false;
            this.dialogManager.openErrorDialog("Error getting user!", error);
            console.error(error);
        });
    }

    changeImage(file : any) : Promise<any> {
        if(!file)
            return Promise.resolve(true);

        return this.operationsManager.changeUserImage(this.user, file);
    }

    saveClick() : Promise<any> {
        return this.operationsManager.saveUser(this.user);
    }

}
