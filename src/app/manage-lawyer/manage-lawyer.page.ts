import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NavController,AlertController,ActionSheetController, ToastController,Platform } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { compileDirective } from '@angular/core/src/render3/jit/directive';
import { GlobalService } from '../../globalServices/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, Navigation } from '@angular/router';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-manage-lawyer',
  templateUrl: './manage-lawyer.page.html',
  styleUrls: ['./manage-lawyer.page.scss'],
})

export class ManageLawyerPage implements OnInit {
 
	step_contant_1:boolean=true;
	step_contant_2:boolean;
	step_contant_3:boolean;
	fill_step_:number=0;
	ImageBind:any = 'https://www.w3schools.com/howto/img_avatar.png';
	ImageData='';
	skills:any;
	skill_add=[];  
	public searchText : string;
	manageLawyer: FormGroup;
	LawyerData = {
		firstname:"",
		lastname:"",
		email:"",
		number:"",
		date:"",
	};

	LawyerAddress: FormGroup;
	LawyerLocation = {
		address:"",
		city:"",
	};
	_status: any;
	Message: any;
	pass_skill=[];
	selected_city: any;
	successcribed_app: any;
	list_show=false
	skill_add_edit:string;
	skills_view:any;
	skill_key:any
	_status_skill: any;
	no_data=1;
	lawyer_skill_remove=0

