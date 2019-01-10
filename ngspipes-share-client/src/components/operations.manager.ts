import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { RepositoryConfig, Config } from '../entities/repository-config';
import { RepositoryConfigService } from '../services/repository-config.service';

import { AccessToken } from '../entities/access-token';
import { AccessTokenService, NewAccessTokenData } from '../services/access-token.service';

import { User, UserRole } from '../entities/user';
import { UserService } from '../services/user.service';

import { Group } from '../entities/group';
import { GroupService } from '../services/group.service';
import { GroupMember } from '../entities/group-member';
import { GroupMemberService } from '../services/group-member.service';

import { Repository, EntityType, LocationType } from '../entities/repository';
import { RepositoryService } from '../services/repository.service';
import { RepositoryGroupMember } from '../entities/repository-group-member';
import { RepositoryGroupMemberService } from '../services/repository-group-member.service';
import { RepositoryUserMember } from '../entities/repository-user-member';
import { RepositoryUserMemberService } from '../services/repository-user-member.service';

import { Tool, ToolFormat } from '../entities/tool';
import { ToolsRepositoryFacadeService } from '../services/tools-repository-facade.service';
import { Pipeline, PipelineFormat } from '../entities/pipeline';
import { PipelinesRepositoryFacadeService } from '../services/pipelines-repository-facade.service';

import { ImportExportService } from '../services/import-export.service';

import { SessionService } from '../services/session.service';

import { DialogManager } from './dialog/dialog.manager';

@Injectable()
export class OperationsManager {

    constructor(
        public repositoryConfigService : RepositoryConfigService,
        public accessTokenService : AccessTokenService,
        public userService : UserService,
        public groupService : GroupService,
        public groupMemberService : GroupMemberService,
        public repositoryService : RepositoryService,
        public repositoryGroupMemberService : RepositoryGroupMemberService,
        public repositoryUserMemberService : RepositoryUserMemberService,
        public toolsRepositoryFacadeService : ToolsRepositoryFacadeService,
        public pipelinesRepositoryFacadeService : PipelinesRepositoryFacadeService,
        public importExportService : ImportExportService,
        public dialogManager : DialogManager,
        public sessionService : SessionService,
        private router : Router
    ) { }



    public login(userName : string, password : string) : Promise<boolean> {
        return this.sessionService.login(userName, password)
        .then((result) => {
            if(!result) {
                this.dialogManager.openErrorDialog("Invalid credentials!", null);
            } else {
                let route = this.sessionService.redirectUrl ? this.sessionService.redirectUrl : ('/users/' + userName);
                this.sessionService.redirectUrl = "";
                this.router.navigate([route]);
            }

            return result;
        })
        .catch(this.createErrorHandler("Error while login!"));
    }

    private createErrorHandler(errorTitle : string, showError : boolean = true) :  (error : any) => Promise<any> {
        return error => {
            this.dialogManager.openErrorDialog(errorTitle, showError ? error : null);
            console.error(error);
            throw error;
        };
    }

    public logout() : Promise<boolean> {
        return this.sessionService.logout()
        .then((response) => {
            if(response)
                this.router.navigate(['/login']);
            else
                this.dialogManager.openWarningDialog("Could not logout!", null);

            return response;
        })
        .catch(this.createErrorHandler("Error while logout!"));
    }


    public getAllRepositoriesConfigs() : Promise<RepositoryConfig[]> {
        return this.repositoryConfigService.getAllConfigs()
        .catch(this.createErrorHandler("Error getting Repositories Configs!"));
    }


    public getRepositoryConfig(repositoryName : string) : Promise<RepositoryConfig> {
        return this.repositoryConfigService.getConfig(repositoryName)
        .then(config => {
            if(!config)
                this.dialogManager.openErrorDialog("There is no Config for Repository: " + repositoryName + "!", null);

            return config;
        })
        .catch(this.createErrorHandler("Error getting Config for Repository: " + repositoryName + "!"));
    }


    public createRepositoryConfig(config : RepositoryConfig) : Promise<boolean> {
        let promise = config.repositoryName ? Promise.resolve(config.repositoryName) : this.selectRepositoryName();

        return promise
        .then(repositoryName => {
            if(!repositoryName)
                return false;

            config.repositoryName = repositoryName;

            return this.createConfig(config);
        });
    }

    private selectRepositoryName() : Promise<string> {
        return this.dialogManager.openSelectRepositoryDialogAsPromise()
        .catch(this.createErrorHandler("Error selecting Repository!"));
    }

    private createConfig(config : RepositoryConfig) : Promise<boolean> {
        return this.repositoryConfigService.createConfig(config)
        .then(result => {
            if(!result)
                this.dialogManager.openErrorDialog("Repository Config not created!", "Repository Config: " + config.repositoryName + " could not be created! Please try again latter.");
            else
                this.dialogManager.openSuccessDialog("Repository Config: " + config.repositoryName + " created successfully!", null);

            return result;
        })
        .catch(this.createErrorHandler("Error creating Repository Config: " + config.repositoryName + "!"));
    }


    public deleteRepositoryConfig(config : RepositoryConfig) : Promise<boolean> {
        return this.askForRepositoryConfigDeleteAuthorization(config)
        .then(response => {
            if(!response)
                return false;

            return this.internalDeleteRepositoryConfig(config);
        });
    }

    private askForRepositoryConfigDeleteAuthorization(config : RepositoryConfig) : Promise<boolean> {
        let title = "Delete Repository Config";
        let message = "Are you sure you want delete config for Repository: " + config.repositoryName + " ?";
        let options = ["Yes", "No"];

        return this.dialogManager.openWarningDialogAsPromise(title, message, options)
        .then(result => result === "Yes")
        .catch(this.createErrorHandler("Error getting permition to delete Config for Repository: " + config.repositoryName + "!"));
    }

    private internalDeleteRepositoryConfig(config : RepositoryConfig) : Promise<boolean> {
        return this.repositoryConfigService.deleteConfig(config.repositoryName)
        .then(result => {
            if(!result)
                this.dialogManager.openErrorDialog("Repository Config not deleted!", "Repository Config: " + config.repositoryName + " could not be deleted! Please try again latter.");
            else
                this.dialogManager.openSuccessDialog("Repository Config: " + config.repositoryName + " deleted successfully!", null);

            return result;
        })
        .catch(this.createErrorHandler("Error deleting Repository Config: " + config.repositoryName + "!"));
    }


    public saveRepositoryConfig(config : RepositoryConfig) : Promise<boolean> {
        return this.repositoryConfigService.updateConfig(config)
        .then(result => {
            if(!result)
                this.dialogManager.openWarningDialog("Repository Config could not be saved!", "Repository Config: " + config.repositoryName + " could not be saved! Please try again latter.");
            else
                this.dialogManager.openSuccessDialog("Repository Config: " + config.repositoryName + " saved successfully!", null);

            return result;
        })
        .catch(this.createErrorHandler("Error saving Repository Config: " + config.repositoryName + "!"));
    }


    public getAccessTokensOfUser(userName : string) : Promise<AccessToken[]> {
        return this.accessTokenService.getAccessTokensOfUser(userName)
        .catch(this.createErrorHandler("Error getting Access Tokens of User: " + userName + "!"));
    }


    public getAccessToken(id : number) : Promise<AccessToken> {
        return this.accessTokenService.getAccessToken(id)
        .then(token => {
            if(!token)
                this.dialogManager.openErrorDialog("There is no Access Token with id: " + id + "!", null);

            return token;
        })
        .catch(this.createErrorHandler("Error getting AccessToken: " + id + "!"));
    }


