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

import { ToolsRepositoryFacadeService } from '../services/tools-repository-facade.service';
import { PipelinesRepositoryFacadeService } from '../services/pipelines-repository-facade.service';

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
        public dialogManager : DialogManager,
        public sessionService : SessionService,
        private router : Router
    ) { }



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
        return new Promise<string>((resolve, reject) => {
            this.dialogManager.openSelectRepositoryDialog().afterClosed().subscribe(repositoryName => {
                resolve(repositoryName);
            });
        });
    }

    private createConfig(config : RepositoryConfig) : Promise<boolean> {
        return this.repositoryConfigService.createConfig(config)
        .then(result => {
            if(!result)
                this.dialogManager.openErrorDialog("Repository Config not created!", "Repository Config could not be created! Please try again latter.");
            else
                this.dialogManager.openSuccessDialog("Repository Config created successfully!", null);

            return result;
        })
        .catch(error => {
            this.dialogManager.openErrorDialog("Error creating Repository Config!", error);
            console.error(error);
            throw error;
        });
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

        return new Promise<boolean>((resolve, reject) => {
            this.dialogManager.openWarningDialog(title, message, options).afterClosed().subscribe(response => {
                resolve(response === "Yes");
            });
        });
    }

    private internalDeleteRepositoryConfig(config : RepositoryConfig) : Promise<boolean> {
        return this.repositoryConfigService.deleteConfig(config.repositoryName)
        .then(result => {
            if(!result)
                this.dialogManager.openErrorDialog("Repository Config not deleted!", "Repository Config could not be deleted! Please try again latter.");
            else
                this.dialogManager.openSuccessDialog("Repository Config deleted successfully!", null);

            return result;
        })
        .catch(error => {
            this.dialogManager.openErrorDialog("Error deleting Repository Config!", error);
            console.error(error);
            throw error;
        });
    }


    public saveRepositoryConfig(config : RepositoryConfig) : Promise<boolean> {
        return this.repositoryConfigService.updateConfig(config)
        .then(result => {
            if(!result)
                this.dialogManager.openWarningDialog("Repository Config could not be saved!", "Repository Config could not be saved! Please try again latter.");
            else
                this.dialogManager.openSuccessDialog("Repository Config saved successfully!", null);

            return result;
        })
        .catch(error => {
            this.dialogManager.openErrorDialog("Error saving Repository Config!", error);
            console.error(error);
            throw error;
        });
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
        return new Promise<string>((resolve, reject) => {
            this.dialogManager.openNewAccessTokenNameDialog().afterClosed().subscribe(name => {
                resolve(name);
            });
        });
    }

    private createToken(token : AccessToken) : Promise<NewAccessTokenData> {
        let currentUserName = this.sessionService.getCurrentCredentials()[0];
        token.ownerName = currentUserName;

        return this.accessTokenService.createAccessToken(token)
        .then(data => {
            this.dialogManager.openShowTokenDialog(data.token);
            return data;
        })
        .catch(error => {
            this.dialogManager.openErrorDialog("Error creating Access Token!", error);
            console.error(error);
            throw error;
        });
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

        return new Promise<boolean>((resolve, reject) => {
            this.dialogManager.openWarningDialog(title, message, options).afterClosed().subscribe((response) => {
                resolve(response === "Yes");
            });
        });
    }

    private internalDeleteAccessToken(token : AccessToken) : Promise<boolean> {
        return this.accessTokenService.deleteAccessToken(token.id)
        .then(result => {
            if(!result)
                this.dialogManager.openErrorDialog("Access Token not deleted!", "Access Token could not be deleted! Please try again latter.");
            else
                this.dialogManager.openSuccessDialog("Access Token deleted successfully!", null);

            return result;
        })
        .catch(error => {
            this.dialogManager.openErrorDialog("Error deleting Access Token!", error);
            console.error(error);
            throw error;
        });
    }


    public saveAccessToken(token : AccessToken) : Promise<boolean> {
        return this.accessTokenService.updateAccessToken(token)
        .then(result => {
            if(!result)
                this.dialogManager.openWarningDialog("Access Token could not be saved!", "Access Token could not be saved! Please try again latter.");
            else
                this.dialogManager.openSuccessDialog("Access Token saved successfully!", null);

            return result;
        })
        .catch(error => {
            this.dialogManager.openErrorDialog("Error saving Access Token!", error);
            console.error(error);
            throw error;
        });
    }


    public createUser(user : User, redirect: boolean = true) : Promise<string> {
        return this.userService.createUser(user)
        .then((response) => {
            if(redirect)
                this.router.navigate(["/users/" + user.userName]);

            this.dialogManager.openSuccessDialog("User created successfully!", null);

            return response;
        })
        .catch((error) => {
            this.dialogManager.openErrorDialog("Error creating new User!", error);
            console.error(error);
            throw error;
        });
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

        return new Promise<boolean>((resolve, reject) => {
            this.dialogManager.openWarningDialog(title, message, options).afterClosed().subscribe(response => {
                resolve(response === "Yes");
            });
        });
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
        .catch(error => {
            this.dialogManager.openErrorDialog("Error deleting account!", error);
            console.error(error);
            throw error;
        });
    }


    public saveUser(user : User) : Promise<boolean> {
        return this.userService.updateUser(user)
        .then(result => {
            if(!result)
                this.dialogManager.openWarningDialog("User could not be saved!", "User could not be saved! Please try again latter.");
            else
                this.dialogManager.openSuccessDialog("User saved successfully!", null);

            return result;
        })
        .catch(error => {
            this.dialogManager.openErrorDialog("Error saving User!", error);
            console.error(error);
            throw error;
        });
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
        .catch((error) => {
            this.dialogManager.openErrorDialog("Error uploading User's image!", error);
            console.error(error);
            throw error;
        });
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
        return new Promise<string>((resolve, reject) => {
            this.dialogManager.openNewGroupNameDialog().afterClosed().subscribe(name => {
                resolve(name);
            });
        });
    }

    private internalCreateGroup(group : Group, redirect : boolean) : Promise<string> {
        let currentUserName = this.sessionService.getCurrentCredentials()[0];
        group.ownerName = currentUserName;

        return this.groupService.createGroup(group)
        .then(result => {
            if(redirect)
                this.router.navigate(['/groups/' + group.groupName]);

            this.dialogManager.openSuccessDialog("Group created successfully!", null);

            return result;
        })
        .catch(error => {
            this.dialogManager.openErrorDialog("Error creating Group!", error);
            console.error(error);
            throw error;
        });
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

        return new Promise<boolean>((resolve, reject) => {
            this.dialogManager.openWarningDialog(title, message, options).afterClosed().subscribe(response => {
                resolve(response === "Yes");
            });
        });
    }

    private internalDeleteGroup(group : Group) : Promise<boolean> {
        return this.groupService.deleteGroup(group.groupName)
        .then(result => {
            if(!result)
                this.dialogManager.openErrorDialog("Group could not be deleted!", "Group could not be deleted. Please try again later.");
            else
                this.dialogManager.openSuccessDialog("Group deleted successfully!", null);

            return result;
        })
        .catch(error => {
            this.dialogManager.openErrorDialog("Error deleting Group!", error);
            console.error(error);
            throw error;
        });
    }


    public saveGroup(group : Group) : Promise<boolean> {
        return this.groupService.updateGroup(group)
        .then(result => {
            if(!result)
                this.dialogManager.openWarningDialog("Group could not be saved!", "Group could not be saved! Please try again latter.");
            else
                this.dialogManager.openSuccessDialog("Group saved successfully!", null);

            return result;
        })
        .catch(error => {
            this.dialogManager.openErrorDialog("Error saving Group!", error);
            console.error(error);
            throw error;
        });
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
        .catch((error) => {
            this.dialogManager.openErrorDialog("Error uploading Group's image!", error);
            console.error(error);
            throw error;
        });
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
        return new Promise<string>((resolve, reject) => {
            this.dialogManager.openSelectUserDialog().afterClosed().subscribe(userName => {
                resolve(userName);
            });
        });
    }

    private internalCreateGroupMember(member : GroupMember) : Promise<number> {
        return this.groupMemberService.createMember(member)
        .then(id => {
            this.dialogManager.openSuccessDialog("Member created successfully!", null);
            return id;
        })
        .catch(error => {
            this.dialogManager.openErrorDialog("Error creating member!", error);
            console.error(error);
            throw error;
        });
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

        return new Promise<boolean>((resolve, reject) => {
            this.dialogManager.openWarningDialog(title, message, options).afterClosed().subscribe(response => {
                resolve(response === "Yes");
            });
        });
    }

    private internalDeleteGroupMember(member : GroupMember) : Promise<boolean> {
        return this.groupMemberService.deleteMember(member.id)
        .then(result => {
            if(!result)
                this.dialogManager.openErrorDialog("Member could not be deleted!", "Member could not be deleted. Please try again later.");
            else
                this.dialogManager.openSuccessDialog("Member deleted successfully!", null);

            return result;
        })
        .catch(error => {
            this.dialogManager.openErrorDialog("Error deleting Member!", error);
            console.error(error);
            throw error;
        });
    }


    public saveGroupMember(member : GroupMember) : Promise<boolean> {
        return this.groupMemberService.updateMember(member)
        .then(result => {
            if(!result)
                this.dialogManager.openWarningDialog("Member could not be saved!", "Member could not be saved! Please try again latter.");
            else
                this.dialogManager.openSuccessDialog("Member saved successfully!", null);

            return result;
        })
        .catch(error => {
            this.dialogManager.openErrorDialog("Error saving Member!", error);
            console.error(error);
            throw error;
        });
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
        return new Promise<string>((resolve, reject) => {
            this.dialogManager.openNewRepositoryNameDialog().afterClosed().subscribe(name => {
                resolve(name);
            });
        });
    }

    private getRepositoryEntityType() : Promise<EntityType> {
        return new Promise<EntityType>((resolve, reject) => {
            this.dialogManager.openSelectRepositoryEntityTypeDialog().afterClosed().subscribe(type => {
                resolve(type);
            });
        });
    }

    private internalCreateRepository(repository : Repository, redirect : boolean) : Promise<string> {
        let currentUserName = this.sessionService.getCurrentCredentials()[0];
        repository.ownerName = currentUserName;

        return this.repositoryService.createRepository(repository)
        .then(result => {
            if(redirect)
                this.router.navigate(['/repositories/' + repository.repositoryName]);

            this.dialogManager.openSuccessDialog("Repository created successfully!", null);

            return result;
        })
        .catch(error => {
            this.dialogManager.openErrorDialog("Error creating Repository!", error);
            console.error(error);
            throw error;
        });
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
        return new Promise<string>((resolve, reject) => {
            this.dialogManager.openNewRepositoryLocationDialog().afterClosed().subscribe(location => {
                resolve(location);
            });
        });
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

        return new Promise<boolean>((resolve, reject) => {
            this.dialogManager.openWarningDialog(title, message, options).afterClosed().subscribe(response => {
                resolve(response === "Yes");
            });
        });
    }

    private internalDeleteRepository(repository : Repository) : Promise<boolean> {
        return this.repositoryService.deleteRepository(repository.repositoryName)
        .then(result => {
            if(!result)
                this.dialogManager.openErrorDialog("Repository could not be deleted!", "Repository could not be deleted. Please try again later.");
            else
                this.dialogManager.openSuccessDialog("Repository deleted successfully!", null);

            return result;
        })
        .catch(error => {
            this.dialogManager.openErrorDialog("Error deleting Repository!", error);
            console.error(error);
            throw error;
        });
    }


    public saveRepository(repository : Repository) : Promise<boolean> {
        return this.repositoryService.updateRepository(repository)
        .then(result => {
            if(!result)
                this.dialogManager.openWarningDialog("Repository could not be saved!", "Repository could not be saved! Please try again latter.");
            else
                this.dialogManager.openSuccessDialog("Repository saved successfully!", null);

            return result;
        })
        .catch(error => {
            this.dialogManager.openErrorDialog("Error saving Repository!", error);
            console.error(error);
            throw error;
        });
    }


    public changeRepositoryImage(repository : Repository, file : any) : Promise<boolean> {
        return this.getConfigForRepository(repository.repositoryName)
        .then(config => {
            if(!config)
                return false;

            return this.internalChangeRepositoryImage(repository, file, config);
        });
    }

    private getConfigForRepository(repositoryName : string) : Promise<RepositoryConfig> {
        return this.repositoryConfigService.getConfig(repositoryName)
        .then(config => {
            if(!config) {
                this.dialogManager.openWarningDialog("No config found!", "You have no config to access this Repository:" + repositoryName + "!");
                return null;
            }

            return config;
        })
        .catch(error => {
            this.dialogManager.openErrorDialog("Error getting config for Repository:" + repositoryName + "!", error);
            console.error(error);
            throw error;
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
        .catch((error) => {
            this.dialogManager.openErrorDialog("Error uploading Repository's image!", error);
            console.error(error);
            throw error;
        });
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
        return new Promise<string>((resolve, reject) => {
            this.dialogManager.openSelectGroupDialog().afterClosed().subscribe(groupName => {
                resolve(groupName);
            });
        });
    }

    private internalCreateRepositoryGroupMember(member : RepositoryGroupMember) : Promise<number> {
        return this.repositoryGroupMemberService.createMember(member)
        .then(id => {
            this.dialogManager.openSuccessDialog("Member created successfully!", null);
            return id;
        })
        .catch(error => {
            this.dialogManager.openErrorDialog("Error creating member!", error);
            console.error(error);
            throw error;
        });
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

        return new Promise<boolean>((resolve, reject) => {
            this.dialogManager.openWarningDialog(title, message, options).afterClosed().subscribe(response => {
                resolve(response === "Yes");
            });
        });
    }

    private internalDeleteRepositoryGroupMember(member : RepositoryGroupMember) : Promise<boolean> {
        return this.repositoryGroupMemberService.deleteMember(member.id)
        .then(result => {
            if(!result)
                this.dialogManager.openErrorDialog("Member could not be deleted!", "Member could not be deleted! Please try again later.");
            else
                this.dialogManager.openSuccessDialog("Member deleted successfully!", null);

            return result;
        })
        .catch(error => {
            this.dialogManager.openErrorDialog("Error deleting Member!", error);
            console.error(error);
            throw error;
        });
    }


    public saveRepositoryGroupMember(member : RepositoryGroupMember) : Promise<boolean> {
        return this.repositoryGroupMemberService.updateMember(member)
        .then(result => {
            if(!result)
                this.dialogManager.openWarningDialog("Member could not be saved!", "Member could not be saved! Please try again latter.");
            else
                this.dialogManager.openSuccessDialog("Member saved successfully!", null);

            return result;
        })
        .catch(error => {
            this.dialogManager.openErrorDialog("Error saving Member!", error);
            console.error(error);
            throw error;
        });
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
            this.dialogManager.openSuccessDialog("Member created successfully!", null);
            return id;
        })
        .catch(error => {
            this.dialogManager.openErrorDialog("Error creating member!", error);
            console.error(error);
            throw error;
        });
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

        return new Promise<boolean>((resolve, reject) => {
            this.dialogManager.openWarningDialog(title, message, options).afterClosed().subscribe(response => {
                resolve(response === "Yes");
            });
        });
    }

    private internalDeleteRepositoryUserMember(member : RepositoryUserMember) : Promise<boolean> {
        return this.repositoryUserMemberService.deleteMember(member.id)
        .then(result => {
            if(!result)
                this.dialogManager.openErrorDialog("Member could not be deleted!", "Member could not be deleted! Please try again later.");
            else
                this.dialogManager.openSuccessDialog("Member deleted successfully!", null);

            return result;
        })
        .catch(error => {
            this.dialogManager.openErrorDialog("Error deleting Member!", error);
            console.error(error);
            throw error;
        });
    }


    public saveRepositoryUserMember(member : RepositoryUserMember) : Promise<boolean> {
        return this.repositoryUserMemberService.updateMember(member)
        .then(result => {
            if(!result)
                this.dialogManager.openWarningDialog("Member could not be saved!", "Member could not be saved! Please try again latter.");
            else
                this.dialogManager.openSuccessDialog("Member saved successfully!", null);

            return result;
        })
        .catch(error => {
            this.dialogManager.openErrorDialog("Error saving Member!", error);
            console.error(error);
            throw error;
        });
    }

}
