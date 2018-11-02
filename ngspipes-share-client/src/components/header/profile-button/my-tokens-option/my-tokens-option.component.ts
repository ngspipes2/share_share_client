import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-tokens-option',
  templateUrl: './my-tokens-option.component.html',
  styleUrls: ['./my-tokens-option.component.scss']
})
export class MyTokensOptionComponent {

  constructor(private router : Router) { }



  myTokensClick() {
      this.router.navigate(['/mytokens']);
  }

}
