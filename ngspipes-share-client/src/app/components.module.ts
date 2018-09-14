import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

import { AuthGuard } from './logic/services/auth-guard.service';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { SimpleDialogComponent } from './components/dialog/simple-dialog/simple-dialog.component';
import { UserImageComponent } from './components/image/user-image/user-image.component';
import { GroupImageComponent } from './components/image/group-image/group-image.component';
import { ToolsRepositoryImageComponent } from './components/image/tools-repository-image/tools-repository-image.component';
import { PipelinesRepositoryImageComponent } from './components/image/pipelines-repository-image/pipelines-repository-image.component';
import { ChangePasswordDialogComponent } from './components/dialog/change-password-dialog/change-password-dialog.component';
import { UserInfoComponent } from './components/user/user-info/user-info.component';
import { UserGroupsComponent } from './components/user/user-groups/user-groups.component';
import { UserToolsRepositoriesComponent } from './components/user/user-tools-repositories/user-tools-repositories.component';
import { UserPipelinesRepositoriesComponent } from './components/user/user-pipelines-repositories/user-pipelines-repositories.component';
import { GroupComponent } from './components/group/group.component';
import { GroupInfoComponent } from './components/group/group-info/group-info.component';
import { GroupMembersComponent } from './components/group/group-members/group-members.component';
import { SelectUserDialogComponent } from './components/dialog/select-user-dialog/select-user-dialog.component';
import { SelectGroupDialogComponent } from './components/dialog/select-group-dialog/select-group-dialog.component';
import { ToolsRepositoryComponent } from './components/tools-repository/tools-repository.component';
import { ToolsRepositoryInfoComponent } from './components/tools-repository/tools-repository-info/tools-repository-info.component';
import { ToolsRepositoryUsersWithAccessComponent } from './components/tools-repository/tools-repository-users-with-access/tools-repository-users-with-access.component';
import { ToolsRepositoryGroupsWithAccessComponent } from './components/tools-repository/tools-repository-groups-with-access/tools-repository-groups-with-access.component';
import { PipelinesRepositoryComponent } from './components/pipelines-repository/pipelines-repository.component';
import { PipelinesRepositoryInfoComponent } from './components/pipelines-repository/pipelines-repository-info/pipelines-repository-info.component';
import { PipelinesRepositoryUsersWithAccessComponent } from './components/pipelines-repository/pipelines-repository-users-with-access/pipelines-repository-users-with-access.component';
import { PipelinesRepositoryGroupsWithAccessComponent } from './components/pipelines-repository/pipelines-repository-groups-with-access/pipelines-repository-groups-with-access.component';
import { AskStringValueDialogComponent } from './components/dialog/ask-string-value-dialog/ask-string-value-dialog.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'users/:userName', component: UserComponent, pathMatch: 'full', canActivate: [AuthGuard]},
    { path: 'groups/:groupName', component: GroupComponent, pathMatch: 'full', canActivate: [AuthGuard]},
    { path: 'toolsRepositories/:repositoryId', component: ToolsRepositoryComponent, pathMatch: 'full', canActivate: [AuthGuard]},
    { path: 'pipelinesRepositories/:repositoryId', component: PipelinesRepositoryComponent, pathMatch: 'full', canActivate: [AuthGuard]}
];

@NgModule({
    declarations: [
        HeaderComponent,
        LoginComponent,
        UserComponent,
        SideNavComponent,
        SimpleDialogComponent,
        UserImageComponent,
        GroupImageComponent,
        ToolsRepositoryImageComponent,
        PipelinesRepositoryImageComponent,
        ChangePasswordDialogComponent,
        UserInfoComponent,
        UserGroupsComponent,
        UserToolsRepositoriesComponent,
        UserPipelinesRepositoriesComponent,
        GroupComponent,
        GroupInfoComponent,
        GroupMembersComponent,
        SelectUserDialogComponent,
        SelectGroupDialogComponent,
        ToolsRepositoryComponent,
        ToolsRepositoryInfoComponent,
        ToolsRepositoryUsersWithAccessComponent,
        ToolsRepositoryGroupsWithAccessComponent,
        PipelinesRepositoryComponent,
        PipelinesRepositoryInfoComponent,
        PipelinesRepositoryUsersWithAccessComponent,
        PipelinesRepositoryGroupsWithAccessComponent,
        AskStringValueDialogComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterModule.forRoot(appRoutes /*,{enableTracing: true//debugging purposes only}*/)
    ],
    exports: [
        HeaderComponent,
        LoginComponent,
        UserComponent,
        SideNavComponent,
        SimpleDialogComponent,
        UserImageComponent,
        GroupImageComponent,
        ToolsRepositoryImageComponent,
        PipelinesRepositoryImageComponent,
        ChangePasswordDialogComponent,
        UserInfoComponent,
        UserGroupsComponent,
        UserToolsRepositoriesComponent,
        UserPipelinesRepositoriesComponent,
        GroupComponent,
        GroupInfoComponent,
        GroupMembersComponent,
        SelectUserDialogComponent,
        SelectGroupDialogComponent,
        ToolsRepositoryComponent,
        ToolsRepositoryInfoComponent,
        ToolsRepositoryUsersWithAccessComponent,
        ToolsRepositoryGroupsWithAccessComponent,
        PipelinesRepositoryComponent,
        PipelinesRepositoryInfoComponent,
        PipelinesRepositoryUsersWithAccessComponent,
        PipelinesRepositoryGroupsWithAccessComponent,
        AskStringValueDialogComponent,
        RouterModule
    ],
    entryComponents : [
        SimpleDialogComponent,
        ChangePasswordDialogComponent,
        SelectUserDialogComponent,
        SelectGroupDialogComponent,
        AskStringValueDialogComponent
     ]
})

export class ComponentsModule { }