    public crerateAccessToken(token : AccessToken) : Promise<NewAccessTokenData> {
        let promise = token.name ? Promise.resolve(token.name): this.getNewAccessTokenName();

        return promise
        .then(name => {
            if(!name)
                return null;

            token.name = name;

            return this.createToken(token);
        });
    }

    private getNewAccessTokenName() : Promise<string> {
        return this.dialogManager.openNewAccessTokenNameDialogAsPromise()
        .catch(this.createErrorHandler("Error getting name for new Access Token!"));
    }

    private createToken(token : AccessToken) : Promise<NewAccessTokenData> {
        let currentUserName = this.sessionService.getCurrentCredentials()[0];
        token.ownerName = currentUserName;

        return this.accessTokenService.createAccessToken(token)
        .then(data => {
            this.dialogManager.openShowTokenDialog(data.token);
            return data;
        })
        .catch(this.createErrorHandler("Error creating Access Token: " + token.name + "!"));
    }


    public deleteAccessToken(token : AccessToken) : Promise<boolean> {
        return this.askForAccessTokenDeleteAuthorization(token)
        .then(response => {
            if(!response)
                return false;

            return this.internalDeleteAccessToken(token);
        });
    }

    private askForAccessTokenDeleteAuthorization(token : AccessToken) : Promise<boolean> {
        let title = "Delete Access Token";
        let message = "Are you sure you want delete Access Token: " + token.name + " ?";
        let options = ["Yes", "No"];

        return this.dialogManager.openWarningDialogAsPromise(title, message, options)
        .then(result => result === "Yes")
        .catch(this.createErrorHandler("Error getting permition to delete Access Token: " + token.name + "!"));
    }

    private internalDeleteAccessToken(token : AccessToken) : Promise<boolean> {
        return this.accessTokenService.deleteAccessToken(token.id)
        .then(result => {
            if(!result)
                this.dialogManager.openErrorDialog("Access Token not deleted!", "Access Token: " + token.name + " could not be deleted! Please try again latter.");
            else
                this.dialogManager.openSuccessDialog("Access Token: " + token.name + " deleted successfully!", null);

            return result;
        })
        .catch(this.createErrorHandler("Error deleting Access Token: " + token.name + "!"));
    }


    public saveAccessToken(token : AccessToken) : Promise<boolean> {
        return this.accessTokenService.updateAccessToken(token)
        .then(result => {
            if(!result)
                this.dialogManager.openWarningDialog("Access Token could not be saved!", "Access Token: " + token.name + " could not be saved! Please try again latter.");
            else
                this.dialogManager.openSuccessDialog("Access Token: " + token.name + " saved successfully!", null);

            return result;
        })
        .catch(this.createErrorHandler("Error saving Access Token: " + token.name + "!"));
    }


    public getUsersNames() : Promise<string[]> {
        return this.userService.getUsersNames()
        .catch(this.createErrorHandler("Error getting Users names!"));
    }


    public getAllUsers() : Promise<User[]> {
        return this.userService.getAllUsers()
        .catch(this.createErrorHandler("Error getting all Users!"));
    }


    public getUser(userName : string) : Promise<User> {
        return this.userService.getUser(userName)
        .then(user => {
            if(!user)
                this.dialogManager.openErrorDialog("There is no User: " + userName + "!", null);

            return user;
        })
        .catch(this.createErrorHandler("Error getting User: " + userName + "!"));
    }


    public createUser(user : User, redirect: boolean = true) : Promise<string> {
        return this.userService.createUser(user)
        .then((response) => {
            if(redirect)
                this.router.navigate(["/users/" + user.userName]);

            this.dialogManager.openSuccessDialog("User: " + user.userName + " created successfully!", null);

            return response;
        })
        .catch(this.createErrorHandler("Error creating User: " + user.userName + "!"));
    }


    public deleteUser(user : User) : Promise<boolean> {
        return this.askForUserDeleteAuthorization(user)
        .then(response => {
            if(!response)
                return false;

            return this.internalDeleteUser(user);
        });
    }

    private askForUserDeleteAuthorization(user : User) : Promise<boolean> {
        let title = "Delete Account";
        let message = "Are you sure you want to delete account: " + user.userName + " ?";
        let options = ["Yes", "No"];

        return this.dialogManager.openWarningDialogAsPromise(title, message, options)
        .then(result => result === "Yes")
        .catch(this.createErrorHandler("Error getting permition to delete Account: " + user.userName + "!"));
    }

    private internalDeleteUser(user : User) : Promise<boolean> {
        return this.userService.deleteUser(user.userName)
        .then(result => {
            if(!result)
                this.dialogManager.openErrorDialog("Account could not be deleted!", "This account could not be deleted! Please try again later.");
            else
                this.dialogManager.openSuccessDialog("User deleted successfully!", null);

            return result;
        })
        .catch(this.createErrorHandler("Error deleting account!"));
    }


    public saveUser(user : User) : Promise<boolean> {
        return this.userService.updateUser(user)
        .then(result => {
            if(!result)
                this.dialogManager.openWarningDialog("User could not be saved!", "User: " + user.userName + " could not be saved! Please try again latter.");
            else
                this.dialogManager.openSuccessDialog("User: " + user.userName + " saved successfully!", null);

            return result;
        })
        .catch(this.createErrorHandler("Error saving User: " + user.userName + "!"));
    }


    public changeUserImage(user : User, file : any) : Promise<boolean> {
        return this.userService.changeUserImage(user.userName, file)
        .then((response) => {
            if(response)
                this.dialogManager.openSuccessDialog("Image uploaded successfully!", null);
            else
                this.dialogManager.openWarningDialog("User's image could not be uploaded!", "User's image could not be uploaded! Please try again later.");

            return response;
        })
        .catch(this.createErrorHandler("Error uploading User's image!"));
    }


    public deleteUserImage(userName : string) : Promise<boolean> {
        return this.userService.deleteUserImage(userName)
        .catch(this.createErrorHandler("Error deleting image of User: " + userName + "!"))
    }


    public changeUserPassword(userName : string, currentPassword : string, newPassword : string) : Promise<boolean> {
        let promise = (currentPassword && newPassword) ? Promise.resolve([currentPassword, newPassword]) : this.getNewPasswordData();

        return promise
        .then(data => {
            if(!data)
                return;

            return this.internalChangeUserPassword(userName, data[0], data[1]);
        });
    }

    private getNewPasswordData() : Promise<string[]> {
        return this.dialogManager.openChangePasswordDialogAsPromise()
        .catch(this.createErrorHandler("Error getting new Password data!"));
    }

    private internalChangeUserPassword(userName : string, currentPassword : string, newPassword : string) : Promise<boolean> {
        return this.userService.changeUserPassword(userName, currentPassword, newPassword)
        .then(result => {
            if(result)
                this.dialogManager.openSuccessDialog("Password changed successfully!", null);
            else
                this.dialogManager.openSuccessDialog("Password could not be changed!", "Password could not be changed! Please try again later.");
        })
        .catch(this.createErrorHandler("Error changing User's password!"));
    }


    public getGroupsNames() : Promise<string[]> {
        return this.groupService.getGroupsNames()
        .catch(this.createErrorHandler("Error getting Groups names!"));
    }


    public getAllGroups() : Promise<Group[]> {
        return this.groupService.getAllGroups()
        .catch(this.createErrorHandler("Error getting all Groups!"));
    }


