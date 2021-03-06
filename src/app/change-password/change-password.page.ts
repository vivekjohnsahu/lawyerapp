import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { GlobalService } from '../../globalServices/global.service'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  user_change_pasw:any;
  user_type_nr:any;
  changePassword: FormGroup;
  change_pw = {
    old_password:"",
    new_password:"",
    comf_password:"",
  };
  _status: any;
  user_type: any;

  constructor(
    public alertController: AlertController,
    public toastController:ToastController,
		public globalService:GlobalService,
		public spinner:NgxSpinnerService,
    ) 
  {
    //  validation pattern start
    this.changePassword = new FormGroup({
        old_password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
        new_password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
        comf_password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
      });
    //  validation pattern end
  }

  // alert box start
  async changePass(){
    this.spinner.show()   
    if (this.change_pw.new_password !=  this.change_pw.comf_password){
      this.spinner.hide()
      const alert = await this.alertController.create({
        message: 'Confirm Password does not match the New Password .',
        buttons: ['OK']
      });
      await alert.present();
    }else if(this.change_pw.old_password && this.change_pw.new_password && this.change_pw.comf_password){
      var user = JSON.parse(localStorage.getItem('details_user'));
      var FilterUser = JSON.parse(localStorage.getItem('details_user'));
      if(FilterUser[0].user_type=='3'){
        this.user_type_nr="1"
      }else if(FilterUser[0].user_type=='2'){
        this.user_type_nr="2"
      }
      this.user_change_pasw = {
        "old_password":this.change_pw.old_password,
        "new_password":this.change_pw.new_password,
        "apikey":this.globalService.APIKey,
        "user_id":user[0].id,
        "user_type":this.user_type_nr
      }
      this.globalService.change_pass(this.user_change_pasw)
      .then(async data => {
        this.spinner.hide()
        this._status = data['ErrorCode']
        this.user_type = data['user_type']
        if(this._status=='0'){
          const toast = await this.toastController.create({
            message: 'Successfully changed your password.',
            position:'bottom',
            color:"success",
            duration: 3000
          });
        toast.present();
        }else if(this._status=='1'){
          const toast = await this.toastController.create({
            message: 'Do not changed your password.',
            position:'bottom',
            color:"dark",
            duration: 3000
          });
        toast.present();
        }
      })
      this.changePassword.reset();
    }
  }
  ngOnInit() {
  }

}
