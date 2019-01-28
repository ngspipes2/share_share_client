import { Component, Input, OnChanges, ViewChild } from '@angular/core';

import { LoadImageComponent } from '../load-image/load-image.component';

@Component({
    selector: 'app-raw-image',
    templateUrl: './raw-image.component.html',
    styleUrls: ['./raw-image.component.scss']
})
export class RawImageComponent implements OnChanges {

    @ViewChild("loadImage")
    loadImage : LoadImageComponent;

    @Input()
    circular : boolean = true;
    @Input()
    icon : string = '';

    @Input()
    imageData : any[];



    constructor() {}



    ngOnChanges() {
        this.loadImage.update();
    }

    getImage() : Promise<any> {
        return Promise.resolve(this.imageData);
    }

}