    public getGroupsOfUser(userName : string) : Promise<Group[]> {
        return this.groupService.getGroupsOfUser(userName)
        .catch(this.createErrorHandler("Error getting Groups of User: " + userName + "!"));
    }


    public getGroupsAccessibleByUser(userName : string) : Promise<Group[]> {
        return this.groupService.getGroupsAccessibleByUser(userName)
        .catch(this.createErrorHandler("Error getting Groups accessible by User: " + userName + "!"));
    }


    public getGroup(groupName : string) : Promise<Group> {
        return this.groupService.getGroup(groupName)
        .then(group => {
            if(!group)
                this.dialogManager.openErrorDialog("There is no Group: " + groupName + "!", null);

            return group;
        })
        .catch(this.createErrorHandler("Error getting Group: " + groupName + "!"));
    }


    public createGroup(group : Group, redirect : boolean = true) : Promise<string> {
        let promise = group.groupName ? Promise.resolve(group.groupName) : this.getNewGroupName();

        return promise
        .then(name => {
            if(!name)
                return null;

            group.groupName = name;

            return this.internalCreateGroup(group, redirect);
        });
    }

    private getNewGroupName() : Promise<string> {
        return this.dialogManager.openNewGroupNameDialogAsPromise()
        .catch(this.createErrorHandler("Error getting new Group's name!"));
    }

    private internalCreateGroup(group : Group, redirect : boolean) : Promise<string> {
        let currentUserName = this.sessionService.getCurrentCredentials()[0];
        group.ownerName = currentUserName;

        return this.groupService.createGroup(group)
        .then(result => {
            if(redirect)
                this.router.navigate(['/groups/' + group.groupName]);

            this.dialogManager.openSuccessDialog("Group: " + group.groupName + " created successfully!", null);

            return result;
        })
        .catch(this.createErrorHandler("Error creating Group: " + group.groupName + "!"));
    }


    public deleteGroup(group : Group) : Promise<boolean> {
        return this.askForGroupDeleteAuthorization(group)
        .then(response => {
            if(!response)
                return false;

            return this.internalDeleteGroup(group);
        });
    }

    private askForGroupDeleteAuthorization(group : Group) : Promise<boolean> {
        let title = "Delete Group";
        let message = "Are you sure you want to delete Group: " + group.groupName + " ?";
        let options = ["Yes", "No"];

        return this.dialogManager.openWarningDialogAsPromise(title, message, options)
        .then(result => result === "Yes")
        .catch(this.createErrorHandler("Error getting permition to delete Group: " + group.groupName + "!"));
    }

    private internalDeleteGroup(group : Group) : Promise<boolean> {
        return this.groupService.deleteGroup(group.groupName)
        .then(result => {
            if(!result)
                this.dialogManager.openErrorDialog("Group could not be deleted!", "Group: " + group.groupName + " could not be deleted. Please try again later.");
            else
                this.dialogManager.openSuccessDialog("Group: " + group.groupName + " deleted successfully!", null);

            return result;
        })
        .catch(this.createErrorHandler("Error deleting Group: " + group.groupName + "!"));
    }


    public saveGroup(group : Group) : Promise<boolean> {
        return this.groupService.updateGroup(group)
        .then(result => {
            if(!result)
                this.dialogManager.openWarningDialog("Group could not be saved!", "Group: " + group.groupName + " could not be saved! Please try again latter.");
            else
                this.dialogManager.openSuccessDialog("Group: " + group.groupName + " saved successfully!", null);

            return result;
        })
        .catch(this.createErrorHandler("Error saving Group: " + group.groupName + "!"));
    }


    public changeGroupImage(group : Group, file : any) : Promise<boolean> {
        return this.groupService.changeGroupImage(group.groupName, file)
        .then((response) => {
            if(response)
                this.dialogManager.openSuccessDialog("Image uploaded successfully!", null);
            else
                this.dialogManager.openWarningDialog("Group's image could not be uploaded!", "Group's image could not be uploaded! Please try again later.");

            return response;
        })
        .catch(this.createErrorHandler("Error uploading Group's image!"));
    }


    public deleteGroupImage(groupName : string) : Promise<boolean> {
        return this.groupService.deleteGroupImage(groupName)
        .catch(this.createErrorHandler("Error deleting image of Group: " + groupName + "!"));
    }


    public getAllGroupsMembers() : Promise<GroupMember[]> {
        return this.groupMemberService.getAllMembers()
        .catch(this.createErrorHandler("Error getting all Groups Members!"));
    }


    public getMembersOfGroup(groupName : string) : Promise<GroupMember[]> {
        return this.groupMemberService.getMembersOfGroup(groupName)
        .catch(this.createErrorHandler("Error getting Members of Group: " + groupName + "!"));
    }


    public getGroupMembersWtihUser(userName : string) : Promise<GroupMember[]> {
        return this.groupMemberService.getMembersWithUser(userName)
        .catch(this.createErrorHandler("Error getting Group Members with User: " + userName + "!"));
    }


    public getGroupMember(id : number) : Promise<GroupMember> {
        return this.groupMemberService.getMember(id)
        .then(member => {
            if(!member)
                this.dialogManager.openErrorDialog("There is no Group Member with id: " + id + "!", null);

            return member;
        })
        .catch(this.createErrorHandler("Error getting Group Member with id: " + id + "!"));
    }


    public createGroupMember(member : GroupMember) : Promise<number> {
        let promise = member.userName ? Promise.resolve(member.userName) : this.selectUserName();

        return promise
        .then(userName => {
            if(!userName)
                return -1;

            member.userName = userName;

            return this.internalCreateGroupMember(member);
        });
    }

    private selectUserName() : Promise<string> {
        return this.dialogManager.openSelectUserDialogAsPromise()
        .catch(this.createErrorHandler("Error selecting User!"));
    }

    private internalCreateGroupMember(member : GroupMember) : Promise<number> {
        return this.groupMemberService.createMember(member)
        .then(id => {
            this.dialogManager.openSuccessDialog("Member: " + member.userName + " created successfully!", null);
            return id;
        })
        .catch(this.createErrorHandler("Error creating Member: " + member.userName + "!"));
    }


    public deleteGroupMember(member : GroupMember) : Promise<boolean> {
        return this.askForGroupMemberDeleteAuthorization(member)
        .then(response => {
            if(!response)
                return false;

            return this.internalDeleteGroupMember(member);
        });
    }

    private askForGroupMemberDeleteAuthorization(member : GroupMember) : Promise<boolean> {
        let title = "Delete Member";
        let message = "Are you sure you want to delete Member: " + member.userName + "?";
        let options = ["Yes", "No"];

        return this.dialogManager.openWarningDialogAsPromise(title, message, options)
        .then(result => result === "Yes")
        .catch(this.createErrorHandler("Error getting permition to delete Group's Member: " + member.userName + "!"));
    }

    private internalDeleteGroupMember(member : GroupMember) : Promise<boolean> {
        return this.groupMemberService.deleteMember(member.id)
        .then(result => {
            if(!result)
                this.dialogManager.openErrorDialog("Member could not be deleted!", "Member: " + member.userName + " could not be deleted. Please try again later.");
            else
                this.dialogManager.openSuccessDialog("Member: " + member.userName + " deleted successfully!", null);

            return result;
        })
        .catch(this.createErrorHandler("Error deleting Member: " + member.userName + "!"));
    }


