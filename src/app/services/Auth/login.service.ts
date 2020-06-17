import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { BaseHttpService, BaseApiService } from "../../shared";
import { ActivatedRoute, Router } from "@angular/router";
import { UserDto } from "../../models"

@Injectable()
export class LoginService extends BaseApiService {
   public userName:string;
   public page:PagesRouter;
   public currentUser:UserDto;

    constructor(private router: Router,private baseHttpService: BaseHttpService) {
        super('User');
    }

    getUserName():string{
        return this.currentUser.userName;
    }

    setCurrentUser(user:UserDto){
        this.currentUser = user;
    }

    login( userName: string,  password: string) : Observable<UserDto>
    {
        this.userName = userName;    
        return this.signIn(userName, password)
    }

    signIn( userName:string, password: string) : Observable<UserDto> {
        let url = this.actionUrl('Login');
        let params: URLSearchParams = new URLSearchParams();
        if (typeof userName === "undefined" || typeof password === "undefined") // עדיף לא לשלוח בכלל לשרת. יש לטפל בobservable במקרה כזה
        {
            userName = "";
            password = "";
        }
        params.set('userName', userName);
        params.set('password', password);
        return this.baseHttpService.get<UserDto>(url, params);
    }

    signOut(){ 
        this.currentUser=null; 
        this.router.navigateByUrl('');
       
    }
    
    setPage(/*page:PagesRouter*/){
        this.userName='bbb';
        this.page=PagesRouter.AbsorptionOfACandidate_viewing;
        //this.page=page;
        
        //true 3 p-1/2
        //false 1-1
    }
    getPage():number{
        return this.page.valueOf();
    }
}
export enum PagesRouter {

    AbsorptionOfACandidate_viewing = 1,
    AbsorptionOfACandidate_editing = 2,
    ManageOffers_viewing = 3,
    ManageOffers_editing = 4,
    FindingCandidates_viewing = 5
}
