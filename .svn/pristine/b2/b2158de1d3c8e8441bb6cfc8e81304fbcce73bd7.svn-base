import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

	public BaseUrl= 'http://projects.tekshapers.in/lawyerapp/webservices/webapi/';
	public APIKey='lawyer_L51r143567';

  	constructor(public http: HttpClient){}	
	
	register_user(data){
		return new Promise((resolve, reject) => {
		   	this.http.post(this.BaseUrl+'signup',JSON.stringify(data)).subscribe(res => {
				resolve(res);
			}, 
			(err) => {
				reject(err);
				alert("Server Error");
			});
		});
	}
// ---------------------------------------------------------

	practice(data){
		return new Promise((resolve, reject) => {
		   	this.http.post(this.BaseUrl+'get_practice_area',JSON.stringify(data)).subscribe(res => {
				resolve(res);
			}, 
			(err) => {
				reject(err);
				alert("Server Error");
			});
		});
	}
// ---------------------------------------------------------

	login_user(data){
		return new Promise((resolve, reject) => {
			this.http.post(this.BaseUrl+'front_login',JSON.stringify(data)).subscribe(res => {
				resolve(res);
			}, 
			(err) => {
				reject(err);
				alert("Service Error");
			});
		});
	}
// ---------------------------------------------------------

	register_lawyer(data){
		return new Promise((resolve, reject) => {
			this.http.post(this.BaseUrl+'lawfirm_signup',JSON.stringify(data)).subscribe(res => {
				resolve(res);
			}, 
			(err) => {
				reject(err);
				alert("Service Error");
			});
		});
	}
// ---------------------------------------------------------

	email_verify_otp(data){
		return new Promise((resolve, reject) => {
			this.http.post(this.BaseUrl+'verify_otp',JSON.stringify(data)).subscribe(res => {
				resolve(res);
			}, 
			(err) => {
				reject(err);
				alert("Service Error");
			});
		});
	}
// ---------------------------------------------------------

	lawyer_firm_list(data){
		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		return new Promise((resolve, reject) => {
			this.http.post(this.BaseUrl+'get_list_lawfirms',data,{"headers":headers}).subscribe(res => {
				resolve(res);
			}, 
			(err) => {
				reject(err);
				alert("Service Error3");
			});
		});
	}
// ---------------------------------------------------------

	personal_detail(data){
		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		return new Promise((resolve, reject) => {
			this.http.post(this.BaseUrl+'get_single_lawfirms',data,{"headers":headers}).subscribe(res => {
				resolve(res);
			}, 
			(err) => {
				reject(err);
				alert("Service Error");
			});
		});
	}

// ---------------------------------------------------------

	firm_lawyer(data){
		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		return new Promise((resolve, reject) => {
			this.http.post(this.BaseUrl+'list_lawyers',data,{"headers":headers}).subscribe(res => {
				resolve(res);
			}, 
			(err) => {
				reject(err);
				alert("Service Error");
			});
		});
	}
// ---------------------------------------------------------

	enquiry(data){
		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		return new Promise((resolve, reject) => {
			this.http.post(this.BaseUrl+'add_enquiry',data,{"headers":headers}).subscribe(res => {
				resolve(res);
			}, 
			(err) => {
				reject(err);
				alert("Service Error");
			});
		});
	}
// ---------------------------------------------------------

	lawyer_profile(data){
		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		return new Promise((resolve, reject) => {
			this.http.post(this.BaseUrl+'single_lawyer',data,{"headers":headers}).subscribe(res => {
				resolve(res);
			}, 
			(err) => {
				reject(err);
				alert("Service Error");
			});
		});
	}
// ---------------------------------------------------------

	about_us(data){
		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		return new Promise((resolve, reject) => {
			this.http.post(this.BaseUrl+'about_us',data,{"headers":headers}).subscribe(res => {
				resolve(res);
			}, 
			(err) => {
				reject(err);
				alert("Service Error");
			});
		});
	}
// ---------------------------------------------------------

	Term_condition(data){
		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		return new Promise((resolve, reject) => {
			this.http.post(this.BaseUrl+'term_condition',data,{"headers":headers}).subscribe(res => {
				resolve(res);
			}, 
			(err) => {
				reject(err);
				alert("Service Error");
			});
		});
	}
// ---------------------------------------------------------

	forgot_password(data){
		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		return new Promise((resolve, reject) => {
			this.http.post(this.BaseUrl+'forget_password',data,{"headers":headers}).subscribe(res => {
				resolve(res);
			}, 
			(err) => {
				reject(err);
				alert("Service Error");
			});
		});
	}
// ---------------------------------------------------------

	create_new_pass(data){
		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		return new Promise((resolve, reject) => {
			this.http.post(this.BaseUrl+'change_password',data,{"headers":headers}).subscribe(res => {
				resolve(res);
			}, 
			(err) => {
				reject(err);
				alert("Service Error");
			});
		});
	}
// ---------------------------------------------------------

	search_skill(data){
		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		return new Promise((resolve, reject) => {
			this.http.post(this.BaseUrl+'skill_list',data,{"headers":headers}).subscribe(res => {
				resolve(res);
			}, 
			(err) => {
				reject(err);
				alert("Service Error");
			});
		});
	}
// ---------------------------------------------------------

	lawyer_add(data){
		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		return new Promise((resolve, reject) => {
			this.http.post(this.BaseUrl+'add_lawyers',data,{"headers":headers}).subscribe(res => {
				resolve(res);
			}, 
			(err) => {
				reject(err);
				alert("Service Error");
			});
		});
	}
