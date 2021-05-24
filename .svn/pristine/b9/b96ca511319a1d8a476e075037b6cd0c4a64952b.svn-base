import { Component, OnInit } from '@angular/core';
import { Router, Navigation } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register-select',
  templateUrl: './register-select.page.html',
  styleUrls: ['./register-select.page.scss'],
})
export class RegisterSelectPage implements OnInit {

  constructor(private router : Router,private spinner: NgxSpinnerService,) { }

  ngOnInit() {
  }

  slideChanged(slide){
    this.spinner.show();
    if(slide=='lawyer_firm'){
      this.spinner.hide();
      this.router.navigateByUrl('/register')
    }else{
      this.spinner.hide();
      this.router.navigateByUrl('/register-user')
    }
  }
}
