import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';

import { User } from '../../../../../entities/user';
import { UserService } from '../../../../../services/user.service';

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
    changingImage : boolean;
    saving : boolean;



    constructor(private dialogManager : DialogManager,
                private userService : UserService) { }



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

    changeImage(file : any) {
        if(!file)
            return;

        this.changingImage = true;

        this.userService.changeUserImage(this.user.userName, file)
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

        this.userService.updateUser(this.user)
        .then(result => {
            this.saving = false;

            if(!result)
                this.dialogManager.openErrorDialog("User could not be saved!", "User could not be saved! Please try again latter.");
            else
                this.dialogManager.openSuccessDialog("Saved successfully", null);
        })
        .catch(error => {
            this.saving = false;
            this.dialogManager.openErrorDialog("Error saving user!", error);
            console.error(error);
        });
    }

}
