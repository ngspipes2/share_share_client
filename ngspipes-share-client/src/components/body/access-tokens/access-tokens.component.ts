import { Component } from '@angular/core';

@Component({
  selector: 'app-access-tokens',
  templateUrl: './access-tokens.component.html',
  styleUrls: ['./access-tokens.component.scss']
})
export class AccessTokensComponent {

    selectedTokenId : number;



    constructor() { }



    selectToken(selectedTokenId : number) {
        this.selectedTokenId = selectedTokenId;
    }

}
