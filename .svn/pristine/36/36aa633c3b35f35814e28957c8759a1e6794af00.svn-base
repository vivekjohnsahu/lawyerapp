import { Component, OnInit } from '@angular/core';
import { AlertController, Events, MenuController, Platform, IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { GlobalService } from '../../globalServices/global.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, Navigation } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
// declare let paypal: any;

@Component({
  selector: 'app-pay-now',
  templateUrl: './pay-now.page.html',
  styleUrls: ['./pay-now.page.scss'],
})
export class PayNowPage implements OnInit {
	plane_seleted: any;
	user_id_get: any;
	_status: any;
	message: any;
	userRep: any;
	user_login: any;
	plane_seleted_data:any
	pay_Amount:any
	pay_id:any
	random:any
	_sus_msg_show=''
	obj:any
	// user_pay_amt:boolean=true;
	
	constructor(
		public alertCtrl: AlertController,
		private storage:Storage,
		public events: Events,
		public globalService:GlobalService,
		public spinner:NgxSpinnerService,
		private router : Router,
		public toastController: ToastController,
		public alertController: AlertController,
		public payPal: PayPal

	) { }

	ngOnInit() {
		this.pay_ccavenue()
	}  


	ionViewWillEnter(){
		this.pay_ccavenue()
	}

	pay_ccavenue(){
		this.spinner.show();
		this.storage.get('plane_seleted').then((val) => {
				this.plane_seleted_data = val[0]
				this.obj = new Array
				this.obj.push(this.plane_seleted_data)
				this.pay_Amount=this.plane_seleted_data.price
				this.pay_id=this.plane_seleted_data.id
				this.spinner.hide();
		})
		this.storage.get('user_id_set').then((val) => {
			this.user_id_get = val;
		});
		this.storage.get('user_login').then((val) => {
			this.user_login = val;
		});	
		// this.spinner.hide();
	}

	Payment(){
		// this.user_pay_amt=false
		this.random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
		// alert('Vivek Go for Payment---->')
		this.payPal.init({
			PayPalEnvironmentProduction: 'AQSHYTeoFI9C6OaLGt2O3S32u4Ky1lj-63CUG_i2_F-zIYaUmPs8NfyQ94WoZhJfOIKMYVvU6Twj9aPB',
			PayPalEnvironmentSandbox: 'Ab8tDhKWOPzW6ufJFF977awlIzPpFtD0E7dOxzYn4Yz3qSpIE65yR6xDEmgh4zseYg74Rm3lQW1SeN4d'
			// PayPalEnvironmentSandbox: 'AFAL9NFteRKL06zE2rFL39tKdQA5Act3JxOdMkadilNbH6VN8zWRViIC'
		}).then(() => {
			this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
			})).then(() => {
				let payment = new PayPalPayment(this.pay_Amount, 'USD', 'Payable Amount', 'lawyer');
				this.payPal.renderSinglePaymentUI(payment).then((payments) =>  {
					if( payments.response.state =="approved"){
						let plan_data = {
							apikey:this.globalService.APIKey,
							user_id:this.user_id_get.user_id,
							plan_name:this.plane_seleted_data.plan_name,
							plan_id:this.plane_seleted_data.id,
							validity:this.plane_seleted_data.validity,
							price:this.plane_seleted_data.price,
							transaction_no:payments.response.id,
							pay_pal_token:this.random,
							payment_status:'1',
						}
						this.globalService.plan_activate(plan_data).then(
							data => {
								if(data['Status'] ='0'){
									let loginData={
										username:this.user_login.email,
										password:this.user_login.password,
									}
									this.spinner.show();
									this.globalService.login_user(loginData)
									.then(async data => {
										this.userRep = data
										this._status = data['ErrorCode']
										this.message = data['message']
										this.spinner.hide();
										if(this._status=='0'){
											this.storage.set('email', this.user_login.email);
											localStorage.setItem('details_user',JSON.stringify(this.userRep.data))	
											if(this.userRep.data[0].user_type=='2'){
												this._sus_msg_show="Payment successfully done"
												this.events.publish('open_app', 'lawyer');
												this.events.publish('userName',this.userRep.data);
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
				}, () => {
					this.router.navigateByUrl('/payment-error')
					// Error or render dialog closed without being successful
				});
			}, () => {
				// Error in configuration
			});
		}, () => {
			// Error in initialization, maybe PayPal isn't supported or something else
		});
	}

}
