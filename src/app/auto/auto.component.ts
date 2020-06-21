import { Component, OnInit } from '@angular/core';
import { UserDto } from '../models';
import { Router } from '@angular/router';
import { LoginService } from '..';
import { createWiresService } from 'selenium-webdriver/firefox';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.css']
})
export class AutoComponent implements OnInit {

  userName: string;
  password: string;
  loginSucceed = true;
  currentUser:UserDto;
  typePassword:string;
  msgs:any=[];
  flagErr:boolean;

  constructor(private router: Router, private loginService: LoginService) {
      this.typePassword="password"
  }
  ngOnInit() {
  }

  //password
  mouseOverPassword()
  {
    this.typePassword="text";
  }

  mouseLeavePassword()
  {
    this.typePassword="password";
  }

  back(){
    this.router.navigateByUrl('/main-menu')
  }
  onchangeName(){
    
  }
  onchangePassword(){

  }
  login() {
    this.flagErr=false;
    if(this.userName==undefined||this.userName==""||this.userName.length<4){
      this.msgs=[];
      this.msgs.push({severity:'error', summary:'error', detail:'User name incorrect'});
      this.flagErr=true;
    }
    if(this.password==undefined||this.password==""||this.password.length<9){
      if(!this.flagErr)
        this.msgs=[];
      this.msgs.push({severity:'error', summary:'error', detail:'Password incorrect'});
    }
    else{
      this.msgs=[];
      this.loginService.login(this.userName, this.password).subscribe(
        (data: UserDto) => {
          this.currentUser = data; 
          this.loginService.setCurrentUser(data);
          this.loginSucceed = this.currentUser.isAuthorized;    
          if (this.currentUser.isAuthorized) {
              this.router.navigateByUrl("/admin-main");
          }
        },
        fail =>{ 
          this.msgs=[];
          this.msgs.push({severity:'error', summary:'error', detail:'User not found'});
          //alert("User not found")
          
        }); 
    }
  }

}
