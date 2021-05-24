import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../globalServices/global.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-active-plan',
  templateUrl: './active-plan.page.html',
  styleUrls: ['./active-plan.page.scss'],
})
export class ActivePlanPage implements OnInit {
    active_plan: any;

  constructor(
    public gobalService:GlobalService,
    public spinner:NgxSpinnerService,
    ) { }

  ngOnInit() {
    this.plan_list()
  }

  ionViewWillEnter(){
    this.plan_list()
  }

  plan_list(){
    this.spinner.show()
    var User = JSON.parse(localStorage.getItem('details_user'));
       let key = {
            'apikey':this.gobalService.APIKey,
            'user_id':User[0].id
        }
        this.gobalService.plan(key)
        .then(data => {
            this.spinner.hide()
            this.active_plan = data
            this.active_plan = this.active_plan.data
        })
    }

}
