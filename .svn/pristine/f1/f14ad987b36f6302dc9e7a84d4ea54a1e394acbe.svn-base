import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../globalServices/global.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, MenuController, IonSlides, Platform  } from '@ionic/angular';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.page.html',
  styleUrls: ['./user-edit.page.scss'],
})
export class UserEditPage implements OnInit {

  _status: any;
	user_all_data: any;
	user_data: any;
	signupUser: FormGroup;
	userData = {
		apikey:'',
		first_name:"",
		last_name:"",
		mobile:"",
	};

  constructor(
    	private routers : ActivatedRoute,
		public globalService:GlobalService,
    	public spinner:NgxSpinnerService,
		private router: Router,
		public alertController: AlertController,
		public events: Events,
  ) {
		this.signupUser = new FormGroup({
			first_name: new FormControl('', [Validators.required]),       
			last_name: new FormControl(),      
			mobile: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]),
		});
   }

  ngOnInit() {
    this.user_prf()
  }

  	user_prf(){
		var user = JSON.parse(localStorage.getItem('details_user'));
		this.spinner.show();
		let data ={
			"apikey":this.globalService.APIKey,
			"id":user[0].id
		}
		this.globalService.user_profile(data)
		.then(data => {
			this.spinner.hide();
			this._status = data['ErrorCode']
			if(this._status=='0'){
				this.user_data = data
				this.user_data = this.user_data.data.user_profile
				this.userData=this.user_data
				this.userData.mobile=this.user_data.contact_number1
			}else{
				// do nothing
			}
		})
	}
	userData_set:any
	edit_Up(){
		var user = JSON.parse(localStorage.getItem('details_user'));
		this.spinner.show();
		let data ={
			"apikey":this.globalService.APIKey,
			"first_name":this.user_data.first_name,
			"last_name":this.user_data.last_name,
			"mobile":this.user_data.mobile,
			"id":user[0].id
		}
		this.globalService.user_profile_edit(data)
		.then(async data => {
			let Message = data['message'];
			let _status = data['ErrorCode']
			this.spinner.hide();
			if(_status=='0'){
        		const alert = await this.alertController.create({
					message: Message,
					buttons: [{
						text: 'Ok',
							handler: () => {
							this.userData_set = data
							this.userData_set = this.userData_set.data
							let saveData={
								0:this.userData_set
							}
							localStorage.setItem('details_user',JSON.stringify(saveData))
							this.events.publish('userName',saveData);	
							this.router.navigateByUrl('/user-my-profile')
							}
						}]
					});
				await alert.present();	
			}else if(this._status=='1'){
				const alert = await this.alertController.create({
					message: Message,
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
		})
	}


}
