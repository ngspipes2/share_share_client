import { Component, OnInit, OnDestroy } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

import { ThemeService } from '../services/theme.service';
import { DialogManager } from '../components/dialog/dialog.manager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    themeChangeSubscription : any;

    theme : string;



    constructor(private overlayContainer : OverlayContainer,
                private themeService : ThemeService,
                private dialogManager : DialogManager,
                private iconRegistry : MatIconRegistry,
                private domSanitizer : DomSanitizer) {
        this.iconRegistry.addSvgIcon(
            'ticket',
            this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/ticket.svg")
        );

        this.iconRegistry.addSvgIcon(
            'repository-config',
            this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/repository-config.svg")
        );

        this.iconRegistry.addSvgIcon(
            'repository',
            this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/repository.svg")
        );

        this.iconRegistry.addSvgIcon(
            'clipboard',
            this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/clipboard.svg")
        );

        this.iconRegistry.addSvgIcon(
            'pencil',
            this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/pencil.svg")
        );

        this.iconRegistry.addSvgIcon(
            'pencil-off',
            this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/pencil-off.svg")
        );

        this.iconRegistry.addSvgIcon(
            'sheep',
            this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/sheep.svg")
        );
    }



    ngOnInit() {
        this.themeChangeSubscription = this.themeService.themeChangeEvent.subscribe((theme) => {
            this.loadTheme();
        });

        this.loadTheme();
    }

    ngOnDestroy() {
        this.themeChangeSubscription.unsubscribe();
    }

    loadTheme() {
        this.themeService.getTheme()
            .then((theme) => {
                this.overlayContainer.getContainerElement().classList.remove(this.theme);
                this.theme = theme
                this.overlayContainer.getContainerElement().classList.add(theme)
            })
            .catch((error) => {
                console.log("Error getting theme!");
                console.error(error);
            });
    }

}