// ---------------------------------------------------------

	get_enquiry(data){
		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		return new Promise((resolve, reject) => {
			this.http.post(this.BaseUrl+'list_enquiry',data,{"headers":headers}).subscribe(res => {
				resolve(res);
			}, 
			(err) => {
				reject(err);
				alert("Service Error");
			});
		});
	}
// ---------------------------------------------------------

	single_enquiry(data){
		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		return new Promise((resolve, reject) => {
			this.http.post(this.BaseUrl+'single_enquiry',data,{"headers":headers}).subscribe(res => {
				resolve(res);
			}, 
			(err) => {
				reject(err);
				alert("Service Error");
			});
		});
	}
// ---------------------------------------------------------

	change_pass(data){
		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		return new Promise((resolve, reject) => {
			this.http.post(this.BaseUrl+'change_password_data',data,{"headers":headers}).subscribe(res => {
				resolve(res);
			}, 
			(err) => {
				reject(err);
				alert("Service Error");
			});
		});
	}
// ---------------------------------------------------------

	contact_us_user(data){
		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		return new Promise((resolve, reject) => {
			this.http.post(this.BaseUrl+'contact_page_us',data,{"headers":headers}).subscribe(res => {
				resolve(res);
			}, 
			(err) => {
				reject(err);
				alert("Service Error");
			});
		});
	}
// ---------------------------------------------------------

	edit_lawyers(data){
		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		return new Promise((resolve, reject) => {
			this.http.post(this.BaseUrl+'edit_lawyers',data,{"headers":headers}).subscribe(res => {
				resolve(res);
			}, 
			(err) => {
				reject(err);
				alert("Service Error");
			});
		});
	}
// ---------------------------------------------------------

	subscribe_chek(data){
		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		return new Promise((resolve, reject) => {
			this.http.post(this.BaseUrl+'check_subscription_plan',data,{"headers":headers}).subscribe(res => {
				resolve(res);
			}, 
			(err) => {
				reject(err);
				alert("Service Error");
			});
		});
	}
// ---------------------------------------------------------

	plan(data){
		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		return new Promise((resolve, reject) => {
			this.http.post(this.BaseUrl+'list_membership_plan',data,{"headers":headers}).subscribe(res => {
				resolve(res);
			}, 
			(err) => {
				reject(err);
				alert("Service Error");
			});
		});
	}
// ---------------------------------------------------------

	my_profile(data){
		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		return new Promise((resolve, reject) => {
			this.http.post(this.BaseUrl+'lawfirm_profile',data,{"headers":headers}).subscribe(res => {
				resolve(res);
			}, 
			(err) => {
				reject(err);
				alert("Service Error");
			});
		});
	}
// ---------------------------------------------------------

	search(data){
		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		return new Promise((resolve, reject) => {
			this.http.post(this.BaseUrl+'search_services',data,{"headers":headers}).subscribe(res => {
				resolve(res);
			}, 
			(err) => {
				reject(err);
				alert("Service Error");
			});
		});
	}
// ---------------------------------------------------------

	userFilter(data){
		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		return new Promise((resolve, reject) => {
			this.http.post(this.BaseUrl+'get_list_lawfirms',data,{"headers":headers}).subscribe(res => {
				resolve(res);
			}, 
			(err) => {
				reject(err);
				alert("Service Error");
			});
		});
	}
// ---------------------------------------------------------
	
	lawyer_firm_edit(data){
		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		return new Promise((resolve, reject) => {
			this.http.post(this.BaseUrl+'edit_lawfirm',data,{"headers":headers}).subscribe(res => {
				resolve(res);
			}, 
			(err) => {
				reject(err);
				alert("Service Error");
			});
		});
	}
// ---------------------------------------------------------

	user_profile(data){
		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		return new Promise((resolve, reject) => {
			this.http.post(this.BaseUrl+'user_profile',data,{"headers":headers}).subscribe(res => {
				resolve(res);
			}, 
			(err) => {
				reject(err);
				alert("Service Error");
			});
		});
	}
// ---------------------------------------------------------

	user_profile_edit(data){
		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		return new Promise((resolve, reject) => {
			this.http.post(this.BaseUrl+'edit_user',data,{"headers":headers}).subscribe(res => {
				resolve(res);
			}, 
			(err) => {
				reject(err);
				alert("Service Error");
			});
		});
	}
// ---------------------------------------------------------

	plan_activate(data){
		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		return new Promise((resolve, reject) => {
			this.http.post(this.BaseUrl+'add_suscription_plan',data,{"headers":headers}).subscribe(res => {
				resolve(res);
			}, 
			(err) => {
				reject(err);
				alert("Service Error");
			});
		});
	}
// ---------------------------------------------------------

	get_notification(data){
		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		return new Promise((resolve, reject) => {
			this.http.post(this.BaseUrl+'get_user_notification',data,{"headers":headers}).subscribe(res => {
				resolve(res);
			}, 
			(err) => {
				reject(err);
				alert("Service Error2");
			});
		});
	}
// ---------------------------------------------------------

check_basic(data){
		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		return new Promise((resolve, reject) => {
			this.http.post(this.BaseUrl+'check_basic_subscription',data,{"headers":headers}).subscribe(res => {
				resolve(res);
			}, 
			(err) => {
				reject(err);
				alert("Service Error2");
			});
		});
	}
// ---------------------------------------------------------

}
