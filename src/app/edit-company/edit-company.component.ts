import { Component, OnInit } from '@angular/core';
import { CompanyDto } from '../models/dto/companyDto';
import { CompanyService } from '../services/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import {ButtonModule} from 'primeng/button';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {
  status:boolean
  company:CompanyDto
  form =new FormGroup({
    id:new FormControl(),
    name:new FormControl("",[Validators.required,Validators.maxLength(50)]),
  })
  constructor(private route: ActivatedRoute,private router:Router,private companyService:CompanyService,) { 
    
    this.company=new CompanyDto();
    this.status=true;
      
  }

  ngOnInit() {
   
    this.route.queryParams.subscribe(params => {
      this.form.controls.id.setValue ( params["id"]);
      this.form.controls.name.setValue( params["name"]);
    });

    if(this.form.controls.id.value>0)
      this.status=false;
    
  }

  cancel(){
    this.router.navigateByUrl('/company')
  }
  
  saveCompany(){
    if(this.form.valid){
      this.form.disable;
      this.company.id=this.form.controls.id.value
      this.company.name=this.form.controls.name.value
      if(this.status)
      {
        this.companyService.addCompany(this.company).subscribe(
        fail=> this.router.navigateByUrl("/company")
        ); 
      }
      else
      {
        this.companyService.updateCompany(this.company).subscribe(
        fail=> this.router.navigateByUrl("/company"));
      }
    }
    else
      alert("the form is not valid, fix it and try again")
  }
  
}
