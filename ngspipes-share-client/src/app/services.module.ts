import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthGuard } from './logic/services/auth-guard.service';
import { GroupService } from './logic/services/group.service';
import { HttpUtils } from './logic/services/http-utils';
import { LoginService } from './logic/services/login.service';
import { PipelinesRepositoryService } from './logic/services/pipelines-repository.service';
import { SessionService } from './logic/services/session.service';
import { ToolsRepositoryService } from './logic/services/tools-repository.service';
import { UserService } from './logic/services/user.service';
import { PreferencesService } from './logic/services/preferences.service';
import { DialogService } from './components/dialog/dialog.service';



@NgModule({
    declarations: [ ],
    imports: [ ],
    exports: [ ],
    providers: [
        AuthGuard,
        GroupService,
        HttpUtils,
        LoginService,
        PipelinesRepositoryService,
        SessionService,
        ToolsRepositoryService,
        UserService,
        PreferencesService,
        DialogService
    ]
})

export class ServicesModule { }
