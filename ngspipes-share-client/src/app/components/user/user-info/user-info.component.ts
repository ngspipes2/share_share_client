import { Component, Input } from '@angular/core';

import { User } from '../../../logic/domain/user';
import { UserService } from '../../../logic/services/user.service';
import { SessionService } from '../../../logic/services/session.service';
import { DialogService } from '../../dialog/dialog.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {

    @Input()
    user : User;

    @Input()
    editable : boolean;

    loading : boolean;



    constructor(private userService : UserService,
                private dialogService : DialogService) { }



    saveClick() {
        this.loading = true;

        this.userService.updateUser(this.user)
        .then(() => {
            this.loading = false;
            this.dialogService.openSuccessDialog("Saved successfully!", "");
        })
        .catch((error) => {
            this.loading = false;
            this.dialogService.openErrorDialog("Error saving user!", error);
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

        this.userService.updateImage(this.user.userName, file)
        .then((response) => {
            this.loading = false;

            if(response)
                this.dialogService.openSuccessDialog("Image uploaded successfully!", "");
            else
                this.dialogService.openWarningDialog("Error uploading image!", "Image could not be uploaded try again later.");
        })
        .catch((error) => {
            this.loading = false;
            this.dialogService.openErrorDialog("Error uploading image!", error);
            console.error(error);
        });
    }

    changePasswordClick() {
        let dialogRef = this.dialogService.openChangePasswordDialog();

        dialogRef.afterClosed().subscribe((data : any) => {
            if(!data)
                return;

            this.loading = true;

            this.userService.changeUserPassword(this.user.userName, data.currentPassword, data.newPassword)
            .then((result) => {
                this.loading = false;

                if(!result)
                    this.dialogService.openWarningDialog("Password could not be change!", "Password could not be change! Try again latter!");
                else
                    this.dialogService.openSuccessDialog("Password changed successfully!", "");
            })
            .catch((error) => {
                this.loading = false;
                this.dialogService.openErrorDialog("Error changing password!", error);
            });
        });
    }

}
