import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { GroupService } from '../../../services/group.service';

import { LoadImageComponent } from '../load-image/load-image.component';

@Component({
    selector: 'app-group-image',
    templateUrl: './group-image.component.html',
    styleUrls: ['./group-image.component.scss']
})
export class GroupImageComponent implements OnInit, OnDestroy {

    @ViewChild("loadImage")
    loadImage : LoadImageComponent;

    @Input()
    groupName : string;
    @Input()
    spinnerDiameter : number = 100;
    @Input()
    spinnerColor : string = "accent";
    @Input()
    circular : boolean = true;

    groupSubscription : any;



    constructor(private groupService : GroupService) { }



    ngOnInit() {
        this.groupSubscription = this.groupService.groupEvent.subscribe((groupName) => {
            if(groupName === this.groupName)
                this.loadImage.update();
        });
    }

    ngOnDestroy() {
        this.groupSubscription.unsubscribe();
    }

    getImage() : Promise<any> {
        return this.groupService.getGroupImage(this.groupName);
    }

}
