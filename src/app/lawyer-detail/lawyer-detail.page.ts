import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../globalServices/global.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertController, Events, MenuController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-lawyer-detail',
  templateUrl: './lawyer-detail.page.html',
  styleUrls: ['./lawyer-detail.page.scss'],
})
export class LawyerDetailPage implements OnInit {

	param: any;
	_status: string;
	Message: any;
	lawyer_profile: any;
	profile_image: any;
	first_name: any;
	last_name: any;
	lawyer_skill: any;
	email: any;
	contact_number1: any;
	address_line1: any;
	text_user: any;
	lawyer_all_data: {};
	lawyer_skill_show: any;
	page_hide:boolean=false;
	fnlName: any;
	open_app: any;

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

	async user_enquiry() {
		const alert = await this.alertController.create({
			header: 'Remarks!',
			inputs: [{
					name: 'user_enq',
					type: 'text',
					placeholder: 'remarks'
				},],
			buttons: [{
					text: 'Cancel',
					role: 'cancel',
					cssClass: 'secondary',
				}, {
				text: 'Ok',
					handler: (user_remaek) => {
						this.userremarkValue(user_remaek)
					}
				}
			]
		});
		await alert.present();
	}

	ionViewWillEnter(){
		this.events.subscribe('open_app', (data) =>{
			this.open_app = data;
			this.storage.set('open_app', data);	
		});

		this.storage.get('open_app').then((val) => {
			this.open_app = val;
		});
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
			console.log(this.lawyer_all_data)
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

	async userremarkValue(user_remaek){
		var user = JSON.parse(localStorage.getItem('details_user'));
		this.fnlName=user[0].first_name +' '+ user[0].last_name
		this.text_user =user_remaek.user_enq
		let lawyer_prnl = {
			"apikey":this.globalService.APIKey,
			"remarks":this.text_user,
			"name":this.fnlName,
			"lawfirm":this.lawyer_all_data[0].lawfirm_id,
			"email":user[0].email,
			"lawyer_name":this.first_name+" "+this.last_name
		}
		if(user_remaek.user_enq==""){
			const toast = await this.toastController.create({
				message: 'cannot be blank remarks',
				color:"dark",
				position:'bottom',
				duration: 2000
			});
			toast.present();
		}else{
			this.globalService.enquiry(lawyer_prnl)
			.then(async data => {
				this._status = data['ErrorCode']
				this.Message = data['message'];
				this.spinner.hide();
				if(this._status=='0'){
					const toast = await this.toastController.create({
						message: 'Submit your enquiry.',
						position:'bottom',
						color:"success",
						duration: 3000
					});
					toast.present();
				}else if(this._status=='1'){
					const toast = await this.toastController.create({
						message: 'You have not submit your enquiry.',
						position:'bottom',
						color:"dark",
						duration: 3000
					});
					toast.present();
				}
			})
		}
	}

}