    public saveGroupMember(member : GroupMember) : Promise<boolean> {
        return this.groupMemberService.updateMember(member)
        .then(result => {
            if(!result)
                this.dialogManager.openWarningDialog("Member could not be saved!", "Member: " + member.userName + " could not be saved! Please try again latter.");
            else
                this.dialogManager.openSuccessDialog("Member: " + member.userName + " saved successfully!", null);

            return result;
        })
        .catch(this.createErrorHandler("Error saving Member: " + member.userName + "!"));
    }


    public getRepositoriesNames() : Promise<string[]> {
        return this.repositoryService.getRepositoriesNames()
        .catch(this.createErrorHandler("Error getting Repositories names!"));
    }


    public getAllRepositories() : Promise<Repository[]> {
        return this.repositoryService.getAllRepositories()
        .catch(this.createErrorHandler("Error getting all Repositories!"));
    }


    public getRepositoriesOfUser(userName : string) : Promise<Repository[]> {
        return this.repositoryService.getRepositoriesOfUser(userName)
        .catch(this.createErrorHandler("Error getting Repositories of User:  " + userName + "!"));
    }


    public getRepositoriesAccessibleByUser(userName : string) : Promise<Repository[]> {
        return this.repositoryService.getRepositoriesAccessibleByUser(userName)
        .catch(this.createErrorHandler("Error getting Repositories accessible by User: " + userName + "!"));
    }


    public getRepository(repositoryName : string) : Promise<Repository> {
        return this.repositoryService.getRepository(repositoryName)
        .then(repository => {
            if(!repository)
                this.dialogManager.openErrorDialog("There is no Repository: " + repositoryName + "!", null);

            return repository;
        })
        .catch(this.createErrorHandler("Error getting Repository: " + repositoryName + "!"));
    }


    public createRepository(repository : Repository, redirect : boolean = true) : Promise<string> {
        repository.locationType = LocationType.INTERNAL;

        let namePromise = repository.repositoryName ? Promise.resolve(repository.repositoryName) : this.getNewRepositoryName();

        return namePromise
        .then(name => {
            if(!name)
                return null;

            repository.repositoryName = name;

            let entityPromise = repository.entityType ? Promise.resolve(repository.entityType) : this.getRepositoryEntityType();

            return entityPromise
            .then(type => {
                if(!type)
                    return null;

                repository.entityType = type;

                return this.internalCreateRepository(repository, redirect);
            });
        });
    }

    private getNewRepositoryName() : Promise<string> {
        return this.dialogManager.openNewRepositoryNameDialogAsPromise()
        .catch(this.createErrorHandler("Error getting new User name!"));
    }

    private getRepositoryEntityType() : Promise<EntityType> {
        return this.dialogManager.openSelectRepositoryEntityTypeDialogAsPromise()
        .catch(this.createErrorHandler("Error selecting Repository type!"));
    }

    private internalCreateRepository(repository : Repository, redirect : boolean) : Promise<string> {
        let currentUserName = this.sessionService.getCurrentCredentials()[0];
        repository.ownerName = currentUserName;

        return this.repositoryService.createRepository(repository)
        .then(result => {
            if(redirect)
                this.router.navigate(['/repositories/' + repository.repositoryName]);

            this.dialogManager.openSuccessDialog("Repository: " + repository.repositoryName + " created successfully!", null);

            return result;
        })
        .catch(this.createErrorHandler("Error creating Repository: " + repository.repositoryName + "!"));
    }


    public publishRepository(repository : Repository, redirect : boolean = true) : Promise<string> {
        repository.locationType = LocationType.EXTERNAL;

        let namePromise = repository.repositoryName ? Promise.resolve(repository.repositoryName) : this.getNewRepositoryName();

        return namePromise
        .then(name => {
            if(!name)
                return null;

            repository.repositoryName = name;

            let entityPromise = repository.entityType ? Promise.resolve(repository.entityType) : this.getRepositoryEntityType();

            return entityPromise
            .then(type => {
                if(!type)
                    return null;

                repository.entityType = type;

                let locationPromise = repository.location ? Promise.resolve(repository.location) : this.getNewRepositoryLocation();

                return locationPromise
                .then(location => {
                    if(!location)
                        return null;

                    repository.location = location;

                    return this.internalCreateRepository(repository, redirect);
                });
            });
        });
    }

    private getNewRepositoryLocation() : Promise<string> {
        return this.dialogManager.openNewRepositoryLocationDialogAsPromise()
        .catch(this.createErrorHandler("Error getting new Repository's location!"));
    }


    public deleteRepository(repository : Repository) : Promise<boolean> {
        return this.askForRepositoryDeleteAuthorization(repository)
        .then(response => {
            if(!response)
                return false;

            return this.internalDeleteRepository(repository);
        });
    }

    private askForRepositoryDeleteAuthorization(repository : Repository) : Promise<boolean> {
        let title = "Delete Repository";
        let message = "Are you sure you want to delete Repository: " + repository.repositoryName + " ?";
        let options = ["Yes", "No"];

        return this.dialogManager.openWarningDialogAsPromise(title, message, options)
        .then(result => result === "Yes")
        .catch(this.createErrorHandler("Error getting permition to delete Repository: " + repository.repositoryName + "!"));
    }

    private internalDeleteRepository(repository : Repository) : Promise<boolean> {
        return this.repositoryService.deleteRepository(repository.repositoryName)
        .then(result => {
            if(!result)
                this.dialogManager.openErrorDialog("Repository could not be deleted!", "Repository: " + repository.repositoryName + " could not be deleted. Please try again later.");
            else
                this.dialogManager.openSuccessDialog("Repository: " + repository.repositoryName + " deleted successfully!", null);

            return result;
        })
        .catch(this.createErrorHandler("Error deleting Repository: " + repository.repositoryName + "!"));
    }


    public saveRepository(repository : Repository) : Promise<boolean> {
        return this.repositoryService.updateRepository(repository)
        .then(result => {
            if(!result)
                this.dialogManager.openWarningDialog("Repository could not be saved!", "Repository: " + repository.repositoryName + " could not be saved! Please try again latter.");
            else
                this.dialogManager.openSuccessDialog("Repository: " + repository.repositoryName + " saved successfully!", null);

            return result;
        })
        .catch(this.createErrorHandler("Error saving Repository: " + repository.repositoryName + "!"));
    }


    public getConfigForRepository(repositoryName : string) : Promise<RepositoryConfig> {
        return this.repositoryConfigService.getConfig(repositoryName)
        .then(config => {
            if(!config)
                this.dialogManager.openWarningDialog("No config found!", "You have no config to access Repository: " + repositoryName + "!");

            return config;
        })
        .catch(this.createErrorHandler("Error getting config for Repository: " + repositoryName + "!"));
    }


    public changeRepositoryImage(repository : Repository, file : any) : Promise<boolean> {
        return this.getConfigForRepository(repository.repositoryName)
        .then(config => {
            if(!config)
                return false;

            return this.internalChangeRepositoryImage(repository, file, config);
        });
    }

    private internalChangeRepositoryImage(repository : Repository, file : any, config : RepositoryConfig) : Promise<boolean> {
        let promise = null;

        if(repository.entityType === EntityType.TOOLS)
            promise = this.toolsRepositoryFacadeService.setRepositoryImage(config, file);
        else
            promise = this.pipelinesRepositoryFacadeService.setRepositoryImage(config, file);

        return promise
        .then((response) => {
            if(response)
                this.dialogManager.openSuccessDialog("Image uploaded successfully!", null);
            else
                this.dialogManager.openWarningDialog("Repository's image could not be uploaded!", "Repository's image could not be uploaded! Please try again later.");

            return response;
        })
        .catch(this.createErrorHandler("Error uploading Repository's image!"));
    }


