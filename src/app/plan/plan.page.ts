import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../globalServices/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, Navigation } from '@angular/router';
import { NavController,AlertController,ActionSheetController,Platform, ToastController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
})
export class PlanPage implements OnInit {
	plan_Bronze_plan:any;
	plan_gold_plan:any;
	plan_silver_plan:any;
	plan_firm_f:any;
	plan_firm_s:any;
	plan_firm_t:any;
	plane_seleted: any;
	key:any;
	plan_Bronze_plan_page_shoe=0
	plan_gold_plan_page_shoe=0
	plan_silver_plan_page_shoe=0
	user_login:any;
	userRep: {};
	_status: any;
	message: any;
	user_id_get: any;
	random: number;

  	constructor(
    	public alertController:AlertController,
		public gobalService:GlobalService,
		private spinner: NgxSpinnerService,
		private router : Router,
		public toastController:ToastController, 
		public storage:Storage,
		private platform: Platform,
		public events: Events,
  	) {
		platform.ready().then(() => {
			this.platform.backButton.subscribe(() => {
				if (this.router.url=="/plan"){
					this.presentConfirm();  
				}
			})
		});
		this.storage.get('user_id_set').then((val) => {
			this.user_id_get = val;
			this.chek_skip_plan()
		});
		this.storage.get('user_login').then((val) => {
			this.user_login = val;
		});	
	  }

	ngOnInit() {
		this.plan_list()
	}

	presentConfirm(){
		navigator['app'].exitApp();
	}

	plan_list(){
		this.spinner.show()
		this.key = {
			'apikey':this.gobalService.APIKey
		}
		this.gobalService.plan(this.key)
		.then(data => {
			this.spinner.hide()
			
			this.plan_gold_plan=data;
			this.plan_firm_s = this.plan_gold_plan.data[0]
			this.plane_seleted = data['data']
			console.log(this.plane_seleted)

			this.plan_gold_plan = new Array;
			this.plan_gold_plan.push(this.plan_firm_s)

			// this.plan_silver_plan=data;
			// this.plan_firm_t = this.plan_silver_plan.data[1]	
			// this.plan_silver_plan = new Array;
			// this.plan_silver_plan.push(this.plan_firm_t)

			// this.plan_Bronze_plan=data;
			// this.plan_firm_f = this.plan_Bronze_plan.data[0]	
			// this.plan_Bronze_plan = new Array;
			// this.plan_Bronze_plan.push(this.plan_firm_f)
			// this.plane_seleted = this.plan_Bronze_plan

		})
	}

	selected_plan(plan){
		console.log(plan)
		// this.plane_seleted = plan
		this.plane_seleted = plan
	}

	subscribe(){
		// this.storage.set('plane_seleted', this.plane_seleted);	
		this.storage.set('plane_seleted', this.plane_seleted);	
		this.router.navigateByUrl("/pay-now")
	}	
	
	skip_plan(){
		this.random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
		let plan_data = {
			apikey:this.gobalService.APIKey,
			user_id:this.user_id_get.user_id,
			plan_name:'skip_plan',
			plan_id:'23',
			validity:'7',
			price:'0',
			transaction_no:'skip',
			pay_pal_token:this.random,
			payment_status:'1',
		}
		this.gobalService.plan_activate(plan_data).then(
			data => {
				if(data['Status'] ='0'){
					let loginData={
						username:this.user_login.email,
						password:this.user_login.password,
					}
					this.spinner.show();
					this.gobalService.login_user(loginData)
					.then(async data => {
						this.userRep = data
						this._status = data['ErrorCode']
						this.message = data['message']
						this.spinner.hide();
						if(this._status=='0'){
							this.storage.set('email', this.user_login.email);
							localStorage.setItem('details_user',JSON.stringify(this.userRep['data']))	
							if(this.userRep['data'][0].user_type=='2'){
								this.events.publish('open_app', 'lawyer');
								this.events.publish('userName',this.userRep['data']);
								localStorage.setItem('open_app',JSON.stringify('lawyer'))
								this.router.navigateByUrl('/home')
								this.storage.set('user_login', '');
							}else{
								const alert = await this.alertController.create({
									message: this.message,
									buttons: ['OK']
								});
								await alert.present();
							}
						}
					})	
				}else if(data['status'] ='1') {
					// this.router.navigateByUrl('/home')
				}else{
					// do nothing;
				}
		});
	}

	button_skip_plan=false;
	chek_skip_plan(){
		let plan_data = {
			apikey:this.gobalService.APIKey,
			user_id:this.user_id_get.user_id,
			plan_id:'23',
		}
		this.gobalService.check_basic(plan_data)
		.then(data => {
			if(data['ErrorCode']==0){
				this.button_skip_plan=true;
			}else{
				this.button_skip_plan=false;
			}
		})
	}

}
