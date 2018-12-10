import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-load-element',
    templateUrl: './load-element.component.html',
    styleUrls: ['./load-element.component.scss']
})
export class LoadElementComponent {

    @Input()
    spinnerDiameter : number = 100;
    @Input()
    spinnerColor : string = "accent";
    @Input()
    loader : () => Promise<any>;

    loading : boolean;



    constructor() { }



    public load() {
        this.loading = true;

        this.loader()
        .then(() => this.loading = false)
        .catch(() => this.loading = false);
    }

}
