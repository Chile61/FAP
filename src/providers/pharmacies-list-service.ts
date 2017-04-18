import { AppService } from './../services/app-service';
import { Constants } from './../utils/constants';
import { CustomerType } from './../interfaces/customer-type';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
//import {Headers, RequestOptions} from 'angular2/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

const PHARMACIES = [
    {name: 'Honest Burgers', time: 'Open Until 8pm', delivers: 1},
    {name: 'Crowded Burgers', time: 'Open Until 12pm', delivers: 0},
    {name: 'Dis Burgers', time: 'Open Until 8pm', delivers: 1},
  ];

@Injectable()
export class PharmaciesListService {

  constructor(public http: Http, 
              public appServ: AppService) {
    
  }

  /*getPharmacies(){
        return Observable.create(observer => {
            observer.next(PHARMACIES);
            observer.complete();
        });
 
  }*/
  getPharmacies() {
        //alert(this.appServ.loginUserDetails['UserID']);
        let headers = new Headers();
        headers.append('Userid', this.appServ.loginUserDetails['UserID']);
        return this.http.get(Constants.SERVICES[this.appServ.env]['getPharmacies'], {headers: headers})
        .map(res => res.json()); 
    }

  /*insertImages() {
    let arr = [
      {name: 'Deepak', ln: 'MS', age: 32, path: '/uploads/1/Front_1.jpg'},
      {name: 'Deepak2', ln: 'MS2', age: 42, path: '/uploads/1/Front_2.jpg'}
    ];
    let headers = new Headers();
        headers.append('Arr', JSON.stringify(arr));
        return this.http.get('http://dev.findapharma.com/api/testarray.php', {headers: headers})
        .map(res => res.json());
  }*/

}
