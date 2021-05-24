import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../globalServices/global.service'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-enquiry',
  templateUrl: './view-enquiry.page.html',
  styleUrls: ['./view-enquiry.page.scss'],
})
export class ViewEnquiryPage implements OnInit {

	enquiry ={}
	param: any;
	user_enquiry:any;

	constructor(
		private routers : ActivatedRoute,
		public globalService:GlobalService,
		public spinner:NgxSpinnerService,
	) { 
		this.param = this.routers.snapshot.params["id"];
  	}

	ngOnInit() {
		this.single_enquiry()
	}

	single_enquiry(){
		this.spinner.show()
		let enquiry_data = {
			'apikey':this.globalService.APIKey,
			"id":this.param
		}
		this.globalService.single_enquiry(enquiry_data)
		.then(data =>{
			this.spinner.hide()
			this.user_enquiry = new Array;
			this.user_enquiry.push(data)
			this.user_enquiry = this.user_enquiry[0].data[0];
			this.enquiry = {
				no:this.user_enquiry.enquiry_no.trim(),
				email:this.user_enquiry.email,
				fname:this.user_enquiry.name,
				lname:this.user_enquiry.lawyer_name,
				date:this.user_enquiry.en_date,
				time:this.user_enquiry.en_time,
				remarks:this.user_enquiry.remarks
			}
		})
	}

}
