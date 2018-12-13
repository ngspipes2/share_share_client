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
import { SelectToolsFromRepositoryDialogComponent, SelectToolsFromRepositoryDialogData } from './select-tools-from-repository-dialog/select-tools-from-repository-dialog.component';
import { SelectPipelinesFromRepositoryDialogComponent, SelectPipelinesFromRepositoryDialogData } from './select-pipelines-from-repository-dialog/select-pipelines-from-repository-dialog.component';
import { CloneToolsDialogComponent, CloneToolsDialogData, CloneData as CloneToolDats } from './clone-tools-dialog/clone-tools-dialog.component';
import { ClonePipelinesDialogComponent, ClonePipelinesDialogData, CloneData as ClonePipelineData } from './clone-pipelines-dialog/clone-pipelines-dialog.component';


export class DialogResult<T> {
    public constructor(public result : T, public error : any) { }
}

@Injectable()
export class DialogManager {

    constructor(public dialog: MatDialog) {}



    public toPromise<T>(dialog : MatDialogRef<any, DialogResult<T>>) : Promise<T> {
        return new Promise<T>((resolve, reject) => {
             dialog.afterClosed().subscribe(result => {
                 if(!result)
                    resolve(undefined);
                 else if(result.error)
                     reject(result.error);
                 else
                     resolve(result.result);
             });
         });
    }

