import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from "./app.component";

import { MAIN_ROUTES } from "./+main";
import {AUTH_ROUTES} from "./+auth";
import { AutoComponent } from './auto/auto.component';
import { MainComponent } from './+main/main.component';
import { HomeComponent } from './home/home.component';
import { CompanyComponent } from './company/company.component';
import { ProductComponent } from './product/product.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CustomerMainComponent } from './customer-main/customer-main.component';
import { DisplayProductComponent } from './display-product/display-product.component';
import { PrintProductComponent } from './print-product/print-product.component';

const APP_ROUTES: Routes = [
    {
        path:'home',
        component:AppComponent,
    
       
    },
    {
        path:'auto',
        component:AutoComponent,
   
    },
    {
        path:'admin-main',
        component:MainComponent
        /* children: [
            {
                path: 'company',
                component:CompanyComponent
             },
             {
                path: 'product',
                component:ProductComponent
             },
             {
                path: 'edit-company',
                component:EditCompanyComponent
             },
             {
                path: 'edit-product',
                component:EditProductComponent
             }
        ]*/
    },
    {
        path:'customer-main',
        component:CustomerMainComponent,
   
    },
    
    {
        path:'display',
        component:DisplayProductComponent,
   
    },
    {
        path:'print',
        component:PrintProductComponent,
   
    },
    ...AUTH_ROUTES, 
    ...MAIN_ROUTES ,
    {
        path:'main-menu',
        component:HomeComponent,
    }  ,
    {
        path:'',
        component:HomeComponent,
    }   
];


@NgModule({
    imports: [
        RouterModule.forRoot(APP_ROUTES/*, { useHash: true }*/)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }