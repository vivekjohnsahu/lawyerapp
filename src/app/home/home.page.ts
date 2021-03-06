import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, NavController, NavParams } from '@ionic/angular';
// import { ModalpagePage } from '../modalpage/modalpage.page'; 
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController, Events, MenuController, Platform, IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { GlobalService } from '../../globalServices/global.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { IonInfiniteScroll } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers:[LocalNotifications]

})
export class HomePage implements OnInit {

	open_app:string;
	@ViewChild('slides') slides: IonSlides;
	@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
	lawyerFirm:any;
	lawyer_not_found_vl=2;
	lawyer_not_found:any;
	param: any;
	banner_hide:boolean=true
	user_login:any
	logout: any;
	// limit = 10;

	constructor(
		private router: Router, 
		private route: ActivatedRoute, 
		public navCtrl: NavController,
		public modalController: ModalController,
		public menu:MenuController,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private platform: Platform,
		public alertCtrl: AlertController,
		private storage:Storage,
		public events: Events,
		public globalService:GlobalService,
		public spinner:NgxSpinnerService,
		public alertController:AlertController,
		public toastController: ToastController,
		private localNotifications: LocalNotifications,
	){
		platform.ready().then(() => {
			statusBar.styleDefault();
			splashScreen.hide();
			this.platform.backButton.subscribe(() => {
				if (this.router.url=="/home"){
					this.presentConfirm();  
				}
			})
		});

		// this.platform.ready().then((readySource) => {
		// 	console.log('Platform ready from', readySource);
		//   });
		
		this.events.subscribe('open_app', (data) =>{
			this.open_app = data;
			this.storage.set('open_app', data);	
		});
		this.storage.get('open_app').then((val) => {
			this.open_app = val;
		});		
	
		// this.user_login_chek()

		this.platform.ready().then(() => {
			this.localNotifications.on('click').subscribe(res => {
				let msg = res.data ? res.data.mydata : '';
				// this.showAlert(res.title, res.text, msg);
			});
		
			this.localNotifications.on('trigger').subscribe(res => {
				let msg = res.data ? res.data.mydata : '';
				// this.showAlert(res.title, res.text, msg);
			});
		});
			
	}


	scheduleNotification(day) {
		this.localNotifications.schedule({
		  id: 1,
		//   icon: '../../assets/images/icon.png',
		//   icon: "https://www.w3schools.com/howto/img_avatar.png",
		  title: "Lawyer's",
		  text: 'Your plan is deactivated '+day+' day',
		  data: { mydata: 'Your plan is deactivated '+day+' day' },
		  trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
		  foreground: true
		});
	}

	// showAlert(header, sub, msg) {
	// 	this.alertController.create({
	// 		header: header,
	// 		subHeader: sub,
	// 		message: msg,
	// 		buttons: ['Ok']
	// 	}).then(alert => alert.present());
	// }
	  

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

	filterFun(){
		var FilterUser = JSON.parse(localStorage.getItem('FilterData'));
		if(FilterUser!='' && FilterUser!=undefined && FilterUser!=null){
			this.banner_hide=false
			this.lawyerFirm = new Array;
			this.lawyerFirm.push(FilterUser)
			this.lawyerFirm = this.lawyerFirm[0].data;
			localStorage.removeItem('FilterData')
		}
	}

	ngOnInit(){ 
		this.statusBar.overlaysWebView(false);
		this.statusBar.backgroundColorByHexString('#233658;');
		// this.lawyer_list()
	}

	ionViewWillEnter() {
		this.user_login_chek()
		var FilterUser = JSON.parse(localStorage.getItem('FilterData'));
		if(FilterUser=='' || FilterUser==null || FilterUser==undefined){
			this.lawyer_list()
		}else{
			this.filterFun()

		}
		this.menu.enable(true);
		let subscribe_ = JSON.parse(localStorage.getItem('open_app'));
		if(subscribe_=='lawyer'){
			this.get_notification_set()
		}
	}

	ionViewDidLeave() {
		this.menu.enable(false);
	}

	lawyer_list(){
		this.banner_hide=true
		this.spinner.show();
		let data ={
			"apikey":this.globalService.APIKey
		}
		this.globalService.lawyer_firm_list(data)
		.then(async data => {
			let _status = data['ErrorCode']
			let lawyer_data = data;
			this.spinner.hide();
			if(_status=='0'){
				this.lawyer_not_found = data['data']
				this.lawyerFirm = new Array;
				this.lawyerFirm.push(data)
				this.lawyerFirm = this.lawyerFirm[0].data;
				if(this.lawyer_not_found==false || this.lawyer_not_found==undefined || this.lawyer_not_found==null || this.lawyer_not_found==''){
					setTimeout(() => {
						this.lawyer_not_found_vl=1;
					}, 500);
				}
			}else if(_status=='1'){
				let alert = await this.alertCtrl.create({
					message: 'Lawyer firm is blank',
					buttons: [
						{
							text: 'Cancel',
							role: 'cancel',
						},
					]
				});
				await alert.present()
			}
		})
	}

	get_notification_set(){
		var User = JSON.parse(localStorage.getItem('details_user'));
		let data ={
			apikey:this.globalService.APIKey,
			user_id:User[0].id
		}
		this.globalService.get_notification(data)
		.then(async data =>{
			let _status = data['ErrorCode']
			this.logout = data['day']
			if(_status=='1'){
				const alert = await this.alertController.create({
					message: 'Your plan is deactivated',
					backdropDismiss:false,
					buttons: [
						{
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
			}else if(_status=='2'){
				const toast = await this.toastController.create({
					message: 'Your plan is deactivated '+this.logout+' day',
					position:'top',
					color:"dark",
					duration: 2000
				});
				toast.present();
				this.scheduleNotification(this.logout)
			}else if(_status=='0'){
				// do nothing
			}
		})
	}

	async presentConfirm() {
		navigator['app'].exitApp();
	}

	doRefresh(event) {
		this.lawyer_list()
		setTimeout(() => {
			event.target.complete();
		}, 700);
		
	}

	lawyer_details(id){
		this.router.navigateByUrl('/firm-details'+'/'+id);
	}

	// doInfinite(event) {
	// 	setTimeout(() => {
	// 		this.limit += 10;
	// 		event.target.complete();
	// 		if (this.limit >= this.lawyerFirm.length) {
	// 			event.target.disabled = true;
	// 		}
	// 	}, 500);
	// }

}
