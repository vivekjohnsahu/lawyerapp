import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../globalServices/global.service'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {
  Term_condition: any;

  constructor( 
    public globalService:GlobalService,
    public spinner:NgxSpinnerService,
    ) { }
  
    ngOnInit() {
      this.spinner.show();
      let key = {
        "apikey":this.globalService.APIKey
      }
      this.globalService.Term_condition(key)
      .then(async data => {
        this.spinner.hide();
        this.Term_condition = data
        this.Term_condition =  this.Term_condition.data.description
      })
    }
}