    public getAllRepositoryGroupsMembers() : Promise<RepositoryGroupMember[]> {
        return this.repositoryGroupMemberService.getAllMembers()
        .catch(this.createErrorHandler("Error getting all Repositories Groups Members!"));
    }


    public getGroupsMembersOfRepository(repositoryName : string) : Promise<RepositoryGroupMember[]> {
        return this.repositoryGroupMemberService.getMembersOfRepository(repositoryName)
        .catch(this.createErrorHandler("Error getting Groups Members of Repository: " + repositoryName + "!"));
    }


    public getGroupMembersWithGroup(groupName : string) : Promise<RepositoryGroupMember[]> {
        return this.repositoryGroupMemberService.getMembersWithGroup(groupName)
        .catch(this.createErrorHandler("Error getting Repositories Members with Group: " + groupName + "!"));
    }


    public getRepositoryGroupMember(id : number) : Promise<RepositoryGroupMember> {
        return this.repositoryGroupMemberService.getMember(id)
        .then(member => {
            if(!member)
                this.dialogManager.openErrorDialog("There is no Repository Member with id: " + id + "!", null);

            return member;
        })
        .catch(this.createErrorHandler("Error getting Repository Group Member with id: " + id + "!"));
    }


    public createRepositoryGroupMember(member : RepositoryGroupMember) : Promise<number> {
        let promise = member.groupName ? Promise.resolve(member.groupName): this.selectGroupName();

        return promise
        .then(groupName => {
            if(!groupName)
                return -1;

            member.groupName = groupName;

            return this.internalCreateRepositoryGroupMember(member);
        });
    }

    private selectGroupName() : Promise<string> {
        return this.dialogManager.openSelectGroupDialogAsPromise()
        .catch(this.createErrorHandler("Error selecting Group!"));
    }

    private internalCreateRepositoryGroupMember(member : RepositoryGroupMember) : Promise<number> {
        return this.repositoryGroupMemberService.createMember(member)
        .then(id => {
            this.dialogManager.openSuccessDialog("Member: " + member.groupName + " created successfully!", null);
            return id;
        })
        .catch(this.createErrorHandler("Error creating Member: " + member.groupName + "!"));
    }


    public deleteRepositoryGroupMember(member : RepositoryGroupMember) : Promise<boolean> {
        return this.askForRepositoryGroupMemberDeleteAuthorization(member)
        .then(response => {
            if(!response)
                return false;

            return this.internalDeleteRepositoryGroupMember(member);
        });
    }

    private askForRepositoryGroupMemberDeleteAuthorization(member : RepositoryGroupMember) : Promise<boolean> {
        let title = "Delete Member";
        let message = "Are you sure you want to delete Member: " + member.groupName + " ?";
        let options = ["Yes", "No"];

        return this.dialogManager.openWarningDialogAsPromise(title, message, options)
        .then(result => result === "Yes")
        .catch(this.createErrorHandler("Error getting permition to delete Repository's Member: " + member.groupName + "!"));
    }

    private internalDeleteRepositoryGroupMember(member : RepositoryGroupMember) : Promise<boolean> {
        return this.repositoryGroupMemberService.deleteMember(member.id)
        .then(result => {
            if(!result)
                this.dialogManager.openErrorDialog("Member could not be deleted!", "Member: " + member.groupName + " could not be deleted! Please try again later.");
            else
                this.dialogManager.openSuccessDialog("Member: " + member.groupName + " deleted successfully!", null);

            return result;
        })
        .catch(this.createErrorHandler("Error deleting Member: " + member.groupName + "!"));
    }


    public saveRepositoryGroupMember(member : RepositoryGroupMember) : Promise<boolean> {
        return this.repositoryGroupMemberService.updateMember(member)
        .then(result => {
            if(!result)
                this.dialogManager.openWarningDialog("Member could not be saved!", "Member: " + member.groupName + " could not be saved! Please try again latter.");
            else
                this.dialogManager.openSuccessDialog("Member: " + member.groupName + " saved successfully!", null);

            return result;
        })
        .catch(this.createErrorHandler("Error saving Member: " + member.groupName + "!"));
    }


    public getAllRepositoryUsersMembers() : Promise<RepositoryUserMember[]> {
        return this.repositoryUserMemberService.getAllMembers()
        .catch(this.createErrorHandler("Error getting all Repositories Users Members!"));
    }


    public getUsersMembersOfRepository(repositoryName : string) : Promise<RepositoryUserMember[]> {
        return this.repositoryUserMemberService.getMembersOfRepository(repositoryName)
        .catch(this.createErrorHandler("Error getting Users Members of Repository: " + repositoryName + "!"));
    }


    public getUserMembersWithUser(userName : string) : Promise<RepositoryUserMember[]> {
        return this.repositoryUserMemberService.getMembersWithUser(userName)
        .catch(this.createErrorHandler("Error getting Repositories Members with User: " + userName + "!"));
    }


    public getRepositoryUserMember(id : number) : Promise<RepositoryUserMember> {
        return this.repositoryUserMemberService.getMember(id)
        .then(member => {
            if(!member)
                this.dialogManager.openErrorDialog("There is no Repository Member with id: " + id + "!", null);

            return member;
        })
        .catch(this.createErrorHandler("Error getting Repository User Member with id: " + id + "!"));
    }


    public createRepositoryUserMember(member : RepositoryUserMember) : Promise<number> {
        let promise = member.userName ? Promise.resolve(member.userName) : this.selectUserName();

        return promise
        .then(userName => {
            if(!userName)
                return -1;

            member.userName = userName;

            return this.internalCreateRepositoryUserMember(member);
        });
    }

    private internalCreateRepositoryUserMember(member : RepositoryUserMember) : Promise<number> {
        return this.repositoryUserMemberService.createMember(member)
        .then(id => {
            this.dialogManager.openSuccessDialog("Member: " + member.userName + " created successfully!", null);
            return id;
        })
        .catch(this.createErrorHandler("Error creating member: " + member.userName + "!"));
    }


    public deleteRepositoryUserMember(member : RepositoryUserMember) : Promise<boolean> {
        return this.askForRepositoryUserMemberDeleteAuthorization(member)
        .then(response => {
            if(!response)
                return false;

            return this.internalDeleteRepositoryUserMember(member);
        });
    }

    private askForRepositoryUserMemberDeleteAuthorization(member : RepositoryUserMember) : Promise<boolean> {
        let title = "Delete Member";
        let message = "Are you sure you want to delete Member: " + member.userName + " ?";
        let options = ["Yes", "No"];

        return this.dialogManager.openWarningDialogAsPromise(title, message, options)
        .then(result => result === "Yes")
        .catch(this.createErrorHandler("Error getting permition to delete Repository's Member: " + member.userName + "!"));
    }

    private internalDeleteRepositoryUserMember(member : RepositoryUserMember) : Promise<boolean> {
        return this.repositoryUserMemberService.deleteMember(member.id)
        .then(result => {
            if(!result)
                this.dialogManager.openErrorDialog("Member could not be deleted!", "Member: " + member.userName + " could not be deleted! Please try again later.");
            else
                this.dialogManager.openSuccessDialog("Member: " + member.userName + " deleted successfully!", null);

            return result;
        })
        .catch(this.createErrorHandler("Error deleting Member: " + member.userName + "!"));
    }


