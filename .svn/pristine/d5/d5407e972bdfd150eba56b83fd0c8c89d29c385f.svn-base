import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../globalServices/global.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertController, Events, MenuController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-profile-user-edit',
  templateUrl: './profile-user-edit.page.html',
  styleUrls: ['./profile-user-edit.page.scss'],
})
export class ProfileUserEditPage implements OnInit {

  	param: any;
	_status: string;
	Message: any;
	lawyer_profile: any;
	lawyer_profile_data: any;
	profile_image: any;
	first_name: any;
	last_name: any;
	lawyer_skill: any;
	email: any;
	contact_number1: any;
	address_line1: any;
	text_user: any;
	lawyer_edit:any;
	lawyer_all_data: {};
	lawyer_skill_show: any;
	page_hide:boolean=false;

	constructor(
		public alertController:AlertController,
		public toastController: ToastController,
		private routers : ActivatedRoute,
		public globalService:GlobalService,
		public spinner:NgxSpinnerService,
		public alertCtrl: AlertController,
		public events: Events,
		private storage:Storage,
		private router: Router,
	) { 
		this.param = this.routers.snapshot.params["id"];
	}

	ngOnInit() {
		this.lawyer()
	}

	ionViewWillEnter(){
		this.lawyer()
	}

	lawyer(){
		this.spinner.show();
		let data ={
			"apikey":this.globalService.APIKey,
			"lawyer_id":this.param
		}
		this.globalService.lawyer_profile(data)
		.then(data => {
			this.page_hide=true;
			this.spinner.hide();
			this.lawyer_all_data = data['data'];
			this.lawyer_profile = data;
			this.profile_image = this.lawyer_profile.data[0].lawyer_image
			this.first_name = this.lawyer_profile.data[0].first_name
			this.last_name = this.lawyer_profile.data[0].last_name
			this.lawyer_skill = this.lawyer_profile.data[0].add_skills
			this.lawyer_skill_show=this.lawyer_skill.split(',')
			this.email = this.lawyer_profile.data[0].email
			this.contact_number1 = this.lawyer_profile.data[0].contact_number
			this.address_line1 = this.lawyer_profile.data[0].address
		})
	}

	user_edit(){
		localStorage.setItem('lawyer_all_data',JSON.stringify(this.lawyer_all_data))
		this.events.publish('lawyer_edit', '')
		this.router.navigateByUrl('/manage-lawyer')
	}

	user_click(){
		this.router.navigateByUrl('/my-profile')
	}

}
