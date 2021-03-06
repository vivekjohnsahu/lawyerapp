import { Component, OnInit, NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../../globalServices/global.service'
import { Router, Navigation } from '@angular/router';
import { MenuController, IonSlides, AlertController, Platform,NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
declare var google: any;
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-modalpage',
  templateUrl: './modalpage.page.html',
  styleUrls: ['./modalpage.page.scss'],
})
export class ModalpagePage {

	lowyerChek: FormGroup;
	lawyerAdd = {
		lawyerType:"",
		location:"",
	};
	skills:any;
	skills_view:any;
	_status: any;
	Message: any;
	filter_user:any;
	GoogleAutocomplete: any;
	autocomplete: any;
	autocompleteItems: any;

 	constructor(
		public modalController: ModalController,
		public globalService:GlobalService,
		private router : Router, 
		public menu: MenuController,
		public alertController: AlertController,
		public navController:NavController,
		private storage: Storage,
		private zone: NgZone,
		public spinner:NgxSpinnerService,
	) 
	{ 
		//  validation pattern start
		this.lowyerChek = new FormGroup({
			lawyerType: new FormControl('', [Validators.required]),
			location: new FormControl('', [Validators.required]),
		});
		//  validation pattern end

		// auto place 
		this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
		this.autocomplete = { input: '' };
		this.autocompleteItems = [];
	}

	ionViewWillEnter() {
		let apikey={
			"apikey":this.globalService.APIKey
		}
		this.globalService.search_skill(apikey)
		.then(data => {
			this.skills_view = data;
			this.skills=this.skills_view.data;
		}) 
	}

	// loacation autocomplete search 
	updateSearchResults(){
		if (this.lawyerAdd.location == '') {
		  this.autocompleteItems = [];
		  return;
		}
		this.GoogleAutocomplete.getPlacePredictions({ input: this.lawyerAdd.location },
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
		this.lawyerAdd.location=item.description;
		let split_locaton=this.lawyerAdd.location.split(',')
		this.lawyerAdd.location=split_locaton[0]
	}

	dismiss(){
		this.modalController.dismiss();
	}

	// lowyer search function start
	lawyerbtn(){
		this.spinner.show()
		let key = {
			'apikey':this.globalService.APIKey,
			'skill':this.lawyerAdd.lawyerType,
			'location':this.lawyerAdd.location
		}
		this.globalService.userFilter(key)
		.then(async data=>{
			this._status = data['ErrorCode']
			this.Message = data['message'];
			this.spinner.hide()
			if(this._status=='0'){
				this.filter_user = data
				if(this.filter_user.data==false){
					const alert = await this.alertController.create({
						message: this.lawyerAdd.location+' location not found lawyer',
						buttons: [{text: 'Ok'}]
					});
					await alert.present();
				}else{
					localStorage.setItem('FilterData',JSON.stringify(this.filter_user))
					this.router.navigateByUrl('/home');
				}				
			}
		})	
	}

}
