import { Injectable } from '@angular/core';
//import { Http, Response } from '@angular/http';
//import { Observable }     from 'rxjs/Observable';
//import 'rxjs/Rx';

@Injectable()
export class AppService {
    
    constructor(){
        this.env = this.DEV;
    }
    //const navigator:any;
    //public customerProfileState: number = 1;
    public isOnline: boolean = navigator.onLine;
    public signUpType: number;
    public loginUserDetails: any;

    //public prescriptionPics: any; 
    //public prescriptionItems: any;
     
    public types: any;
    //public isProductsLoaded: boolean;
    //public products: any;

    public env: number;

    private DEV: number = 0;
    private UAT: number = 1;
    private PROD: number = 2;

    
    // getCustomers(){
    //     return this.http.get('http://localhost:8080/info.php')
    //                 .map(res => res.json());
    // }
}