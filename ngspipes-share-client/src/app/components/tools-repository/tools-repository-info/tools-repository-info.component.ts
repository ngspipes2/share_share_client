import { Component, Input } from '@angular/core';

import { ToolsRepository } from '../../../logic/domain/tools-repository';
import { ToolsRepositoryService } from '../../../logic/services/tools-repository.service';
import { DialogService } from '../../dialog/dialog.service';

@Component({
    selector: 'app-tools-repository-info',
    templateUrl: './tools-repository-info.component.html',
    styleUrls: ['./tools-repository-info.component.scss']
})
export class ToolsRepositoryInfoComponent {

    @Input()
    repository : ToolsRepository;

    @Input()
    editable : boolean;

    loading : boolean;



    constructor(private repositoryService : ToolsRepositoryService, private dialogService : DialogService) { }



    dateToString(date : Date) : string {
        let day = date.getDate() > 10 ? date.getDate().toString() : '0'+date.getDate().toString();
        let month = (date.getMonth()+1) > 10 ? (date.getMonth()+1).toString() : '0'+(date.getMonth()+1).toString();;
        let year = date.getFullYear();
        let hour = date.getHours() > 10 ? date.getHours().toString() : '0'+date.getHours().toString();
        let minutes = date.getMinutes() > 10 ? date.getMinutes().toString() : '0'+date.getMinutes().toString();

        return day + "-" + month + "-" + year + " " + hour + ":" + minutes;
    }

    saveClick() {
        this.loading = true;

        this.repositoryService.updateRepository(this.repository)
        .then(() => {
            this.loading = false;
            this.dialogService.openSuccessDialog("Saved successfully!", "");
        })
        .catch((error) => {
            this.loading = false;
            this.dialogService.openErrorDialog("Error saving repository!", error);
            console.error(error);
        });
    }

    changeImage(file : any) {
        if(!file)
            return;

        this.loading = true;

        this.repositoryService.updateImage(this.repository.id, file)
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

}
