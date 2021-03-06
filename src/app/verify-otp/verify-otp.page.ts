import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController,AlertController, ActionSheetController, MenuController, IonSlides, Platform } from '@ionic/angular';
import { Router, Navigation } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GlobalService } from '../../globalServices/global.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.page.html',
  styleUrls: ['./verify-otp.page.scss'],
})
export class VerifyOtpPage implements OnInit {

  otp_type: any;
  sent_otp: FormGroup;
	get_otp = {
		otp:"", 
	};
  _status: any;
  Message: any;
  email: any;

  constructor(
    private router : Router, 
    public toastController:ToastController,
		public alertController: AlertController,
		public gobalService:GlobalService,
		public menu: MenuController,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private spinner: NgxSpinnerService,
		private storage: Storage,
  ) { 

      this.sent_otp = new FormGroup({
        otp: new FormControl('', [Validators.required]),            
      });
    }

    ngOnInit() {
      this.storage.get('otp_type').then((val) => {
        this.otp_type = val;
      });
      this.storage.get('email').then((val) => {
        this.email = val;
      });
      
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#233658;');
    }

    ionViewWillEnter() {
      this.menu.enable(false);
    }

    ionViewDidLeave() {
      this.menu.enable(false);
    }

  async otp(){
    let otpDataObj = {
      'email':this.email,
      'otp':this.get_otp.otp,
      'apikey':this.gobalService.APIKey,
    }
    this.spinner.show(); 
    if(this.get_otp.otp.length == 4){
      this.gobalService.email_verify_otp(otpDataObj)
      .then(async data => {
        this._status = data['ErrorCode']
        this.Message = data['message'];
        this.spinner.hide();
        if(this._status=='0'){
          this.router.navigateByUrl('/sign-in')
          this.sent_otp.reset();
        }else if(this._status=='1'){
          const toast = await this.toastController.create({
            message: 'Please fill the valid Otp',
            position:'bottom',
            color:"dark",
            duration: 3000
          });
          toast.present();
        }
      })
    }
  }

  // resend otp code start
	async resend_otp(){
		const alert = await this.alertController.create({
			message: 'Are you sure you want to resend otp.',
			buttons: [{
					text: 'Cancel',
					role: 'cancel',
					cssClass: 'secondary',
				},
				{
					text: 'ok',
					handler: () => {
						this.re_sent_otp()
				}
			}]
		});
		await alert.present();
	}

	async re_sent_otp(){
    let otpDataObj = {
      'email':this.email,
      'apikey':this.gobalService.APIKey,
    }
		this.spinner.show();
		this.gobalService.forgot_password(otpDataObj)
			.then(async data => {
	    this.spinner.hide();
			let _status = data['ErrorCode']
			if(_status=='0'){
        const toast = await this.toastController.create({
					message: 'Send otp your register mobile no.',
					position:'bottom',
					color:"success",
					duration: 3000
				});
				toast.present();
			}else{
				const toast = await this.toastController.create({
					message: 'Not send otp.',
					position:'bottom',
					color:"dark",
					duration: 3000
				});
				toast.present();
			}
		})
	}

	numberAccept(event): boolean {
		const charCode = (event.which) ? event.which : event.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		  return false;
		}
		return true;
	}

}
