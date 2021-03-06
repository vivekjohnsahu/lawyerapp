import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, Navigation } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuController, IonSlides, AlertController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Events } from '@ionic/angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from '../../globalServices/global.service'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
	public _status:any;
	user_login:any
	signupform: FormGroup;
	LoginData = {
		email:"",
		password:"",
	};

	@ViewChild('slides') slides: IonSlides;
	userRep: any;
	message: any;

  	constructor(
		private router : Router, 
		public menu: MenuController,
		public alertController: AlertController,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private platform: Platform,
		private storage: Storage,
		public events: Events,
		private spinner: NgxSpinnerService,
		public gobalService:GlobalService,
	) {
		//  validation pattern start
		let email_pattern = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
		this.signupform = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.pattern(email_pattern)]),            
			password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
		});

		this.user_login_chek()
		platform.ready().then(() => {
			statusBar.styleDefault();
			splashScreen.hide();
			this.platform.backButton.subscribe(() => {
				if (this.router.url=="/sign-in"){
					this.presentConfirm();  
				}
			})
		});
	}

	user_login_chek(){
		this.events.subscribe('userName', (data) =>{
			this.user_login = data;
			this.storage.set('userName', data);	
			if( this.user_login!='' && this.user_login!=undefined && this.user_login!=null){			
				this.router.navigateByUrl('/home')
			}else{
				this.router.navigateByUrl('/sign-in')
			}
		});
		this.storage.get('userName').then((val) => {
			this.user_login = val;
			if( this.user_login!='' && this.user_login!=undefined && this.user_login!=null){
				this.router.navigateByUrl('/home')
			}else{
				this.router.navigateByUrl('/sign-in')
			}
		});		
	}

	ngOnInit() {
		this.statusBar.overlaysWebView(false);
		this.statusBar.backgroundColorByHexString('#fff;');
	}

// manu bar hide
	ionViewWillEnter() {
		this.menu.enable(false);
	}
	

// user login validation start
	async login(){
		let loginData={
			username:this.LoginData.email,
			password:this.LoginData.password,
		}
		this.spinner.show();
		this.gobalService.login_user(loginData)
		.then(async data => {
			this.userRep = data
			this._status = data['ErrorCode']
			this.message = data['message']
			this.spinner.hide();
			this.storage.set('email', this.LoginData.email);
			if(this._status=='0'){
				localStorage.setItem('details_user',JSON.stringify(this.userRep.data))	
				if(this.userRep.data[0].user_type=='3'){
					this.events.publish('open_app', 'user');
					this.events.publish('userName',this.userRep.data);
					localStorage.setItem('open_app',JSON.stringify('user'))
					this.router.navigateByUrl('/home')
					this.signupform.reset();
				}else if(this.userRep.data[0].user_type=='2'){
					this.events.publish('open_app', 'lawyer');
					this.events.publish('userName',this.userRep.data);
					localStorage.setItem('open_app',JSON.stringify('lawyer'))
					this.router.navigateByUrl('/home')
					this.signupform.reset();
				}else{
					const alert = await this.alertController.create({
						message: this.message,
						buttons: ['OK']
						});
					await alert.present();
				}
			}else if(this._status=='2'){
				const alert = await this.alertController.create({
					message: this.message,
					buttons: [{
						text: 'Ok',
							handler: () => {
								this.router.navigateByUrl('/verify-otp')
								this.signupform.reset();
							}
						}]
					});
				await alert.present();
			}else if(this._status=='3'){
				let user_login ={
					email:this.LoginData.email,
					password:this.LoginData.password
				}
				this.storage.set('user_login', user_login);	
				this.storage.set('user_id_set', data);	
				this.router.navigateByUrl('/plan')
			}else if(this._status=='4'){
				const alert = await this.alertController.create({
					message: this.message,
					buttons: ['OK']
				});
				await alert.present();
			}else if(this._status=='1'){
				const alert = await this.alertController.create({
					message: 'You are not register.',
					buttons: ['OK']
				});
				await alert.present();
			}   
		});  
	}

// app exit code start
	async presentConfirm() {
		navigator['app'].exitApp();
	}

}
