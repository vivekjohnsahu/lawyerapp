import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router, Navigation } from '@angular/router';
import { MenuController, IonSlides, Platform  } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GlobalService } from '../../globalServices/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})

export class ForgotpasswordPage implements OnInit {

	public _status:any;
	Forgot_Passform: FormGroup;
	forgotData = {
		email:"",
	};
	regExEmail="^([a-zA-Z0-9_.]+@[a-zA-Z0-9]+[.][.a-zA-Z]+)$";
	@ViewChild('slides') slides: IonSlides;
	user_type: any;

	constructor(
		public toastController: ToastController,
		public router:Router,
		public menu: MenuController,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		public gobalService:GlobalService,
		private spinner: NgxSpinnerService,
		private storage: Storage,
	)
	{ 
		//  validation pattern start
		let email_pattern = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
		this.Forgot_Passform = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.pattern(email_pattern)]),            
		});
	}

	ngOnInit() {
		this.menu.enable(false);
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

	// Forgot Password function start
	 async Forgot_Pass(){
		 if(!this.forgotData.email.match(this.regExEmail)){
			const toast = await this.toastController.create({
				message: 'Invalid email address.',
				position:'bottom',
				color:"dark",
				duration: 2000
			});
			toast.present();
		 }else{
			this.spinner.show();
			let forgot = {
				'email':this.forgotData.email,
				'apikey':this.gobalService.APIKey
			}
			this.gobalService.forgot_password(forgot)
				.then(async data => {
					  this.spinner.hide();
					this._status = data['ErrorCode']
					this.user_type = data['user_type']
					if(this._status=='0'){
						this.storage.set('email_otp', this.user_type);	
						this.router.navigateByUrl('/otp')
						this.Forgot_Passform.reset();
					}else{
						const toast = await this.toastController.create({
							message: 'Please enter a valid Email ID',
							position:'bottom',
							color:"dark",
							duration: 2000
						});
						toast.present();
					}
				})	 
		 	}
		}

}
