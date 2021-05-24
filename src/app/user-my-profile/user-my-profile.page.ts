import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../globalServices/global.service'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-my-profile',
  templateUrl: './user-my-profile.page.html',
  styleUrls: ['./user-my-profile.page.scss'],
})
export class UserMyProfilePage implements OnInit {
	
  _status: any;
	user_all_data: any;
	user_data: any;

  constructor(
    private routers : ActivatedRoute,
		public globalService:GlobalService,
    public spinner:NgxSpinnerService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.user_prf()
  }

  ionViewWillEnter(){
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
				this.user_all_data = new Array
				this.user_all_data.push(this.user_data)
			}else{
				// do nothing
			}
		})
	}

	edit_user(){
		this.router.navigateByUrl('/user-edit')
	}

}
