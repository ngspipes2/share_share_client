import { Component, Input, ContentChild, TemplateRef } from '@angular/core';

export class Filter {
    constructor(
        public accept: (element: any, filterValue: any) => boolean,
        public filterValue: any) { }
}

export class IconFilter extends Filter {
    constructor(
        public accept: (element: any, filterValue: boolean) => boolean,
        public filterValue: boolean,
        public name: string,
        public icon: string,
        public svgIcon: string) {
            super(accept, filterValue);
        }
}

export class TextFilter extends Filter {
    constructor(
        public accept: (element: any, filterValue: string) => boolean,
        public filterValue: string,
        public filterTextPlaceholder: string) {
            super(accept, filterValue);
        }
}

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.scss']
})
export class FilterListComponent {

    @ContentChild(TemplateRef)
    templateRef: TemplateRef<any>;

    @Input()
    filters: Filter[] = [];
    @Input()
    elements: any[] = [];



    getTextFilters() : TextFilter[] {
        return this.filters
        .filter(filter => filter instanceof TextFilter)
        .map(filter => filter as TextFilter);
    }

    getIconFilters() : IconFilter[] {
        return this.filters
        .filter(filter => filter instanceof IconFilter)
        .map(filter => filter as IconFilter);
    }

    accept(element : any) : any {
        return this.filters.every(filter => filter.accept(element, filter.filterValue));
    }

}
