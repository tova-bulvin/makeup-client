import { Component, OnInit } from '@angular/core';
import { ProductDto } from '../models/dto/productDto';
import { MatchMakeUpDto } from '../models/dto/MatchMakeUpDto';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {Http} from "@angular/http";
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-display-product',
  templateUrl: './display-product.component.html',
  styleUrls: ['./display-product.component.css']
})
export class DisplayProductComponent implements OnInit {
  product:ProductDto
  imageList:SafeResourceUrl[]
  imgURL:any
  numChoose:number
  matchMakeUpDto:MatchMakeUpDto
  constructor(private router: Router,private route: ActivatedRoute,private sanitizer: DomSanitizer) { 
  this.matchMakeUpDto=new MatchMakeUpDto()
    this.route.queryParams.subscribe(params => {
    if(params["images"])
    this.matchMakeUpDto.images =JSON.parse( params["images"]);
    if(params["details"])
    this.matchMakeUpDto.details =JSON.parse( params["details"]);
    if(params["orgImage"])
    this.imgURL=JSON.parse( params["orgImage"]);
    });
    this.imageList=[]
    for(var i=0;i<3;i++)
    {
      this.imageList.push(this.getImgContent(this.matchMakeUpDto.images[i]))
    }
    this.product=this.matchMakeUpDto.details[0];
    this.numChoose=1;
     //ניסוי
   //ghkk
     /*this.matchMakeUpDto.images=[]
    this.matchMakeUpDto.images.push("http://192.168.105.16:8080/picWedMay151457152019.png/" )
    this.matchMakeUpDto.images.push("http://192.168.105.16:8080/picWedMay151457152019.png/" )    
    this.matchMakeUpDto.images.push("http://192.168.105.16:8080/picWedMay151457152019.png/" )*/
  
  }
  getImgContent(imgFile:string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(imgFile);
  }
  ngOnInit() {
    this.colorlabel();
  }
  colorlabel(){
    for(var i=0;i<3;i++){
      let style1="background-color: rgb"+"("+this.matchMakeUpDto.details[i].r+" "+ this.matchMakeUpDto.details[i].g+" "+this.matchMakeUpDto.details[i].b+")";
     // style1+=';width: 100px;height: 100px;border-radius: 50%';
      var d=document.getElementById("c"+(i+1));
      d.setAttribute("style",style1);
    }
  }
 choose(index)
 {
    this.numChoose=index+1;
    this.product=this.matchMakeUpDto.details[index]
 }
 print(){
    var navigationExtras: NavigationExtras = {
        queryParams: {
          "id":this.product.id,
          "codeInCompany": this.product.codeInCompany,
          "company": JSON.stringify({
            "id": this.product.company.id,
            "name": this.product.company.name
        }),
          "r":this.product.r,
          "g":this.product.g,
          "b":this.product.b,
          "price":this.product.price,
          "description":this.product.description
      }
    };
    this.router.navigate(["print"], navigationExtras);
 }
 back(){
  this.router.navigateByUrl('/customer-main')
 }
}
 

/*
<label>R: </label><span>{{matchMakeUpDto.details[0].r}}</span><br/>
                <label>G: </label><span>{{matchMakeUpDto.details[0].g}}</span><br/>
                <label>B: </label><span>{{matchMakeUpDto.details[0].b}}</span><br/>
*/