import { Component, OnInit } from '@angular/core';
import { ProductDto } from '../models/dto/productDto';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import {BlockUIModule} from 'primeng/blockui';
import { CompileMetadataResolver } from '@angular/compiler';
//import {ToastModule} from 'primeng/toast';

@Component({
  selector: 'app-print-product',
  templateUrl: './print-product.component.html',
  styleUrls: ['./print-product.component.css']
})
export class PrintProductComponent implements OnInit {
  product:ProductDto
  address:string
  emailFlag:boolean=false
  blockedDocument: boolean = false;
  alert="";
  alertClass="danger";

  constructor(private route: ActivatedRoute,private router:Router,private customerService:CustomerService) {
    this.product=new ProductDto
    this.route.queryParams.subscribe(params => {
      this.product.id = params["id"];
      if(params["company"])
      this.product.company =JSON.parse(params["company"]);
      this.product.codeInCompany = params["codeInCompany"];
      this.product.r = params["r"];
      this.product.g = params["g"];
      this.product.b = params["b"];
      this.product.price = params["price"];
      this.product.description = params["description"];
     
    });
  }
  
  ngOnInit() {
    this.colorlabel();
  }
  colorlabel(){
    /*var r =document.getElementById("r").innerHTML;
    var g=document.getElementById("g").innerHTML;
    var b =document.getElementById("b").innerHTML;*/
    var r=this.product.r;
    var g=this.product.g;
    var b=this.product.b;
    let style1="background-color: rgb"+"("+r+" "+ g+" "+b+")";
    style1+=';width: 100px;height: 100px;border-radius: 50%;font-size:20px;font-family: Cambria, Cochin, Georgia, Times,Times New Roman, serif;font-weight: 600;display: inline-block;text-align:center;';
    var d=document.getElementById("color");
    d.setAttribute("style",style1);
    d.innerHTML="color:"
    
  }
 
  back(){
    this.router.navigateByUrl('/customer-main')
  }
  
  email(){
    let printContents;
    //document.getElementById("color").setAttribute("hidden","hidden");
    printContents = document.getElementById('print-section').innerHTML;
    let message:string=`
    <html>
      <head>
        <title>Print tab</title>
        <style>
          #color{
            width: 100px;
            height: 100px;
            border-radius: 50%;
            font-size:20px;
            font-family: Cambria, Cochin, Georgia, Times,Times New Roman, serif;
            font-weight: 600;
            display: inline-block;
            text-align:center;
          }
        </style>
        <script>
          function color(){
            if(document.getElementById("r")!=null && document.getElementById("g")!=null && document.getElementById("b")!=null)
            {
              var r=document.getElementById("r").innerHTML;
              var g=document.getElementById("g").innerHTML;
              var b =document.getElementById("b").innerHTML;
              let style1="background-color: rgb"+"("+r+" "+ g+" "+b+")";
              var d=document.getElementsByName("color")[0];
              d.setAttribute("style",style1);
            }
          }
          window.addEventListener('load', (event) => {
            color();
          });
        </script>
      </head>
      <body onload="color()">${printContents}</body>
    </html>`;
    this.emailFlag=false;
    this.blockedDocument=true
    this.customerService.sendMail(this.address,message).subscribe(
      data=>{
        this.alert="Email sent successfully";
        this.alertClass="success";
        this.blockedDocument=false;
      },
      fail=> {
        this.alert="Sorry, There is a problem with send email";
        this.alertClass="danger";
        this.blockedDocument=false;
      }
    );
  //this.blockedDocument=false
   
  }
  print(): void {
    //document.getElementById("color").setAttribute("hidden","hidden");
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
    <html>
    <head>
      <title>Print tab</title>
      <style>
        #color{
          width: 100px;
          height: 100px;
          border-radius: 50%;
          font-size:20px;
          font-family: Cambria, Cochin, Georgia, Times,Times New Roman, serif;
          font-weight: 600;
          display: inline-block;
          text-align:center;
        }
      </style>
      <script>
        function color(){
          if(document.getElementById("r")!=null && document.getElementById("g")!=null && document.getElementById("b")!=null)
          {
            var r=document.getElementById("r").innerHTML;
            var g=document.getElementById("g").innerHTML;
            var b =document.getElementById("b").innerHTML;
            let style1="background-color: rgb"+"("+r+" "+ g+" "+b+")";
            var d=document.getElementById("color");
            d.setAttribute("style",style1);
          }
        }
        window.addEventListener('load', (event) => {
          color();
        });
      </script>
    </head>
<body onload="window.print();window.close();color()">${printContents}</body>
  </html>`
    );
    popupWin.document.close();
  }
  
}