	constructor(
		public navCtrl: NavController,
		private camera:Camera, 
		private actionSheetController:ActionSheetController,
		public alertController:AlertController,
		public gobalService:GlobalService,
		private spinner: NgxSpinnerService,
		private router : Router,
		public toastController:ToastController, 
		public events: Events,
		private storage:Storage,
		private platform: Platform,
	) {

    //  validation pattern start
		let email_pattern = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
		this.manageLawyer = new FormGroup({
			firstname: new FormControl('', [Validators.required]),
			lastname: new FormControl(),       
			email: new FormControl('', [Validators.required, Validators.pattern(email_pattern)]),            
			number: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]),
			date: new FormControl('', [Validators.required]),
		});


		this.LawyerAddress = new FormGroup({
			address: new FormControl('', [Validators.required]),   
			city: new FormControl('', [Validators.required]),           
		});

		this.platform.backButton.subscribe(() => {
				this.presentConfirm();  
		})
			
	}

	ionViewWillEnter(){
		this.step_contant_1=true;
		this.step_contant_2=false;
		this.step_contant_3=false;
	}

	ngOnInit() {
			var lawyer_all_data = JSON.parse(localStorage.getItem('lawyer_all_data'));
			if(lawyer_all_data!='' && lawyer_all_data!=undefined && lawyer_all_data!=null){
				this.LawyerData = {
					firstname:lawyer_all_data[0].first_name,
					lastname:lawyer_all_data[0].last_name,
					email:lawyer_all_data[0].email,
					number:lawyer_all_data[0].contact_number,
					date:lawyer_all_data[0].dob,
				};
				this.LawyerLocation = {
					address:lawyer_all_data[0].address,
					city:lawyer_all_data[0].location,
				};
				this.ImageBind=lawyer_all_data[0].lawyer_image
				this.skill_add_edit = lawyer_all_data[0].add_skills
				this.skill_add = this.skill_add_edit.split(',')
				this.pass_skill.push(lawyer_all_data[0].skill)
				this.selected_city = lawyer_all_data[0].location;
				this.getISkill()
			}else{
				this.selected_city = ''
				this.LawyerData = {
					firstname:"",
					lastname:"",
					email:"",
					number:"",
					date:"",
				};
				this.LawyerLocation = {
					address:"",
					city:"",
				};
				this.ImageBind = 'https://www.w3schools.com/howto/img_avatar.png';
				this.pass_skill=[]
				this.skill_add=[]
			}
	}

	// template html code start
	async step_1(){
		var lawyer_all_data = JSON.parse(localStorage.getItem('lawyer_all_data'));
		if(lawyer_all_data=='' || lawyer_all_data==undefined || lawyer_all_data==null){
			this.lawyer_skill_remove=1
			if(this.step_contant_1!=true){
				const alert = await this.alertController.create({
					message: 'Conform back to first step',
					buttons: [{
						text: 'Cancel',
						role: 'cancel',
						cssClass: 'secondary',
						},
						{
						text: 'ok',
						handler: () => {
							this.step_contant_1=true;
							this.step_contant_2=false;
							this.step_contant_3=false;
							this.fill_step_=0;
						}
					}]
				});
				await alert.present();
			}
		}else{
			this.step_contant_1=true;
			this.step_contant_2=false;
			this.step_contant_3=false;
		}
	}
		
	async step_2(){
		var lawyer_all_data = JSON.parse(localStorage.getItem('lawyer_all_data'));
		if(lawyer_all_data=='' || lawyer_all_data==undefined || lawyer_all_data==null){
			if(this.step_contant_2!=true){
				if(this.fill_step_==0){
					const alert = await this.alertController.create({
						message: 'Fill the first step and move next step',
						buttons: ['OK']
					});
					await alert.present();
				}else if(this.fill_step_==1 || this.fill_step_==2){
					const alert = await this.alertController.create({
						message: 'Conform back to second step',
						buttons: [{
							text: 'Cancel',
							role: 'cancel',
							cssClass: 'secondary',
							},
							{
							text: 'ok',
							handler: () => {
								this.step_contant_2=true;
								this.step_contant_1=false;
								this.step_contant_3=false;
								this.fill_step_=1;
							}
						}]
					});
					await alert.present();
				}
			}
		}else{
			this.step_contant_2=true;
			this.step_contant_1=false;
			this.step_contant_3=false;
		}
		
	}
	
	async step_3(){
		var lawyer_all_data = JSON.parse(localStorage.getItem('lawyer_all_data'));
		if(lawyer_all_data=='' || lawyer_all_data==undefined || lawyer_all_data==null){
			if(this.step_contant_3!=true){
				if(this.fill_step_==2){
					const alert = await this.alertController.create({
						message: 'Fill the first step and move next step',
						buttons: ['OK']
					});
					await alert.present();
				}else if(this.fill_step_==1){
					const alert = await this.alertController.create({
						message: 'Fill the second step and move next step',
						buttons: ['OK']
					});
					await alert.present();
				}else if(this.fill_step_==0){
					const alert = await this.alertController.create({
						message: 'Fill the first and second step and move third step',
						buttons: ['OK']
					});
					await alert.present();
				}
			}
		}else{
			this.step_contant_2=false;
			this.step_contant_1=false;
			this.step_contant_3=true;
		}
	}
	// template html code end

	// form validation start
	Lawyer_stap_1(){
		var lawyer_all_data = JSON.parse(localStorage.getItem('lawyer_all_data'));
		if(lawyer_all_data=='' || lawyer_all_data==undefined || lawyer_all_data==null){
			this.lawyer_skill_remove=1
		}
		this.step_contant_2=true;
		this.step_contant_1=false;
		this.step_contant_3=false;
		this.fill_step_=1;
	}

	async Lawyer_stap_2(){
		if(this.skill_add.length == 0){
			const alert = await this.alertController.create({
				message: 'Add your skill',
				buttons: ['OK']
			});
			await alert.present();
		}else{
			this.step_contant_3=true;
			this.step_contant_1=false;
			this.step_contant_2=false;
			this.fill_step_=2;
		}
	}

	Lawyer_stap_3(){
		this.spinner.show();
		var lawyer_all_data = JSON.parse(localStorage.getItem('lawyer_all_data'));
      if(lawyer_all_data!='' && lawyer_all_data!=undefined && lawyer_all_data!=null){
			let lawyer_info = {
				first_name:this.LawyerData.firstname,
				last_name:this.LawyerData.lastname,
				email:this.LawyerData.email,
				contact_number:this.LawyerData.number,
				dob:this.LawyerData.date,
				id:lawyer_all_data[0].id,
				lawyer_image:this.ImageData,
				apikey:this.gobalService.APIKey,
				skill:this.pass_skill,
				// skill:this.skill_add,
				address:this.LawyerLocation.address,
				location:this.LawyerLocation.city
			}
			this.gobalService.edit_lawyers(lawyer_info)
			.then(async data => {
				this._status = data['ErrorCode']
				this.Message = data['message'];
				this.spinner.hide();
				if(this._status=='0'){
					const alert = await this.alertController.create({
						message: this.Message,
						buttons: [{
						text: 'Ok',
							handler: () => {
								this.router.navigateByUrl('/profile-user-edit'+'/'+lawyer_all_data[0].id);
								localStorage.removeItem('lawyer_all_data')
								this.manageLawyer.reset();
								this.LawyerAddress.reset();
							}
						}]
					});
					await alert.present();
			}else if(this._status=='1'){
					const alert = await this.alertController.create({
						message: this.Message,
						buttons: [{
						text: 'Ok',
							handler: () => {
								this.step_contant_1=true;
								this.step_contant_2=false;
								this.step_contant_3=false;
								this.fill_step_=0;
							}
						}]
					});
				await alert.present();
			}else{
				const toast = await this.toastController.create({
					message: this.Message,
					position:'bottom',
					color:"dark",
					duration: 3000
				});
				toast.present();
			}
		})
		localStorage.removeItem('lawyer_all_data')
		}else{
			let user = JSON.parse(localStorage.getItem('details_user'));
			let lawyer_info = {
				firstname:this.LawyerData.firstname,
				lastname:this.LawyerData.lastname,
				email:this.LawyerData.email,
				number:this.LawyerData.number,
				dob:this.LawyerData.date,
				lawfirm_id:user[0].id,
				lawyer_image:this.ImageData,
				apikey:this.gobalService.APIKey,
				skill:this.pass_skill,
				address:this.LawyerLocation.address,
				location:this.LawyerLocation.city
			}
			console.log(lawyer_info)
			this.gobalService.lawyer_add(lawyer_info)
			.then(async data => {
				this._status = data['ErrorCode']
				this.Message = data['message'];
				this.spinner.hide();
				if(this._status=='0'){
					const alert = await this.alertController.create({
						message: this.Message,
						buttons: [{
						text: 'Ok',
							handler: () => {
								// this.router.navigateByUrl('/my-profile')
								this.router.navigateByUrl('/home')
								this.manageLawyer.reset();
								this.LawyerAddress.reset();
							}
						}]
					});
					await alert.present();
				}else if(this._status=='2'){
						const alert = await this.alertController.create({
							message: this.Message,
							buttons: ['Ok']
						});
						await alert.present();
						// this.router.navigateByUrl('/plan')
				}else if(this._status=='1'){
					const alert = await this.alertController.create({
						message: this.Message,
						buttons: [{
						text: 'Ok',
							handler: () => {
								this.step_contant_1=true;
								this.step_contant_2=false;
								this.step_contant_3=false;
								this.fill_step_=0;
							}
						}]
					});
					await alert.present();
				}else{
					const toast = await this.toastController.create({
						message: this.Message,
						position:'bottom',
						color:"dark",
						duration: 3000
					});
					toast.present();
				}
			})
		}	
	}
 
  // image popup start
	async SelectPhoto() {
		const actionSheet = await this.actionSheetController.create({
			buttons: [{
				text: 'Camera',
				icon: 'Camera',
				handler: () => {
					let sourceType =1;
					this.takePhoto(1);
				}
			}, {
				text: 'Gallery',
				icon: 'images',
				handler: () => {
					let sourceType =2;
					this.takePhoto(2);
				}
			}, {
				text: 'Cancel',
				icon: 'close',
				role: 'cancel',
				handler: () => {
				}
			}]
		});
		await actionSheet.present();
	}

	// //  get image path start
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
			this.ImageData = imgData;
			this.ImageBind =  "data:image/jpg;base64," + imgData;
		});
	}

	// search and add skills start
	getISkill(){
		setTimeout(() => {
			this.skill_key = this.searchText;
			if(this.skill_key.length>0){
				let key = {
					apikey:this.gobalService.APIKey,
					key:this.skill_key
				}
				this.gobalService.search_skill(key)
				.then(data => {
					this._status_skill = data['ErrorCode']
					if(this._status_skill==0){
						this.no_data=1;
						this.skills_view = data;
						this.skills=this.skills_view.data;
						this.refreshSkills();
					}else{
						// alert('1')
						this.no_data=2;
					}
				}) 
			}
		}, 500);
	}

	add_lawyer_skills(vl,i,id){
		this.skill_add.push(vl)
		this.pass_skill.push(id)
		this.refreshSkills();
	}

	refreshSkills(){
		this.skill_add.map((val)=>{
			let skillObj = this.skills.find((skill)=>{
				return skill.practice_area==val;
			})
			let index = this.skills.indexOf(skillObj);
			if(index != -1){// if added skill is in main skills array...
				this.skills.splice(index,1);
			}
		})
	}

	remove_skill(index,skillName){
		let obj ={
			id:this.pass_skill[index],
			practice_area:skillName,
			status: "active"
		}
		console.log(skillName)
		console.log(obj)
		console.log(index)
	  this.skills.push(obj);
		this.skill_add.splice(index,1)
		this.pass_skill.splice(index,1)
	}

	remove_all_skill(){
		this.skill_add = []
		this.pass_skill = []
		this.getISkill()
	}

	// number Accept only start
	numberAccept(event): boolean {
		const charCode = (event.which) ? event.which : event.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		  return false;
		}
		return true;
	}

	user_click(){
		var lawyer_all_data = JSON.parse(localStorage.getItem('lawyer_all_data'));
		if(lawyer_all_data!='' && lawyer_all_data!=undefined && lawyer_all_data!=null){
			localStorage.removeItem('lawyer_all_data')
		}
	}

	presentConfirm() {
		this.user_click()
		this.router.navigateByUrl('/home')		
	}

	focusFunction(){
		setTimeout(() => {
			this.list_show=true
		}, 300);
	}

}