    public saveRepositoryUserMember(member : RepositoryUserMember) : Promise<boolean> {
        return this.repositoryUserMemberService.updateMember(member)
        .then(result => {
            if(!result)
                this.dialogManager.openWarningDialog("Member could not be saved!", "Member: " + member.userName + " could not be saved! Please try again latter.");
            else
                this.dialogManager.openSuccessDialog("Member: " + member.userName + " saved successfully!", null);

            return result;
        })
        .catch(this.createErrorHandler("Error saving Member: " + member.userName + "!"));
    }


    public getToolsNames(repository : Repository) : Promise<string[]> {
        return this.getConfigForRepository(repository.repositoryName)
        .then(config => {
            if(config)
               return this.toolsRepositoryFacadeService.getToolsNames(config)
               .catch(this.createErrorHandler("Error getting Tools names of Repository: " + repository.repositoryName + "!"));
        });
    }


    public getAllTools(repository : Repository) : Promise<Tool[]> {
        return this.getConfigForRepository(repository.repositoryName)
        .then(config => {
            if(config)
               return this.toolsRepositoryFacadeService.getTools(config)
               .catch(this.createErrorHandler("Error getting Tools of Repository: " + repository.repositoryName + "!"));
        });
    }


    public getTool(repository : Repository, toolName : string) : Promise<Tool> {
        return this.getConfigForRepository(repository.repositoryName)
        .then(config => {
            if(config)
               return this.toolsRepositoryFacadeService.getTool(config, toolName)
               .then(tool => {
                   if(!tool)
                       this.dialogManager.openErrorDialog("There is no Tool: " + toolName + "!", null);

                   return tool;
               })
               .catch(this.createErrorHandler("Error getting Tool: " + toolName + " of Repository: " + repository.repositoryName + "!"));
        });
    }


    public createTool(repository : Repository, tool : Tool) : Promise<string> {
        let namePromise = tool.name ? Promise.resolve(tool.name) : this.getNewToolName(repository);

        return namePromise
        .then(name => {
            if(!name)
                return null;

            tool.name = name;

            return this.getConfigForRepository(repository.repositoryName)
            .then(config => {
                if(!config)
                    return null;

                return this.internalCreateTool(config, tool);
            });
        });
    }

    private getNewToolName(repository : Repository) : Promise<string> {
        return this.dialogManager.openNewToolNameDialogAsPromise(repository.repositoryName)
        .catch(this.createErrorHandler("Error getting new Tool's name!"));
    }

    private internalCreateTool(repositoryConfig : RepositoryConfig, tool : Tool) : Promise<string> {
        return this.toolsRepositoryFacadeService.createTool(repositoryConfig, tool)
        .then(result => {
            this.dialogManager.openSuccessDialog("Tool: " + tool.name + " created successfully!", null);
            return result;
        })
        .catch(this.createErrorHandler("Error creating Tool: " +  tool.name + "!"));
    }


    public updateTool(repository : Repository, tool : Tool) : Promise<boolean> {
        return this.getConfigForRepository(repository.repositoryName)
        .then(config => {
            if(!config)
                return false;

            return this.toolsRepositoryFacadeService.updateTool(config, tool)
            .then(result => {
                if(!result)
                    this.dialogManager.openWarningDialog("Tool could not be saved!", "Tool: " +  tool.name + " could not be saved! Please try again latter.");
                else
                    this.dialogManager.openSuccessDialog("Tool: " +  tool.name + " saved successfully!", null);

                return result;
            })
            .catch(this.createErrorHandler("Error saving Tool: " +  tool.name + "!"));
        });
    }


    public deleteTool(repository : Repository, tool : Tool) : Promise<boolean> {
        return this.getConfigForRepository(repository.repositoryName)
        .then(config => {
            if(!config)
                return false;

            return this.askForToolDeleteAuthorization(tool)
            .then(response => {
                if(!response)
                    return false;

                return this.internalDeleteTool(config, tool);
            });
        });
    }

    private askForToolDeleteAuthorization(tool : Tool) : Promise<boolean> {
        let title = "Delete Tool";
        let message = "Are you sure you want to delete Tool: " + tool.name + " ?";
        let options = ["Yes", "No"];

        return this.dialogManager.openWarningDialogAsPromise(title, message, options)
        .then(result => result === "Yes")
        .catch(this.createErrorHandler("Error getting permition to delete Tool: " + tool.name + "!"));
    }

    private internalDeleteTool(repositoryConfig : RepositoryConfig, tool : Tool) : Promise<boolean> {
        return this.toolsRepositoryFacadeService.deleteTool(repositoryConfig, tool.name)
        .then(result => {
            if(!result)
                this.dialogManager.openErrorDialog("Tool could not be deleted!", "Tool: " +  tool.name + " could not be deleted! Please try again later.");
            else
                this.dialogManager.openSuccessDialog("Tool: " +  tool.name + " deleted successfully!", null);

            return result;
        })
        .catch(this.createErrorHandler("Error deleting Tool: " +  tool.name + "!"));
    }


    public cloneTools(fromRepositoryName : string, toRepositoryName : string) : Promise<boolean> {
        let fromRepositoryNamePromise = fromRepositoryName ? Promise.resolve(fromRepositoryName) : this.selectRepositoryName();

        return fromRepositoryNamePromise
        .then(repositoryName => {
            if(!repositoryName)
                return Promise.resolve(false);

            fromRepositoryName = repositoryName;

            return this.selectToolsFromRepository(fromRepositoryName)
            .then(toolsNames => {
                if(!toolsNames)
                    return Promise.resolve(false);

                return this.internalCloneTools(fromRepositoryName, toolsNames, toRepositoryName);
            });
        });
    }

    private selectToolsFromRepository(repositoryName : string) : Promise<string[]> {
        return this.dialogManager.openSelectToolsFromRepositoryDialogAsPromise(repositoryName)
        .catch(this.createErrorHandler("Error selecting tools from Repository: " + repositoryName + "!"));
    }

    private internalCloneTools(fromRepositoryName: string, toolsNames: string[], toRepositoryName: string) : Promise<boolean> {
        return this.getConfigForRepository(fromRepositoryName)
        .then(fromRepositoryConfig => {
            return this.getConfigForRepository(toRepositoryName)
            .then(toRepositoryConfig => {
                let promisesData = [];

                toolsNames.forEach(toolName => {
                    let data = {
                        toolName : toolName,
                        promise : null,
                        resolve : null,
                        reject : null
                    };

                    data.promise = new Promise((resolve, reject) => {
                        data.resolve = resolve;
                        data.reject = reject;
                    });

                    promisesData.push(data);
                });

                let clones = [];

                promisesData.forEach(promiseData => {
                    clones.push({
                        repositoryName: fromRepositoryName,
                        toolName: promiseData.toolName,
                        promise: promiseData.promise
                    });
                });

                let tasks = promisesData.map(promiseData => {
                    return () => {
                        return this.cloneTool(fromRepositoryConfig, promiseData.toolName, toRepositoryConfig)
                        .then(result => promiseData.resolve(result))
                        .catch(error => promiseData.reject(error));
                    };
                });

                tasks.reduce((promiseChain, currentTask) => {
                    return promiseChain
                    .then(() => currentTask())
                    .catch(() => currentTask());
                }, Promise.resolve([]));

                return this.dialogManager.openCloneToolsDialogAsPromise(clones);
            });
        });
    }

    private cloneTool(fromRepositoryConfig: RepositoryConfig, toolName: string, toRepositoryConfig: RepositoryConfig) : Promise<boolean> {
        let repository = new Repository(fromRepositoryConfig.repositoryName, null, null, null, null, null, null, null);

        return this.getTool(repository, toolName)
        .then(tool => {
            repository.repositoryName = toRepositoryConfig.repositoryName;

            return this.createTool(repository, tool)
            .then(() => true);
        });
    }


