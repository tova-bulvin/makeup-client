import { Component, OnInit } from '@angular/core';
import { CompanyDto } from '../models/dto/companyDto';
import { CompanyService } from '../services/company.service';
import { NavigationExtras, Router } from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import{FormGroup, FormControl, Validators} from "@angular/forms"

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})

export class CompanyComponent implements OnInit {
  listCompanies:CompanyDto[]
  constructor(private router: Router,private companyService:CompanyService) { 
  }

  ngOnInit() {
   
    this.companyService.loadCompany().subscribe(
      (data: CompanyDto[]) => {
        this.listCompanies = data; 
      },
      fail => alert("problem with load companies list"));
  }

  deleteCompany(companyId){
    this.companyService.deleteCompany(companyId).subscribe(
      (data:any) => {
        this.ngOnInit()
      },
      fail => this.ngOnInit()
    )
  }

  back(){
    this.router.navigateByUrl('/admin-main')
  }

  public edit(company) {
    let navigationExtras: NavigationExtras = {
        queryParams: {
          "id":company.id ,
          "name": company.name
        }
    };
    this.router.navigate(["edit-company"], navigationExtras);
  }
}

