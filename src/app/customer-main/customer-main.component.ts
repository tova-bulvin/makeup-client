import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FileUploadModule} from 'primeng/fileupload'
import { MessageService } from 'primeng/api/messageservice';
import {ButtonModule} from 'primeng/button';
import {ListboxModule} from 'primeng/listbox';
import { CompanyDto } from '../models/dto/companyDto';
import { MatchMakeUpDto } from '../models/dto'
import { CompanyService } from '../services/company.service';
import { createWiresService } from 'selenium-webdriver/firefox';
import { CustomerService } from '../services/customer.service';
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic"
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import {BlockUIModule} from 'primeng/blockui';
import { FormGroup, FormBuilder } from '@angular/forms';


class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-customer-main',
  templateUrl: './customer-main.component.html',
  styleUrls: ['./customer-main.component.css']
})
export class CustomerMainComponent implements OnInit {

  companies:CompanyDto[];
  selectedCompanies:CompanyDto[];
  imgURL: any;
  matchMakeUpDto:MatchMakeUpDto;
  matchMakeUpDtoRes:MatchMakeUpDto;
  blockedDocument: boolean = false;
  fileName:string;
  myFile:File;
  file: any;
  uploadForm: FormGroup;
  alert:string;


  constructor(private companyService:CompanyService,private customerService:CustomerService,private router: Router, private formBuilder: FormBuilder) {
    this.matchMakeUpDto=new MatchMakeUpDto();
    this.companyService.loadCompany().subscribe(
      (data: CompanyDto[]) => {
        this.companies = data; 
      },
      fail => {
        this.alert="problem with load companies list",
        this.blockedDocument=false;
      });

  }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
        profile: ['']
      });
  }
 
  changeName(event) {
    if (event.target.files.length === 0)
      return;
    this.myFile = event.target.files[0];
    this.uploadForm.get('profile').setValue(this.myFile);
    var mimeType = this.myFile.type;
    
    if (mimeType.match(/image\/*/) == null) {
      this.alert=("קובץ זה אינו נתמך. נא לבחור בקובץ תמונה");
      return;
    }
    
    this.fileName=this.myFile.name;
    var reader = new FileReader();
    reader.readAsDataURL(this.myFile);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }

     
  }
  
  
  save(){
    this.blockedDocument=true;
    var companiesName=[];
    if(this.selectedCompanies==undefined)
    {
      this.alert=("no companies choosen, choose and try again");
      this.blockedDocument=false;
      return;
    }//if
    if(this.selectedCompanies.length<=0)
    {
      this.alert=("no companies choosen, choose and try again");
      this.blockedDocument=false;
      return;
    }
    for(var i=0;i<this.selectedCompanies.length;i++)
    {
      companiesName.push(this.selectedCompanies[i].name)
    }//for
    if(this.uploadForm.get('profile').value)
    {
      this.alert="";
      let frmData = new FormData();
      frmData.append("img", this.uploadForm.get('profile').value);    
      var companiesNameJson=JSON.stringify(companiesName);
      this.customerService.Upload(frmData,this.fileName,companiesNameJson).subscribe(
        (data: MatchMakeUpDto) => {
          this.matchMakeUpDtoRes = data; 
          if(this.matchMakeUpDtoRes){
            if(this.matchMakeUpDtoRes.details && this.matchMakeUpDtoRes.images){
              let navigationExtras: NavigationExtras =this.parseToString();
              this.router.navigate(["display"], navigationExtras);
            }//if det
            else
            {
              this.blockedDocument = false,
              this.alert=( "problem occured in server");
            }//else
          }//if res
          else
          {
            this.blockedDocument = false,
            this.alert=( "problem occured in server");
          }//else
        }//data
      )//subscribe
    }//if get profile
    else{
      this.alert=("you don't choose file, choose and try again");
      this.blockedDocument=false;
      return;
    }//else
  }//main func

   back(){
    this.router.navigateByUrl('/main-menu')
   }
   parseToString(){
    var navigationExtras: NavigationExtras = {
      queryParams: {
          "images":JSON.stringify(
            this.matchMakeUpDtoRes.images ),
          "details":JSON.stringify(
            this.matchMakeUpDtoRes.details ),
          "orgImage":JSON.stringify(this.imgURL),
      }
    };
    return navigationExtras;
  }
 
}