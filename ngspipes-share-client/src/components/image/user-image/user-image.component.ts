import { Component, Input, OnInit, OnChanges, OnDestroy, ViewChild } from '@angular/core';

import { UserService } from '../../../services/user.service';

import { LoadImageComponent } from '../load-image/load-image.component';

@Component({
    selector: 'app-user-image',
    templateUrl: './user-image.component.html',
    styleUrls: ['./user-image.component.scss']
})
export class UserImageComponent implements OnInit, OnChanges, OnDestroy {

    @ViewChild("loadImage")
    loadImage : LoadImageComponent;

    @Input()
    userName : string;
    @Input()
    spinnerDiameter : number = 100;
    @Input()
    spinnerColor : string = "accent";
    @Input()
    circular : boolean = true;

    userSubscription : any;



    constructor(private userService : UserService) {}



    ngOnInit(): void {
        this.userSubscription = this.userService.userEvent.subscribe((userName) => {
            if(userName === this.userName)
                this.loadImage.update();
        });
    }

    ngOnChanges() {
        this.loadImage.update();
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    getImage() : Promise<any> {
        return this.userService.getUserImage(this.userName);
    }

}
