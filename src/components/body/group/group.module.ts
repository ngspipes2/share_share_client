import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../app/material.module';

import { UtilsModule } from '../../utils/utils.module';

import { GroupMembersModule } from './group-members/group-members.module';
import { GroupProfileModule } from './group-profile/group-profile.module';

import { GroupComponent } from './group.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        GroupMembersModule,
        GroupProfileModule,
        UtilsModule
    ],
    declarations: [
        GroupComponent
    ],
    exports: [
        GroupComponent
    ]
})
export class GroupModule { }
