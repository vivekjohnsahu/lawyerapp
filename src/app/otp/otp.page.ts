import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController,AlertController, MenuController, IonSlides, Platform } from '@ionic/angular';
import { Router, Navigation } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GlobalService } from '../../globalServices/global.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

	public _status:any;
	email_otp:any;
	sent_otp: FormGroup;
	get_otp = {
		otp:"", 
	};

	@ViewChild('slides') slides: IonSlides;

	constructor(
		public toastController:ToastController,
		public router:Router,
		public alertController:AlertController,
		public menu: MenuController,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		public gobalService:GlobalService,
		private spinner: NgxSpinnerService,
		private storage: Storage,
	){
		//  validation pattern start
		this.sent_otp = new FormGroup({
			otp: new FormControl('', [Validators.required]),            
		});
	}

	ngOnInit() {
		this.storage.get('email_otp').then((val) => {
			this.email_otp = val;
		});
		this.statusBar.overlaysWebView(false);
		this.statusBar.backgroundColorByHexString('#233658;');
	}

	// manu bar hide
	ionViewWillEnter() {
		this.menu.enable(false);
	}

	// manu bar show leave page
	ionViewDidLeave() {
		this.menu.enable(false);
	}

	async otp(){
		let len_otp = this.get_otp.otp.length
		if(len_otp < 4){
			const toast = await this.toastController.create({
				message: 'Please fill the valid Otp',
				position:'bottom',
				color:"dark",
				duration: 3000
			});
			toast.present();
		}else{
			this.spinner.show();
			let forgot_otp = {
				'email':this.email_otp.email,
				'apikey':this.gobalService.APIKey,
				'otp':this.get_otp.otp,
			}
			this.gobalService.email_verify_otp(forgot_otp)
			.then(async data => {
				this.spinner.hide();
				this._status = data['ErrorCode']
				if(this._status=='0'){
					this.storage.set('vrfy_email_otp_', forgot_otp);	
					this.router.navigateByUrl('/create-password')
			  		this.sent_otp.reset();
				}else{
					const toast = await this.toastController.create({
						message: 'Please fill the valid Otp',
						position:'bottom',
						color:"dark",
						duration: 3000
					});
					toast.present();
				}
			})
		}
	}

	// resend otp code start
	async resend_otp(){
		const alert = await this.alertController.create({
			message: 'Are you sure you want to resend otp.',
			buttons: [{
					text: 'Cancel',
					role: 'cancel',
					cssClass: 'secondary',
				},
				{
					text: 'ok',
					handler: () => {
						this.re_sent_otp()
				}
			}]
		});
		await alert.present();
	}

	async re_sent_otp(){
		this.storage.get('email_otp').then((val) => {
			this.email_otp = val;
		});
		let forgot = {
			'email':this.email_otp.email,
			'apikey':this.gobalService.APIKey
		}
		this.spinner.show();
		this.gobalService.forgot_password(forgot)
			.then(async data => {
	         this.spinner.hide();
			let _status = data['ErrorCode']
			if(_status=='0'){
				const toast = await this.toastController.create({
					message: 'Otp send your register mobile no.',
					position:'bottom',
					color:"success",
					duration: 3000
				});
				toast.present();
			}else{
				const toast = await this.toastController.create({
					message: 'Do not send otp.',
					position:'bottom',
					color:"dark",
					duration: 3000
				});
				toast.present();
			}
		})
	}

	numberAccept(event): boolean {
		const charCode = (event.which) ? event.which : event.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		  return false;
		}
		return true;
	}

}
