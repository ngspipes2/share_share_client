import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileModule } from './user-profile/user-profile.module';
import { UserGroupsModule } from './user-groups/user-groups.module';
import { UserRepositoriesModule } from './user-repositories/user-repositories.module';

import { UserComponent } from './user.component';

@NgModule({
    imports: [
        CommonModule,
        UserProfileModule,
        UserGroupsModule,
        UserRepositoriesModule
    ],
    declarations: [
        UserComponent
    ],
    exports: [
        UserComponent
    ]
})
export class UserModule { }
