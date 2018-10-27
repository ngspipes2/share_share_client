import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { PreferencesService } from './preferences.service';
import { LoginService } from './login.service';
import { SessionService } from './session.service';
import { AuthGuard } from './auth-guard.service';
import { HttpService } from './http.service';
import { UserService } from './user.service';
import { GroupService } from './group.service';
import { GroupMemberService } from './group-member.service';
import { AccessTokenService } from './access-token.service';
import { ExternalRepositoryService } from './external-repository.service';
import { InternalRepositoryService } from './internal-repository.service';
import { InternalRepositoryUserMemberService } from './internal-repository-user-member.service';
import { InternalRepositoryGroupMemberService } from './internal-repository-group-member.service';

@NgModule({
    declarations: [ ],
    imports: [
        HttpModule
    ],
    exports: [ ],
    providers: [
        PreferencesService,
        LoginService,
        SessionService,
        AuthGuard,
        HttpService,
        UserService,
        GroupService,
        GroupMemberService,
        AccessTokenService,
        ExternalRepositoryService,
        InternalRepositoryService,
        InternalRepositoryUserMemberService,
        InternalRepositoryGroupMemberService
    ]
})

export class ServicesModule { }