    public open<T, D = any, R = any>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, config?: MatDialogConfig<D>): MatDialogRef<T, R> {
         return this.dialog.open(componentOrTemplateRef, config);
     }


    public openSimpleDialog(title : string, message : string, type : Type, responses : string[]) : MatDialogRef<SimpleDialogComponent, DialogResult<string>> {
        return this.open(SimpleDialogComponent, {
            data: {title : title, message : message, type : type, responses : responses}
        });
    }

    public openSimpleDialogAsPromise(title : string, message : string, type : Type, responses : string[]) : Promise<string> {
        return this.toPromise(this.openSimpleDialog(title, message, type, responses));
    }


    public openErrorDialog(title : string, message : string, responses ? : string[]) : MatDialogRef<SimpleDialogComponent, DialogResult<string>> {
        if(!responses)
            responses = ["Ok"];

        return this.openSimpleDialog(title, message, Type.ERROR, responses);
    }

    public openErrorDialogAsPromise(title : string, message : string, responses ? : string[]) : Promise<string> {
        return this.toPromise(this.openErrorDialog(title, message, responses));
    }


    public openWarningDialog(title : string, message : string, responses ? : string[]) : MatDialogRef<SimpleDialogComponent, DialogResult<string>> {
        if(!responses)
            responses = ["Ok"];

        return this.openSimpleDialog(title, message, Type.WARNING, responses);
    }

    public openWarningDialogAsPromise(title : string, message : string, responses ? : string[]) : Promise<string> {
        return this.toPromise(this.openWarningDialog(title, message, responses));
    }


    public openInformationDialog(title : string, message : string, responses ? : string[]) : MatDialogRef<SimpleDialogComponent, DialogResult<string>> {
        if(!responses)
            responses = ["Ok"];

        return this.openSimpleDialog(title, message, Type.INFO, responses);
    }

    public openInformationDialogAsPromise(title : string, message : string, responses ? : string[]) : Promise<string> {
        return this.toPromise(this.openInformationDialog(title, message, responses));
    }


    public openSuccessDialog(title : string, message : string, responses ? : string[]) : MatDialogRef<SimpleDialogComponent, DialogResult<string>> {
        if(!responses)
            responses = ["Ok"];

        return this.openSimpleDialog(title, message, Type.SUCCESS, responses);
    }

    public openSuccessDialogAsPromise(title : string, message : string, responses ? : string[]) : Promise<string> {
        return this.toPromise(this.openSuccessDialog(title, message, responses));
    }


    public openChangePasswordDialog() : MatDialogRef<ChangePasswordDialogComponent, DialogResult<any>> {
        return this.dialog.open(ChangePasswordDialogComponent);
    }

    public openChangePasswordDialogAsPromise() : Promise<any> {
        return this.toPromise(this.openChangePasswordDialog());
    }


    public openNewGroupNameDialog() : MatDialogRef<NewGroupNameDialogComponent, DialogResult<string>> {
        return this.dialog.open(NewGroupNameDialogComponent);
    }

    public openNewGroupNameDialogAsPromise() : Promise<string> {
        return this.toPromise(this.openNewGroupNameDialog());
    }


    public openSelectRepositoryConfigDialog() : MatDialogRef<SelectRepositoryConfigDialogComponent, DialogResult<string>> {
        return this.dialog.open(SelectRepositoryConfigDialogComponent);
    }

    public openSelectRepositoryConfigDialogAsPromise() : Promise<string> {
        return this.toPromise(this.openSelectRepositoryConfigDialog());
    }


    public openNewAccessTokenNameDialog() : MatDialogRef<NewAccessTokenNameDialogComponent, DialogResult<string>> {
        return this.dialog.open(NewAccessTokenNameDialogComponent);
    }

    public openNewAccessTokenNameDialogAsPromise() : Promise<string> {
        return this.toPromise(this.openNewAccessTokenNameDialog());
    }


    public openShowTokenDialog(token : string) : MatDialogRef<ShowTokenDialogComponent, DialogResult<any>> {
        return this.dialog.open(ShowTokenDialogComponent, {data : token});
    }

    public openShowTokenDialogAsPromise(token : string) : Promise<string> {
        return this.toPromise(this.openShowTokenDialog(token));
    }


    public openNewRepositoryNameDialog() : MatDialogRef<NewRepositoryNameDialogComponent, DialogResult<string>> {
        return this.dialog.open(NewRepositoryNameDialogComponent);
    }

    public openNewRepositoryNameDialogAsPromise() : Promise<string> {
        return this.toPromise(this.openNewRepositoryNameDialog());
    }


    public openNewRepositoryLocationDialog() : MatDialogRef<NewRepositoryLocationDialogComponent, DialogResult<string>> {
        return this.dialog.open(NewRepositoryLocationDialogComponent);
    }

    public openNewRepositoryLocationDialogAsPromise() : Promise<string> {
        return this.toPromise(this.openNewRepositoryLocationDialog());
    }


    public openSelectRepositoryEntityTypeDialog() : MatDialogRef<SelectRepositoryEntityTypeDialogComponent, DialogResult<EntityType>> {
        return this.dialog.open(SelectRepositoryEntityTypeDialogComponent);
    }

    public openSelectRepositoryEntityTypeDialogAsPromise() : Promise<string> {
        return this.toPromise(this.openSelectRepositoryEntityTypeDialog());
    }


    public openSelectUserDialog() : MatDialogRef<SelectUserDialogComponent, DialogResult<string>> {
        return this.dialog.open(SelectUserDialogComponent);
    }

    public openSelectUserDialogAsPromise() : Promise<string> {
        return this.toPromise(this.openSelectUserDialog());
    }


    public openSelectGroupDialog() : MatDialogRef<SelectGroupDialogComponent, DialogResult<string>> {
        return this.dialog.open(SelectGroupDialogComponent);
    }

    public openSelectGroupDialogAsPromise() : Promise<string> {
        return this.toPromise(this.openSelectGroupDialog());
    }


    public openSelectRepositoryDialog() : MatDialogRef<SelectRepositoryDialogComponent, DialogResult<string>> {
        return this.dialog.open(SelectRepositoryDialogComponent);
    }

    public openSelectRepositoryDialogAsPromise() : Promise<string> {
        return this.toPromise(this.openSelectRepositoryDialog());
    }


    public openNewToolNameDialog(repositoryName : string) : MatDialogRef<NewToolNameDialogComponent, DialogResult<string>> {
        return this.dialog.open(NewToolNameDialogComponent, {
            data: { repositoryName : repositoryName }
        });
    }

    public openNewToolNameDialogAsPromise(repositoryName : string) : Promise<string> {
        return this.toPromise(this.openNewToolNameDialog(repositoryName));
    }


    public openNewPipelineNameDialog(repositoryName : string) : MatDialogRef<NewPipelineNameDialogComponent, DialogResult<string>> {
        return this.dialog.open(NewPipelineNameDialogComponent, {
            data: { repositoryName : repositoryName }
        });
    }

    public openNewPipelineNameDialogAsPromise(repositoryName : string) : Promise<string> {
        return this.toPromise(this.openNewPipelineNameDialog(repositoryName));
    }


    public openSelectToolsFromRepositoryDialog(repositoryName : string) : MatDialogRef<SelectToolsFromRepositoryDialogComponent, DialogResult<string[]>> {
        return this.dialog.open(SelectToolsFromRepositoryDialogComponent, {
            data: { repositoryName : repositoryName }
        });
    }

    public openSelectToolsFromRepositoryDialogAsPromise(repositoryName : string) : Promise<string[]> {
        return this.toPromise(this.openSelectToolsFromRepositoryDialog(repositoryName));
    }


    public openSelectPipelinesFromRepositoryDialog(repositoryName : string) : MatDialogRef<SelectPipelinesFromRepositoryDialogComponent, DialogResult<string[]>> {
        return this.dialog.open(SelectPipelinesFromRepositoryDialogComponent, {
            data: { repositoryName : repositoryName }
        });
    }

    public openSelectPipelinesFromRepositoryDialogAsPromise(repositoryName : string) : Promise<string[]> {
        return this.toPromise(this.openSelectPipelinesFromRepositoryDialog(repositoryName));
    }


    public openCloneToolsDialog(clones : CloneToolDats[]) : MatDialogRef<CloneToolsDialogComponent, DialogResult<any>> {
        return this.dialog.open(CloneToolsDialogComponent, {
            data: { clones : clones }
        });
    }

    public openCloneToolsDialogAsPromise(clones : CloneToolDats[]) : Promise<any> {
        return this.toPromise(this.openCloneToolsDialog(clones));
    }


    public openClonePipelinesDialog(clones : ClonePipelineData[]) : MatDialogRef<ClonePipelinesDialogComponent, DialogResult<any>> {
        return this.dialog.open(ClonePipelinesDialogComponent, {
            data: { clones : clones }
        });
    }

    public openClonePipelineDialogAsPromise(clones : ClonePipelineData[]) : Promise<any> {
        return this.toPromise(this.openClonePipelinesDialog(clones));
    }

}
