import { Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { CompanyComponent } from '../company/company.component';
import { ProductComponent } from '../product/product.component';
import { EditCompanyComponent } from '../edit-company/edit-company.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
import{HeaderTopComponent} from "../header/header.component"





export const MAIN_COMPONENTS = [
    MainComponent
]

export const MAIN_ROUTES: Routes = [
    {
        path: 'main',
        component: MainComponent,
        //canActivate: [AuthGuard],
        children: [
            
            {
               path: '',
                pathMatch: 'full',
                redirectTo: 'home'
            }
        ]
             },
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
             
]
