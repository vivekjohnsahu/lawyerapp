import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from '../../globalServices/global.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  public term : string;
  _status: any;
  Message: any;
  no_data=1;

  constructor(
    private spinner: NgxSpinnerService,
    public gobalService:GlobalService,
    private router: Router, 
    ) { 
  }
  search_cmt:any;
  user_name:any
  
  getISkill(e){
    this.user_name = this.term;
    if(e.length>1){
      let obj ={
        'apikey':this.gobalService.APIKey,
        'keyword':e
      }
      this.gobalService.search(obj)
      .then(data=>{
        this._status = data['ErrorCode']
        this.Message = data['message'];
        if(this._status==0){
          this.no_data=1;
          this.search_cmt=data;
          this.search_cmt=this.search_cmt.data;
        }else{
          this.no_data=2;
        }
      })  
    }
    
	}

  go_to_all(id){
      this.router.navigateByUrl('/firm-details'+'/'+id);
  }

  ngOnInit() {
  }

}
