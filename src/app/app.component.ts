import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController, Events, MenuController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { GlobalService } from '../globalServices/global.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

	open_app:string;
	user_name: string;
	profile_image:any;
	userName:any;
	
	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private router: Router,
		public menu: MenuController,
		public alertController:AlertController,
		public events: Events,
		private storage:Storage,
		public gobalService:GlobalService,
	) 
	{
		platform.ready().then(() => {
			statusBar.styleDefault();
			splashScreen.hide();
		});
		
		this.events.subscribe('open_app', (data) =>{
			this.open_app = data;
			this.storage.set('open_app', data);	
		});

		this.storage.get('open_app').then((val) => {
			this.open_app = val;
		});
		
		var user = JSON.parse(localStorage.getItem('open_app'));
		if(user!=null || user!=undefined){
			this.router.navigateByUrl('/home')
		}else{
			this.router.navigateByUrl('/sign-in')
		}
		this.user_details()
	}

	ionViewWillEnter(){
		this.user_details()
	}

	user_details(){
		this.events.subscribe('userName', (data) =>{
			this.userName = data;
			this.storage.set('userName', data);
			if(this.userName[0].company_name!=undefined){
				this.user_name = this.userName[0].company_name;
			}else{
				this.user_name = this.userName[0].first_name
			}
						
			if(this.userName[0].profile_image==undefined || this.userName[0].profile_image==null || this.userName[0].profile_image==''){
				this.profile_image = 'https://www.w3schools.com/howto/img_avatar.png';
			}else{
				this.profile_image = this.userName[0].profile_image;
			}		
		});

		this.storage.get('userName').then((val) => {
			this.userName = val;
			if(this.userName[0].company_name!=undefined){
				this.user_name = this.userName[0].company_name;
			}else{
				this.user_name = this.userName[0].first_name;
			}
			if(this.userName[0].profile_image==undefined || this.userName[0].profile_image==null || this.userName[0].profile_image==''){
				this.profile_image = 'https://www.w3schools.com/howto/img_avatar.png';
			}else{
				this.profile_image = this.userName[0].profile_image;
			}	
		});
	}

	ngOnInit(){}

  // user logout start
	async logOut(){
		const alert = await this.alertController.create({
		message: 'Do you want to logout',
		buttons: [
			{
				text: 'Cancel',
				role: 'cancel',
				cssClass: 'secondary',
			},{
				text: 'ok',
				handler: () => {
					this.menu.enable(false);
					this.events.publish('userName','');
					this.storage.set('userName', '');	
					localStorage.removeItem('open_app')
					localStorage.removeItem('lawyer_all_data')
					localStorage.removeItem('details_user')
					setTimeout(() => {
						this.events.publish('open_app', '');
						this.events.publish('userName','');
						this.storage.set('userName', '');	
					}, 1000);	
					this.router.navigateByUrl("/sign-in")
				}
			}]
		});
		await alert.present();
	}

	// myProfile(){
	// 	this.router.navigateByUrl("/my-profile")
	// }
} 