    public getPipelinesNames(repository : Repository) : Promise<string[]> {
        return this.getConfigForRepository(repository.repositoryName)
        .then(config => {
            if(config)
               return this.pipelinesRepositoryFacadeService.getPipelinesNames(config)
               .catch(this.createErrorHandler("Error getting Pipelines names of Repository: " + repository.repositoryName + "!"));
        });
    }


    public getAllPipelines(repository : Repository) : Promise<Pipeline[]> {
        return this.getConfigForRepository(repository.repositoryName)
        .then(config => {
            if(config)
               return this.pipelinesRepositoryFacadeService.getPipelines(config)
               .catch(this.createErrorHandler("Error getting Pipelines of Repository: " + repository.repositoryName + "!"));
        });
    }


    public getPipeline(repository : Repository, pipelineName : string) : Promise<Pipeline> {
        return this.getConfigForRepository(repository.repositoryName)
        .then(config => {
            if(config)
               return this.pipelinesRepositoryFacadeService.getPipeline(config, pipelineName)
               .then(pipeline => {
                   if(!pipeline)
                       this.dialogManager.openErrorDialog("There is no Pipeline: " + pipelineName + "!", null);

                   return pipeline;
               })
               .catch(this.createErrorHandler("Error getting Pipeline: " + pipelineName + " of Repository: " + repository.repositoryName + "!"));
        });
    }


    public createPipeline(repository : Repository, pipeline : Pipeline) : Promise<string> {
        let namePromise = pipeline.name ? Promise.resolve(pipeline.name) : this.getNewPipelineName(repository);

        return namePromise
        .then(name => {
            if(!name)
                return null;

            pipeline.name = name;

            return this.getConfigForRepository(repository.repositoryName)
            .then(config => {
                if(!config)
                    return null;

                return this.internalCreatePipeline(config, pipeline);
            });
        });
    }

    private getNewPipelineName(repository : Repository) : Promise<string> {
        return this.dialogManager.openNewPipelineNameDialogAsPromise(repository.repositoryName)
        .catch(this.createErrorHandler("Error getting new Pipeline's name!"));
    }

    private internalCreatePipeline(repositoryConfig : RepositoryConfig, pipeline : Pipeline) : Promise<string> {
        return this.pipelinesRepositoryFacadeService.createPipeline(repositoryConfig, pipeline)
        .then(result => {
            this.dialogManager.openSuccessDialog("Pipeline: " +  pipeline.name + " created successfully!", null);
            return result;
        })
        .catch(this.createErrorHandler("Error creating Pipeline: " +  pipeline.name + "!"));
    }


    public updatePipeline(repository : Repository, pipeline : Pipeline) : Promise<boolean> {
        return this.getConfigForRepository(repository.repositoryName)
        .then(config => {
            if(!config)
                return false;

            return this.pipelinesRepositoryFacadeService.updatePipeline(config, pipeline)
            .then(result => {
                if(!result)
                    this.dialogManager.openWarningDialog("Pipeline could not be saved!", "Pipeline: " +  pipeline.name + " could not be saved! Please try again latter.");
                else
                    this.dialogManager.openSuccessDialog("Pipeline: " +  pipeline.name + " saved successfully!", null);

                return result;
            })
            .catch(this.createErrorHandler("Error saving Pipeline: " +  pipeline.name + "!"));
        });
    }


    public deletePipeline(repository : Repository, pipeline : Pipeline) : Promise<boolean> {
        return this.getConfigForRepository(repository.repositoryName)
        .then(config => {
            if(!config)
                return false;

            return this.askForPipelineDeleteAuthorization(pipeline)
            .then(response => {
                if(!response)
                    return false;

                return this.internalDeletePipeline(config, pipeline);
            });
        });
    }

    private askForPipelineDeleteAuthorization(pipeline : Pipeline) : Promise<boolean> {
        let title = "Delete Pipeline";
        let message = "Are you sure you want to delete Pipeline: " + pipeline.name + " ?";
        let options = ["Yes", "No"];

        return this.dialogManager.openWarningDialogAsPromise(title, message, options)
        .then(result => result === "Yes")
        .catch(this.createErrorHandler("Error getting permition to delete Pipeline: " + pipeline.name + "!"));
    }

    private internalDeletePipeline(repositoryConfig : RepositoryConfig, pipeline : Pipeline) : Promise<boolean> {
        return this.pipelinesRepositoryFacadeService.deletePipeline(repositoryConfig, pipeline.name)
        .then(result => {
            if(!result)
                this.dialogManager.openErrorDialog("Pipeline could not be deleted!", "Pipeline: " +  pipeline.name + " could not be deleted! Please try again later.");
            else
                this.dialogManager.openSuccessDialog("Pipeline: " +  pipeline.name + " deleted successfully!", null);

            return result;
        })
        .catch(this.createErrorHandler("Error deleting Pipeline: " +  pipeline.name + "!"));
    }


    public clonePipelines(fromRepositoryName : string, toRepositoryName : string) : Promise<boolean> {
        let fromRepositoryNamePromise = fromRepositoryName ? Promise.resolve(fromRepositoryName) : this.selectRepositoryName();

        return fromRepositoryNamePromise
        .then(repositoryName => {
            if(!repositoryName)
                return Promise.resolve(false);

            fromRepositoryName = repositoryName;

            return this.selectPipelinesFromRepository(fromRepositoryName)
            .then(pipelinesNames => {
                if(!pipelinesNames)
                    return Promise.resolve(false);

                return this.internalClonePipelines(fromRepositoryName, pipelinesNames, toRepositoryName);
            });
        });
    }

    private selectPipelinesFromRepository(repositoryName : string) : Promise<string[]> {
        return this.dialogManager.openSelectPipelinesFromRepositoryDialogAsPromise(repositoryName)
        .catch(this.createErrorHandler("Error selecting pipelines from Repository: " + repositoryName + "!"));
    }

    private internalClonePipelines(fromRepositoryName: string, pipelinesNames: string[], toRepositoryName: string) : Promise<boolean> {
        return this.getConfigForRepository(fromRepositoryName)
        .then(fromRepositoryConfig => {
            return this.getConfigForRepository(toRepositoryName)
            .then(toRepositoryConfig => {
                let promisesData = [];

                pipelinesNames.forEach(pipelineName => {
                    let data = {
                        pipelineName : pipelineName,
                        promise : null,
                        resolve : null,
                        reject : null
                    };

                    data.promise = new Promise((resolve, reject) => {
                        data.resolve = resolve;
                        data.reject = reject;
                    });

                    promisesData.push(data);
                });

                let clones = [];

                promisesData.forEach(promiseData => {
                    clones.push({
                        repositoryName: fromRepositoryName,
                        pipelineName: promiseData.pipelineName,
                        promise: promiseData.promise
                    });
                });

                let tasks = promisesData.map(promiseData => {
                    return () => {
                        return this.clonePipeline(fromRepositoryConfig, promiseData.pipelineName, toRepositoryConfig)
                        .then(result => promiseData.resolve(result))
                        .catch(error => promiseData.reject(error));
                    };
                });

                tasks.reduce((promiseChain, currentTask) => {
                    return promiseChain
                    .then(() => currentTask())
                    .catch(() => currentTask());
                }, Promise.resolve([]));

                return this.dialogManager.openClonePipelinesDialogAsPromise(clones);
            });
        });
    }

