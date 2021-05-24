import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, Navigation } from '@angular/router';
import { ToastController, AlertController, MenuController, IonSlides, Platform  } from '@ionic/angular';
import { GlobalService } from '../../globalServices/global.service'
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NgxSpinnerService } from 'ngx-spinner';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {

  public _status:any;
  public Message:any;
	signupUser: FormGroup;
	userData = {
		apikey:'',
		first_name:"",
		last_name:"",
		email:"",
		mobile:"",
	  password:""
	};

	@ViewChild('slides') slides: IonSlides;

	constructor(
			private router : Router, 
			public alertController: AlertController,
			public gobalService:GlobalService,
			public menu: MenuController,
			private splashScreen: SplashScreen,
			private statusBar: StatusBar,
			private spinner: NgxSpinnerService,
			private storage: Storage,
			public toastController:ToastController,
	) { 
    //  validation pattern start
    let email_pattern = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
		this.signupUser = new FormGroup({
				first_name: new FormControl('', [Validators.required]),       
				last_name: new FormControl(),      
				email: new FormControl('', [Validators.required, Validators.pattern(email_pattern)]),            
				mobile: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]),
				password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
			});
  	}

	ngOnInit() {
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
  
  async signUp(){
		this.userData = {
			"apikey":this.gobalService.APIKey,
			"first_name": this.userData.first_name,
			"last_name": this.userData.last_name,
			"email": this.userData.email,
			"mobile":this.userData.mobile,
			"password": this.userData.password,
		};
		this.spinner.show();
		this.gobalService.register_user(this.userData)
		.then(async data => {
			this.spinner.hide();
			this._status = data['ErrorCode']
			this.Message = data['message'];
			if(this._status=='0'){
					this.storage.set('otp_type', '1');
					this.storage.set('email', this.userData.email);	
					this.router.navigateByUrl('/verify-otp')
					const toast = await this.toastController.create({
						message: 'sent otp your register email id.',
						position:'top',
						color:"dark",
						duration: 3000
					});
					toast.present();
					this.signupUser.reset();
			}else if(this._status=='1'){
				const alert = await this.alertController.create({
					message: this.Message,
					buttons: [{text: 'Ok',}]
				});
				await alert.present();
			}else{
				const alert = await this.alertController.create({
					message: 'You have not registered try again.',
					buttons: [{text: 'Close'}]
				});
				await alert.present();
			}
		});   
	}

	numberAccept(event): boolean {
		const charCode = (event.which) ? event.which : event.keyCode;
		if(charCode > 31 && (charCode < 48 || charCode > 57)) {
		  	return false;
		}
		return true;
	}

}
