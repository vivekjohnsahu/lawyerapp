import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { GlobalService } from '../../globalServices/global.service'
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertController} from '@ionic/angular';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  public param:any
	lawyer_details:any
	lawyer_list: any;
	lawyer_skill_show: any;
	lawyer_not_found:any;
	lawyer_not_found_vl=2;
  lawyer_all_data: {};
  lawyer_list_data:any;
  lawyer_description: any;

	constructor(
		private router:Router,
		private routers : ActivatedRoute,
		public globalService:GlobalService,
		public spinner:NgxSpinnerService,
    public alertCtrl: AlertController,
    public events: Events,
		) 
	{
	}

	ngOnInit() {
		$(".view_more > button").click(function(){
		$(".hidden_lawyer").slideToggle(300);
		$(this).toggleClass("view_less");
		});	
		this.parsn_lawyer()
	}

	ionViewWillEnter(){
		this.parsn_lawyer()
	}

	more(){
		let element=document.getElementById("hidden_para");
		element.style.display="block";
		let anchor=document.getElementById("more");
		anchor.style.display="none";
	}
	
	less(){
		let element=document.getElementById("hidden_para");
		element.style.display="none";
		let anchor=document.getElementById("more");
		anchor.style.display="inline-block";
	}

	lawyer_detail(id){
    this.events.publish('lawyer_edit', 'edit');
		this.router.navigateByUrl('/profile-user-edit'+'/'+id);
	}

//   personal detail lawyer start
	parsn_lawyer(){
    this.spinner.show();
    var user = JSON.parse(localStorage.getItem('details_user'));
		let data ={
			"apikey":this.globalService.APIKey,
			"lawfirm_id":user[0].id
		}
		this.globalService.my_profile(data)
		.then(async data => {
			let _status = data['ErrorCode']
			this.spinner.hide();
			if(_status=='0'){
				this.lawyer_details=data
				let lawyer_details_data = this.lawyer_details.data.lawfirm_profile
				this.lawyer_details = new Array;
				this.lawyer_details.push(lawyer_details_data)
        this.lawyer_skill_show=this.lawyer_details[0].lawyer_skill.split(',')
        this.lawyer_list_data = data
        this.lawyer_list_data = this.lawyer_list_data.data.lawyer_list
        this.lawyer_description =  lawyer_details_data.description
        this.lawyer_list = new Array;
        this.lawyer_list.push(this.lawyer_list_data)
        this.lawyer_list=this.lawyer_list[0]
        this.lawyer_not_found = this.lawyer_list_data;
        this.lawyer_all_data =this.lawyer_not_found;
        if(this.lawyer_not_found==false || this.lawyer_not_found==undefined || this.lawyer_not_found==null || this.lawyer_not_found==''){
          setTimeout(() => {
            this.lawyer_not_found_vl = 1
          }, 500);
        }

      }
		})
  }
  
  user_edit(){
      this.router.navigateByUrl("/manage-lawyer")
    }

	// user_click(){
	// 		this.router.navigateByUrl('/home')
	// }
}
