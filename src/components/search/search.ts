import { NavController, ViewController, NavParams } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

@Component({
    selector: 'search',
    templateUrl: 'search.html'
})

export class Search{
    @ViewChild('searchBar') sb;

    searchTerm: string = '';
    searchControl: FormControl;
    items: any;
    searching: boolean = false;
    rawItems: any;
    labelField: string;
    title: string;
    constructor(
        public navCtrl: NavController,
        public viewCtrl: ViewController,
        public navParams: NavParams) {
        this.searchControl = new FormControl();
    }
 
    ionViewDidLoad() {
        this.rawItems = this.navParams.get('rawItems');
        this.labelField = this.navParams.get('labelField');
        this.title = this.navParams.get('title');
        this.sb.setFocus();
        this.setFilteredItems();
 
        this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
 
            this.searching = false;
            this.setFilteredItems();
 
        });
 
 
    }
 
    onSearchInput(){
        this.searching = true;
    }
 
    setFilteredItems() {
 
       this.items = this.filterItems(this.searchTerm);
 
    }

    filterItems(searchTerm){
 
        return this.rawItems.filter((item) => {
            return item[this.labelField].toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });     
 
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    onItemClick(item) {
        this.viewCtrl.dismiss(item);
    } 
}