import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, Navigation } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NavController,AlertController,ActionSheetController, MenuController, IonSlides, Platform  } from '@ionic/angular';
import { GlobalService } from '../../globalServices/global.service'
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NgxSpinnerService } from 'ngx-spinner';
import { Storage } from '@ionic/storage';
import { Events } from '@ionic/angular';

declare var google: any;

@Component({
  selector: 'app-edit-profile-firm',
  templateUrl: './edit-profile-firm.page.html',
  styleUrls: ['./edit-profile-firm.page.scss'],
})
export class EditProfileFirmPage implements OnInit {

 
	ImageBind:any = 'https://www.w3schools.com/howto/img_avatar.png';
	public _status:any;
	ImageBind_dataBase='';
	practiceOpt:any;

	cityOpt: string[] = [
		"INDIA",
		"UAE",
	];

	signupUser: FormGroup;
	userData = {
		apikey:"",
		law_firm_name:"",
		mobile:"",
		// establishment_date:"",
		country:"",
		practice_area:"",
		address:"",
		location:"",
		description:"",
		profile_image:"",
		id:''
	};

	@ViewChild('slides') slides: IonSlides;
	Message: any;
	GoogleAutocomplete: any;
	autocomplete: any;
	autocompleteItems: any;
	arr:any=[]
	alladata:any;
	lawyer_firm_details:any;
	userRep: any;

	constructor(
		private router : Router, 
		private camera:Camera, 
		private actionSheetController:ActionSheetController,
		public alertController: AlertController,
		public gobalService:GlobalService,
		public menu: MenuController,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private spinner: NgxSpinnerService,
		private storage: Storage,
		private zone: NgZone,
		public events:Events
	) {
		//  validation pattern start
		this.signupUser = new FormGroup({
			law_firm_name: new FormControl('', [Validators.required]),       
			mobile: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]),
			// establishment_date: new FormControl('', [Validators.required]),
			country: new FormControl('', [Validators.required]),
			location: new FormControl('', [Validators.required]),
			practice_area:new FormControl('', [Validators.required]),
			address:new FormControl('', [Validators.required]),
			description: new FormControl(),       
		});
		this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
		this.autocomplete = { input: '' };
		this.autocompleteItems = [];
	}

	ngOnInit() {
		this.menu.enable(false);
		this.statusBar.overlaysWebView(false);
		this.statusBar.backgroundColorByHexString('#233658;');
		this.parsn_lawyer()
		this.practice_area()
	}

	// loacation autocomplete search 
	updateSearchResults(){
		if (this.userData.location == '') {
		  this.autocompleteItems = [];
		  return;
		}
		this.GoogleAutocomplete.getPlacePredictions({ input: this.userData.location },
		  (predictions, status) => {
			if (status == google.maps.GeocoderStatus.OK) {
				this.autocompleteItems = [];
				this.zone.run(() => {
					predictions.forEach((prediction) => {
					this.autocompleteItems.push(prediction);
					});
				});
			} else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
				setTimeout(() => {
					this.updateSearchResults();
				}, 200);
			}
		});
	  }

	  //select location
	selectSearchResult(item){
		this.autocompleteItems = [];
		this.userData.location=item.description;
	}

// manu bar hide
	ionViewWillEnter() {
		this.menu.enable(false);
	}

// manu bar show leave page
	ionViewDidLeave() {
		this.menu.enable(false);
	}

// image popup start
	async SelectPhoto() {
		const actionSheet = await this.actionSheetController.create({
			buttons: [{
				text: 'Camera',
				icon: 'Camera',
				handler: () => {
					this.takePhoto(1);
				}
			}, {
				text: 'Gallery',
				icon: 'images',
				handler: () => {
					this.takePhoto(2);
				}
			}, {
				text: 'Cancel',
				icon: 'close',
				role: 'cancel',
			}]
		});
		await actionSheet.present();
	}

