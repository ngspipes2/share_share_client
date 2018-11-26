import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';

export const MY_FORMATS = {
    parse: {
        dateInput: 'LLL',
    },
    display: {
        dateInput: 'LLL',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LLL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'app-date-property',
    templateUrl: './date-property.component.html',
    styleUrls: ['./date-property.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ]
})
export class DatePropertyComponent implements OnInit, OnChanges {

    @Input()
    name : string;
    @Input()
    value : Date;
    @Input()
    editable : boolean;

    @Output()
    valueChange : EventEmitter<Date> = new EventEmitter<Date>();

    _moment = moment();
    dateForm : FormControl = new FormControl(this._moment);



    constructor() { }



    ngOnInit() {
        this.dateForm.valueChanges.subscribe(() => {
            this.valueChanged();
        });
    }

    ngOnChanges() {
        let dateMoment = moment(this.value).toObject();
        this._moment.set(dateMoment);
    }

    valueChanged() {
        this.value = this._moment.toDate();
        this.valueChange.emit(this.value);
    }

}
