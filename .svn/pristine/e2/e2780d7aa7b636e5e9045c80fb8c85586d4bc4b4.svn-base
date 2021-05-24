import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { GlobalService } from '../../globalServices/global.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertController,Events} from '@ionic/angular';

@Component({
  selector: 'app-firm-details',
  templateUrl: './firm-details.page.html',
  styleUrls: ['./firm-details.page.scss'],
})
export class FirmDetailsPage implements OnInit {

	public param:any
	lawyer_details:any
	lawyer_list: any;
	firstWords: any;
	first_skill: any;
	lawyer_skill_show: any;
	lawyer_not_found:any;
	lawyer_not_found_vl=2;
	lawyer_list_length=1;
	view_law = true;
	lawyer_limit: number = 4;

	constructor(
		private router:Router,
		private routers : ActivatedRoute,
		public globalService:GlobalService,
		public spinner:NgxSpinnerService,
		public alertCtrl: AlertController,
		public events: Events,
		) 
	{
		this.param = this.routers.snapshot.params["id"];
	}

	ngOnInit() {
		$(document).on("click", ".view_more > button", function(){
			$(".lawyer_head").toggleClass("lawyer_head_all");
		});	
		this.parsn_lawyer()
	}

	more(){
		let element=document.getElementById("hidden_para");
		element.style.display="block";
		let anchor=document.getElementById("more");
		anchor.style.display="none";
	}
	
	less(){
		let element=document.getElementById("hidden_para");
		element.style.display="none";
		let anchor=document.getElementById("more");
		anchor.style.display="inline-block";
	}

	lawyer_detail(id){
		this.events.publish('lawyer_edit', 'enquiry');
		this.router.navigateByUrl('/lawyer-detail'+'/'+id);
	}

//view all lawyers
	viewAll(){
		if(this.lawyer_limit == this.lawyer_list.length){
			this.lawyer_limit = 4;
		}else{
			this.lawyer_limit = this.lawyer_list.length;
		}
	}

//personal detail lawyer start
	parsn_lawyer(){
		this.spinner.show();
		let data ={
			"apikey":this.globalService.APIKey,
			"id":this.param
		}
		this.globalService.personal_detail(data)
		.then(async data => {
			let _status = data['ErrorCode']
			this.spinner.hide();
			if(_status=='0'){
				this.lawyer_details=data
				let lawyer_details_data = this.lawyer_details.data
				this.lawyer_details = new Array;
				this.lawyer_details.push(lawyer_details_data)
				this.lawyer_skill_show=this.lawyer_details[0].lawyer_skill.split(',')
				let lawfirm_id ={
					"apikey":this.globalService.APIKey,
					"lawfirm_id":this.param
				}
				this.globalService.firm_lawyer(lawfirm_id)
				.then(async data => {
					this.lawyer_list = data;
					if(this.lawyer_list.data.length>3){
						this.lawyer_list_length=2;
					}
					this.lawyer_not_found = data['data'] 
					let lawyer_list_data = this.lawyer_list.data
					this.lawyer_list = new Array;
					this.lawyer_list.push(lawyer_list_data)
					this.lawyer_list=this.lawyer_list[0]
					if(this.lawyer_not_found==false || this.lawyer_not_found==undefined || this.lawyer_not_found==null || this.lawyer_not_found==''){
						setTimeout(() => {
							this.lawyer_not_found_vl = 1
						}, 500);
					}
				})
			}else{
				let alert = await this.alertCtrl.create({
					message: 'Lawyer details is blank.',
					buttons: [
						{
							text: 'Cancel',
							role: 'cancel',
						},
					]
				});
				await alert.present()
			}
		})
	}
}
