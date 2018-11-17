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

        this.loading = true;

        this.userService.changeUserImage(this.user.userName, file)
        .then((response) => {
            this.loading = false;

            if(response)
                this.dialogManager.openSuccessDialog("Image uploaded successfully!", "");
            else
                this.dialogManager.openWarningDialog("Error uploading image!", "Image could not be uploaded try again later.");
        })
        .catch((error) => {
            this.loading = false;
            this.dialogManager.openErrorDialog("Error uploading image!", error);
            console.error(error);
        });
    }

    saveClick() {
        this.loading = true;

        this.userService.updateUser(this.user)
        .then(result => {
            this.loading = false;

            if(!result)
                this.dialogManager.openErrorDialog("User could not be saved!", "User could not be saved! Please try again latter.");
            else
                this.dialogManager.openSuccessDialog("Saved successfully", null);
        })
        .catch(error => {
            this.loading = false;
            this.dialogManager.openErrorDialog("Error saving user!", error);
            console.error(error);
        });
    }

}
