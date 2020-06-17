import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {MenuItem} from "primeng/primeng";
import {Menu} from "primeng/components/menu/menu";
import {ActivatedRoute, Router} from "@angular/router";
import { LoginService } from '../services'
import {TabMenuModule} from 'primeng/tabmenu';

declare var jQuery :any;

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @ViewChild('bigMenu') bigMenu : Menu;
  @ViewChild('smallMenu') smallMenu : Menu;
  
  items: MenuItem[];
  miniMenuItems: MenuItem[];

  constructor(private router : Router,public serviceLogin:LoginService) {

  }

  ngOnInit() {

    let handleSelected = function(event) {
      let allMenus = jQuery(event.originalEvent.target).closest('ul');
      let allLinks = allMenus.find('.menu-selected');

      allLinks.removeClass("menu-selected");
      let selected = jQuery(event.originalEvent.target).closest('a');
      selected.addClass('menu-selected');
    }

    this.items = [
      {label: 'companies' , icon: 'pi pi-tag', routerLink: ['/company']},
      {label: 'products', icon: 'pi pi-tags', routerLink: ['/product']},
      {label: 'back home', icon: 'pi pi-home', routerLink: ['/main-menu']},
    ]
  } 
}