    private clonePipeline(fromRepositoryConfig: RepositoryConfig, pipelineName: string, toRepositoryConfig: RepositoryConfig) : Promise<boolean> {
        let repository = new Repository(fromRepositoryConfig.repositoryName, null, null, null, null, null, null, null);

        return this.getPipeline(repository, pipelineName)
        .then(pipeline => {
            repository.repositoryName = toRepositoryConfig.repositoryName;

            return this.createPipeline(repository, pipeline)
            .then(() => true);
        });
    }


    public uploadTool(file : any, repositoryName : string) : Promise<boolean> {
        return this.importExportService.importTool(file)
        .then(tool => {
            let repository = new Repository(repositoryName, null, null, null, null, null, null, null);
           return this.updateTool(repository, tool)
           .catch(this.createErrorHandler("Error uploading Tool to repository: " + repositoryName + " !"));
       })
       .catch(this.createErrorHandler("Error importing Tool to Repository:" + repositoryName + "!"));
    }


    public uploadToolsRepository(file : any, repositoryName : string) : Promise<boolean> {
        return this.importExportService.importTools(file)
        .then(tools => {
            let repository = new Repository(repositoryName, null, null, null, null, null, null, null);

            let promisesData = [];

            tools.forEach(tool => {
                let data = {
                    tool : tool,
                    promise : null,
                    resolve : null,
                    reject : null
                };

                data.promise = new Promise((resolve, reject) => {
                    data.resolve = resolve;
                    data.reject = reject;
                });

                promisesData.push(data);
            });

            let uploads = [];

            promisesData.forEach(promiseData => {
                uploads.push({
                    repositoryName: repository.repositoryName,
                    toolName: promiseData.tool.name,
                    promise: promiseData.promise
                });
            });

            let tasks = promisesData.map(promiseData => {
                return () => {
                    return this.createTool(repository, promiseData.tool)
                    .then(result => promiseData.resolve(result))
                    .catch(error => promiseData.reject(error));
                };
            });

            tasks.reduce((promiseChain, currentTask) => {
                return promiseChain
                .then(() => currentTask())
                .catch(() => currentTask());
            }, Promise.resolve([]));

            return this.dialogManager.openUploadToolsDialogAsPromise(uploads);
        })
        .catch(this.createErrorHandler("Error importing Tools to Repository:" + repositoryName + "!"));;
    }


    public uploadPipeline(file : any, repositoryName : string) : Promise<boolean> {
        return this.importExportService.importPipeline(file)
        .then(pipeline => {
            let repository = new Repository(repositoryName, null, null, null, null, null, null, null);
           return this.updatePipeline(repository, pipeline)
           .catch(this.createErrorHandler("Error uploading Pipeline to repository: " + repositoryName + " !"));
        })
        .catch(this.createErrorHandler("Error importing Pipeline to Repository:" + repositoryName + "!"));;
    }


    public uploadPipelinesRepository(file : any, repositoryName : string) : Promise<boolean> {
        return this.importExportService.importPipelines(file)
        .then(pipelines => {
            let repository = new Repository(repositoryName, null, null, null, null, null, null, null);

            let promisesData = [];

            pipelines.forEach(pipeline => {
                let data = {
                    pipeline : pipeline,
                    promise : null,
                    resolve : null,
                    reject : null
                };

                data.promise = new Promise((resolve, reject) => {
                    data.resolve = resolve;
                    data.reject = reject;
                });

                promisesData.push(data);
            });

            let uploads = [];

            promisesData.forEach(promiseData => {
                uploads.push({
                    repositoryName: repository.repositoryName,
                    pipelineName: promiseData.pipeline.name,
                    promise: promiseData.promise
                });
            });

            let tasks = promisesData.map(promiseData => {
                return () => {
                    return this.createPipeline(repository, promiseData.pipeline)
                    .then(result => promiseData.resolve(result))
                    .catch(error => promiseData.reject(error));
                };
            });

            tasks.reduce((promiseChain, currentTask) => {
                return promiseChain
                .then(() => currentTask())
                .catch(() => currentTask());
            }, Promise.resolve([]));

            return this.dialogManager.openUploadPipelinesDialogAsPromise(uploads);
        })
        .catch(this.createErrorHandler("Error importing Pipelines to Repository:" + repositoryName + "!"));;
    }


    public downloadTool(repositoryName : string, toolName : string) : Promise<boolean> {
        let repository = new Repository(repositoryName, null, null, null, null, null, null, null);
        return this.getTool(repository, toolName)
        .then(tool => {
            return this.selectToolFormat()
            .then(format => {
                if(!format)
                    return Promise.resolve(false);

                return this.importExportService.exportTool(tool, format, toolName)
                .catch(this.createErrorHandler("Error downloading Tool: " + toolName + " from repository: " + repositoryName + " !"));;
            });
        });
    }

    private selectToolFormat() : Promise<ToolFormat> {
        return this.dialogManager.openSelectToolFormatDialogAsPromise()
        .catch(this.createErrorHandler("Error selecting Tool Format!"));
    }


    public downloadToolsRepository(repositoryName : string) : Promise<boolean> {
        let repository = new Repository(repositoryName, null, null, null, null, null, null, null);

        return this.selectToolsFromRepository(repositoryName)
        .then(toolsNames => {
            if(!toolsNames)
                return Promise.resolve(false);

            return this.selectToolFormat()
            .then(format => {
                if(!format)
                    return Promise.resolve(false);

                    let promises = [];
                    toolsNames.forEach(toolName => promises.push(this.getTool(repository, toolName)));

                    return Promise.all(promises)
                    .then(tools => {
                       return this.importExportService.exportTools(tools, format, repositoryName)
                       .catch(this.createErrorHandler("Error downloading Tools from repository: " + repositoryName + " !"));;
                    });
            });
        });
    }


    public downloadPipeline(repositoryName : string, pipelineName : string) : Promise<boolean> {
        let repository = new Repository(repositoryName, null, null, null, null, null, null, null);
        return this.getPipeline(repository, pipelineName)
        .then(pipeline => {
            return this.selectPipelineFormat()
            .then(format => {
                if(!format)
                    return Promise.resolve(false);

                return this.importExportService.exportPipeline(pipeline, format, pipelineName)
                .catch(this.createErrorHandler("Error downloading Pipeline: " + pipelineName + " from Repository: " + repositoryName + " !"));;
            });
        });
    }

    private selectPipelineFormat() : Promise<PipelineFormat> {
        return this.dialogManager.openSelectPipelineFormatDialogAsPromise()
        .catch(this.createErrorHandler("Error selecting Pipeline Format!"));
    }


    public downloadPipelinesRepository(repositoryName : string) : Promise<boolean> {
        let repository = new Repository(repositoryName, null, null, null, null, null, null, null);

        return this.selectPipelinesFromRepository(repositoryName)
        .then(pipelinesNames => {
            if(!pipelinesNames)
                return Promise.resolve(false);

            return this.selectPipelineFormat()
            .then(format => {
                if(!format)
                    return Promise.resolve(false);

                    let promises = [];
                    pipelinesNames.forEach(pipelineName => promises.push(this.getPipeline(repository, pipelineName)));

                    return Promise.all(promises)
                    .then(pipelines => {
                       return this.importExportService.exportPipelines(pipelines, format, repositoryName)
                       .catch(this.createErrorHandler("Error downloading Pipelines from Repository: " + repositoryName + " !"));
                    });
            });
        });
    }

}
