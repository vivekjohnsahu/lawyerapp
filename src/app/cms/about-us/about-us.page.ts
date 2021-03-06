import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../globalServices/global.service'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {
  about_us: any;

  constructor(
    public globalService:GlobalService,
    public spinner:NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.spinner.show();
    let key = {
      "apikey":this.globalService.APIKey
    }
    this.globalService.about_us(key)
    .then(async data => {
      this.spinner.hide();
      this.about_us = data
      this.about_us = this.about_us.data.description
    })
  }

}
