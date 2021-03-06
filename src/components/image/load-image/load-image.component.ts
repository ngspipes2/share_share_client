import { Component, Input, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-load-image',
    templateUrl: './load-image.component.html',
    styleUrls: ['./load-image.component.scss']
})
export class LoadImageComponent implements OnInit, OnDestroy {

    @Input()
    imageSupplier : () => Promise<any>;
    @Input()
    spinnerDiameter : number = 100;
    @Input()
    spinnerColor : string = "accent";
    @Input()
    icon : string;
    @Input()
    svgIcon : string;
    @Input()
    circular : boolean;

    imageData : any;
    inited : boolean = false;
    loadEvent : Subject<any> = new Subject<any>();

    observer: IntersectionObserver;



    constructor(private element : ElementRef) { }



    ngOnInit() {
        this.observer = new IntersectionObserver(this.handleIntersect.bind(this));
        this.observer.observe(this.element.nativeElement);
    }

    ngOnDestroy() {
        this.observer.disconnect();
    }

    /*LAZY LOAD*/
    handleIntersect(entries, observer) : void {
        entries.forEach((entry: IntersectionObserverEntry) => {
            if (entry.isIntersecting && !this.inited) {
                this.inited = true;
                this.loadEvent.next();
            }
        });
    }

    load() : Promise<any> {
        return this.imageSupplier()
        .then(image => {
            this.imageData = image;
        })
        .catch(error => {
            console.error(error);
            this.imageData = undefined;
        });
    }

    public update() {
        if(this.inited)
            this.loadEvent.next();
    }

}
