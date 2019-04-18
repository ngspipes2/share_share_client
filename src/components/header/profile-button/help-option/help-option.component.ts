import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-help-option',
  templateUrl: './help-option.component.html',
  styleUrls: ['./help-option.component.scss']
})
export class HelpOptionComponent {

  constructor(private router : Router) { }



  helpClick() {
    this.router.navigate(["/help"]);
  }

}