//  get image path start
	takePhoto(sourceType:number) {
		const options: CameraOptions = {
			quality: 50,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			correctOrientation: true,
			sourceType: sourceType==1?this.camera.PictureSourceType.CAMERA:this.camera.PictureSourceType.PHOTOLIBRARY,     //this.camera.PictureSourceType.CAMERA,
		}
		this.camera.getPicture(options).then((imgData) => {
			this.ImageBind= "data:image/jpg;base64," + imgData;
			this.ImageBind_dataBase= imgData;
		});
	}

//  signUp function start
	async signUp(){
		var user = JSON.parse(localStorage.getItem('details_user'));
		this.userData = {
			"apikey":this.gobalService.APIKey,
			"law_firm_name": this.userData.law_firm_name,
			"mobile":this.userData.mobile,
			// "establishment_date": this.userData.establishment_date,
			"country": this.userData.country,
			"location":this.userData.location,
			"practice_area": this.userData.practice_area,
			"address": this.userData.address,
			"profile_image":this.ImageBind_dataBase,
			"description":this.userData.description,
			"id":user[0].id
		};
		this.spinner.show();
		this.gobalService.lawyer_firm_edit(this.userData)
		.then(async data => {
			this.userRep = data
			this._status = data['ErrorCode']
			this.Message = data['message'];
			this.spinner.hide();
			if(this._status=='0'){
        		const alert = await this.alertController.create({
					message: this.Message,
					buttons: [{
						text: 'Ok',
							handler: () => {
							let abc={
								0:this.userRep.data
							}
							localStorage.setItem('details_user',JSON.stringify(abc))
							this.events.publish('userName',abc);	
							this.router.navigateByUrl('/my-profile')
							this.ImageBind_dataBase='';
							this.ImageBind='';
							this.signupUser.reset();
							}
						}]
					});
				await alert.present();	
			}else if(this._status=='1'){
				const alert = await this.alertController.create({
					message: this.Message,
					buttons: [{text: 'Ok',}]
				});
				await alert.present();
			}else{
				const alert = await this.alertController.create({
					message: 'You have not edit your profile try again.',
					buttons: [{text: 'Close'}]
				});
				await alert.present();
			}
		});   
	}
//  signUp function end

	numberAccept(event): boolean {
		const charCode = (event.which) ? event.which : event.keyCode;
		if(charCode > 31 && (charCode < 48 || charCode > 57)) {
		  	return false;
		}
		return true;
	}

	practice_area(){
		let apikey={
			"apikey":this.gobalService.APIKey
		}
		this.gobalService.practice(apikey).
		then(data => {
			this.practiceOpt = new Array;
			this.practiceOpt.push(data);
			this.practiceOpt=this.practiceOpt[0].data;
			})
	}

	parsn_lawyer(){
		this.spinner.show();
		var user = JSON.parse(localStorage.getItem('details_user'));
		let data ={
			"apikey":this.gobalService.APIKey,
			"lawfirm_id":user[0].id
		}
		this.gobalService.my_profile(data)
		.then(async data => {
			let _status = data['ErrorCode']
			this.spinner.hide();
			if(_status=='0'){
				this.lawyer_firm_details=data
				this.alladata=data
				this.lawyer_firm_details=this.lawyer_firm_details.data.lawfirm_profile
				this.userData=this.lawyer_firm_details
				this.userData.law_firm_name=this.lawyer_firm_details.company_name
				this.userData.mobile=this.lawyer_firm_details.contact_number
				this.ImageBind=this.lawyer_firm_details.profile_image
				this.ImageBind_dataBase=''
				for(let i=0;this.alladata.data.lawfirm_profile.practice_area.length>i;i++){
					this.arr.push(this.alladata.data.lawfirm_profile.practice_area[i].id)
					this.arr=this.arr
				}
				this.userData.practice_area=this.arr
			}
		})
	}
	  
}
