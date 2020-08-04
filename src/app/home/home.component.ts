import { Component, OnInit } from '@angular/core';
import {TabMenuModule} from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api/menuitem';
import {HeaderTopComponent} from "../header/header.component"


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: MenuItem[];
  constructor() { }

  ngOnInit() {
    this.items = [
      {label: 'Admin', icon: 'pi pi-user', routerLink: ['/auto']},
      {label: 'Shopping', icon: 'pi pi-shopping-cart', routerLink: ['/customer-main']}
    ];
  }
}
