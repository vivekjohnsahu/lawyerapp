import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController, MenuController, IonSlides, Platform  } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GlobalService } from '../../globalServices/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.page.html',
  styleUrls: ['./create-password.page.scss'],
})
export class CreatePasswordPage implements OnInit {

	public _status:any;
	user_change_pasw:any;
	user_type:any;
	changePassword: FormGroup;
	change_pw = {
		new_password:"",
		comf_password:"",
	};

	@ViewChild('slides') slides: IonSlides;
	vrfy_email_otp_: any;

  	constructor(
		public alertController: AlertController,
		public toastController:ToastController,
		public menu: MenuController,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		public globalService:GlobalService,
		private spinner: NgxSpinnerService,
		private storage: Storage,
		private router : Router, 
	){
//  validation pattern start
    this.changePassword = new FormGroup({
        new_password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
        comf_password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
      });
  }

	ngOnInit(){
		this.statusBar.overlaysWebView(false);
		this.statusBar.backgroundColorByHexString('#233658;');
		// this.storage.get('vrfy_email_otp_').then((val) => {
		// 	this.vrfy_email_otp_ = val;
		// });	
		// this.storage.get('email_otp').then((val) => {
		// 	this.user_type = val;
		// });	
	}

	ionViewWillEnter(){
		this.menu.enable(false);
		// this.storage.get('vrfy_email_otp_').then((val) => {
		// 	this.vrfy_email_otp_ = val;
		// });	
		// this.storage.get('email_otp').then((val) => {
		// 	this.user_type = val;
		// });	
	}

	async changePass(){
		var user = JSON.parse(localStorage.getItem('open_app'));
		if (this.change_pw.new_password !=  this.change_pw.comf_password){
			const alert = await this.alertController.create({
				message: 'Confirm Password does not match the New Password .',
				buttons: ['OK']
			});
		await alert.present();
		}else if(this.change_pw.new_password && this.change_pw.comf_password){
			this.spinner.show();
			this.storage.get('vrfy_email_otp_').then((val) => {
				this.vrfy_email_otp_ = val;
			});	
			this.storage.get('email_otp').then((val) => {
				this.user_type = val;
				console.log(this.user_type)
			});	
			setTimeout(() => {
				let newPass = {
					'email':this.vrfy_email_otp_.email,
					'apikey':this.globalService.APIKey,
					'password':this.change_pw.comf_password,
					'user_type':this.user_type.user_type
				}
				this.globalService.create_new_pass(newPass)
				.then(async data => {
					this._status = data['ErrorCode']
					this.spinner.hide();
					if(this._status=='0'){
						const alert = await this.alertController.create({
							message: 'successfully changed your password.',
							buttons: [{
							text: 'Ok',
								handler: () => {
									this.router.navigateByUrl('/sign-in')
									this.changePassword.reset();
								}
							}]
						});
						await alert.present();
					}else{
						const toast = await this.toastController.create({
							message: 'Do not create your password try again.',
							position:'bottom',
							color:"dark",
							duration: 3000
						});
						toast.present();
					}
				})
			}, 1000);
		}
	}

// manu bar hide
	// ionViewWillEnter() {
	// 	this.menu.enable(false);
	// }

// manu bar show leave page
	ionViewDidLeave() {
		this.menu.enable(false);
	}

}
