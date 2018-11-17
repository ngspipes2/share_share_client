import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupMembersModule } from './group-members/group-members.module';
import { GroupProfileModule } from './group-profile/group-profile.module';

import { GroupComponent } from './group.component';

@NgModule({
    imports: [
        CommonModule,
        GroupMembersModule,
        GroupProfileModule
    ],
    declarations: [
        GroupComponent
    ],
    exports: [
        GroupComponent
    ]
})
export class GroupModule { }
