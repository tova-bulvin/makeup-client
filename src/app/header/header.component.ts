import { Component,Input} from '@angular/core';

declare var jQuery :any;

@Component({
    selector: 'app-header-top',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
  })
  export class HeaderTopComponent{

    
    @Input() linksInput:string;//string -list of boolean that indicate links that display in header. ex:"1,0,0,1"
    linksArray:string[];

    ngOnInit(){
      if(this.linksInput!=undefined){
        this.displayLinks();
      }
    }

    ngAfterViewInit(){
      if(this.linksInput!=undefined){
        this.displayLinks();
      }
    }
    displayLinks(){
      this.linksArray=this.linksInput.split(",");
      var i=0;
      var links=jQuery(".links>a.link");
      this.linksArray.forEach((element) => {
        var cast=Boolean(Number(element));
        var display=(cast==true?"":"none");
        links.eq(i++).css("display",display);
      });
    }

  }