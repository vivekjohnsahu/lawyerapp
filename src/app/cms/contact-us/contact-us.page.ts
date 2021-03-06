import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController,AlertController,ActionSheetController, Platform  } from '@ionic/angular';
import { GlobalService } from '../../../globalServices/global.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
	styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {

	contactData: FormGroup;
	contact = {
		firstName:"",
		email:"",
		number:"",
		msg:""
	};
	_status: any;
	message: any;
	regExEmail="^([a-zA-Z0-9_.]+@[a-zA-Z0-9]+[.][.a-zA-Z]+)$";
  
	constructor(
		public alertController: AlertController,
		public spinner:NgxSpinnerService,
		public globalService:GlobalService,
		public toastController:ToastController,
		private plt: Platform
	) 
	{
    //  validation pattern start
		let email_pattern = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
		this.contactData = new FormGroup({
			firstName: new FormControl('', [Validators.required]),       
			email: new FormControl('', [Validators.required, Validators.pattern(email_pattern)]),            
			number: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
			msg: new FormControl('', [Validators.required]),
		});
	}
	   
	ngOnInit() {}

   	async contact_us(){
			if(!this.contact.email.match(this.regExEmail)){
				const toast = await this.toastController.create({
					message: 'Invalid email address.',
					position:'bottom',
					color:"dark",
					duration: 2000
				});
				toast.present();
			}else{
				this.spinner.show();
				let contact_us = {
					"firstName":this.contact.firstName,
					"email":this.contact.email,
					"msg":this.contact.msg,
					"number":this.contact.number,
					"apikey":this.globalService.APIKey,
				}
				this.globalService.contact_us_user(contact_us)
				.then(async data => {
					this._status = data['ErrorCode']
					this.message = data['message']
					this.spinner.hide();
					if(this._status=='0'){
						const toast = await this.toastController.create({
							message: 'successfully sent your query',
							position:'bottom',
							color:"success",
							duration: 3000
						});
						this.contactData.reset();
						toast.present();
					}else if(this._status=='1'){
						const alert = await this.alertController.create({
							message: 'Do not sent your msg',
							buttons: ['OK']
						});
						await alert.present();	
					}		
					})
				}
			}
		 
	// number Accept only start
	numberAccept(event): boolean {
		const charCode = (event.which) ? event.which : event.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
			return false;
		}
		return true;
	}

}
