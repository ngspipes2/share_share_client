import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { ComponentType } from '@angular/cdk/portal';

import { EntityType } from '../../entities/repository';

import { Type,  SimpleDialogData, SimpleDialogComponent } from './simple-dialog/simple-dialog.component';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { NewGroupNameDialogComponent } from './new-group-name-dialog/new-group-name-dialog.component';
import { SelectRepositoryConfigDialogComponent } from './select-repository-config-dialog/select-repository-config-dialog.component';
import { NewAccessTokenNameDialogComponent } from './new-access-token-name-dialog/new-access-token-name-dialog.component';
import { ShowTokenDialogComponent } from './show-token-dialog/show-token-dialog.component';
import { NewRepositoryNameDialogComponent } from './new-repository-name-dialog/new-repository-name-dialog.component';
import { NewRepositoryLocationDialogComponent } from './new-repository-location-dialog/new-repository-location-dialog.component';
import { SelectRepositoryEntityTypeDialogComponent } from './select-repository-entity-type-dialog/select-repository-entity-type-dialog.component';
import { SelectUserDialogComponent } from './select-user-dialog/select-user-dialog.component';
import { SelectGroupDialogComponent } from './select-group-dialog/select-group-dialog.component';
import { SelectRepositoryDialogComponent } from './select-repository-dialog/select-repository-dialog.component';
import { NewToolNameDialogComponent, NewToolNameDialogData } from './new-tool-name-dialog/new-tool-name-dialog.component';
import { NewPipelineNameDialogComponent, NewPipelineNameDialogData } from './new-pipeline-name-dialog/new-pipeline-name-dialog.component';

export class DialogResult<T> {
    public constructor(public result : T, public error : any) { }
}

@Injectable()
export class DialogManager {

    constructor(public dialog: MatDialog) {}



     public open<T, D = any, R = any>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, config?: MatDialogConfig<D>): MatDialogRef<T, R> {
         return this.dialog.open(componentOrTemplateRef, config);
     }

    public openSimpleDialog(title : string, message : string, type : Type, responses : string[]) : MatDialogRef<SimpleDialogComponent, DialogResult<string>> {
        return this.open(SimpleDialogComponent, {
            data: {title : title, message : message, type : type, responses : responses}
        });
    }

    public openErrorDialog(title : string, message : string, responses ? : string[]) : MatDialogRef<SimpleDialogComponent, DialogResult<string>> {
        if(!responses)
            responses = ["Ok"];

        return this.openSimpleDialog(title, message, Type.ERROR, responses);
    }

    public openWarningDialog(title : string, message : string, responses ? : string[]) : MatDialogRef<SimpleDialogComponent, DialogResult<string>> {
        if(!responses)
            responses = ["Ok"];

        return this.openSimpleDialog(title, message, Type.WARNING, responses);
    }

    public openInformationDialog(title : string, message : string, responses ? : string[]) : MatDialogRef<SimpleDialogComponent, DialogResult<string>> {
        if(!responses)
            responses = ["Ok"];

        return this.openSimpleDialog(title, message, Type.INFO, responses);
    }

    public openSuccessDialog(title : string, message : string, responses ? : string[]) : MatDialogRef<SimpleDialogComponent, DialogResult<string>> {
        if(!responses)
            responses = ["Ok"];

        return this.openSimpleDialog(title, message, Type.SUCCESS, responses);
    }

    public openChangePasswordDialog() : MatDialogRef<ChangePasswordDialogComponent, DialogResult<any>> {
        return this.dialog.open(ChangePasswordDialogComponent);
    }

    public openNewGroupNameDialog() : MatDialogRef<NewGroupNameDialogComponent, DialogResult<string>> {
        return this.dialog.open(NewGroupNameDialogComponent);
    }

    public openSelectRepostiroyConfigDialog() : MatDialogRef<SelectRepositoryConfigDialogComponent, DialogResult<string>> {
        return this.dialog.open(SelectRepositoryConfigDialogComponent);
    }

    public openNewAccessTokenNameDialog() : MatDialogRef<NewAccessTokenNameDialogComponent, DialogResult<string>> {
        return this.dialog.open(NewAccessTokenNameDialogComponent);
    }

    public openShowTokenDialog(token : string) : MatDialogRef<ShowTokenDialogComponent, DialogResult<any>> {
        return this.dialog.open(ShowTokenDialogComponent, {data : token});
    }

    public openNewRepositoryNameDialog() : MatDialogRef<NewRepositoryNameDialogComponent, DialogResult<string>> {
        return this.dialog.open(NewRepositoryNameDialogComponent);
    }

    public openNewRepositoryLocationDialog() : MatDialogRef<NewRepositoryLocationDialogComponent, DialogResult<string>> {
        return this.dialog.open(NewRepositoryLocationDialogComponent);
    }

    public openSelectRepositoryEntityTypeDialog() : MatDialogRef<SelectRepositoryEntityTypeDialogComponent, DialogResult<EntityType>> {
        return this.dialog.open(SelectRepositoryEntityTypeDialogComponent);
    }

    public openSelectUserDialog() : MatDialogRef<SelectUserDialogComponent, DialogResult<string>> {
        return this.dialog.open(SelectUserDialogComponent);
    }

    public openSelectGroupDialog() : MatDialogRef<SelectGroupDialogComponent, DialogResult<string>> {
        return this.dialog.open(SelectGroupDialogComponent);
    }

    public openSelectRepositoryDialog() : MatDialogRef<SelectRepositoryDialogComponent, DialogResult<string>> {
        return this.dialog.open(SelectRepositoryDialogComponent);
    }

    public openNewToolNameDialog(repositoryName : string) : MatDialogRef<NewToolNameDialogComponent, DialogResult<string>> {
        return this.dialog.open(NewToolNameDialogComponent, {
            data: { repositoryName : repositoryName }
        });
    }

    public openNewPipelineNameDialog(repositoryName : string) : MatDialogRef<NewPipelineNameDialogComponent, DialogResult<string>> {
        return this.dialog.open(NewPipelineNameDialogComponent, {
            data: { repositoryName : repositoryName }
        });
    }

}
