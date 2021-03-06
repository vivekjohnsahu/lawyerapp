import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../globalServices/global.service'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-manage-enquiry',
  templateUrl: './manage-enquiry.page.html',
  styleUrls: ['./manage-enquiry.page.scss'],
})
export class ManageEnquiryPage implements OnInit {
	user_enquiry: any;
  no_data=2;
  constructor(
    private router: Router,
    public globalService:GlobalService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit() {
    this.get_enquiry()
  }

  get_enquiry(){
	this.spinner.show();
	var user = JSON.parse(localStorage.getItem('details_user'));
	let pass_data = {
		"apikey":this.globalService.APIKey,
		"law_firm_id":user[0].id,
	}
    this.globalService.get_enquiry(pass_data)
    .then(data=> {
      this.spinner.hide();
      this.user_enquiry = new Array;
      this.user_enquiry.push(data)
      this.user_enquiry = this.user_enquiry[0].data;
      this.no_data=2
      if(this.user_enquiry==null){
          this.no_data=1
      }
    })
  }

  view_enquiry(id){
    this.router.navigateByUrl('/view-enquiry'+'/'+id)
  }
  
}
