import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

//prime-ng
import { KeyFilterModule } from 'primeng/keyfilter';
import {TabMenuModule} from 'primeng/tabmenu';
import { CardModule } from 'primeng/card';
import {MenuModule} from 'primeng/menu';
import {ContextMenuModule} from 'primeng/contextmenu';
import {PanelModule} from 'primeng/panel';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {StepsModule} from 'primeng/steps';
import {SpinnerModule} from 'primeng/spinner';
import {FileUploadModule} from 'primeng/fileupload';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {LightboxModule} from 'primeng/lightbox';
import {ListboxModule} from 'primeng/listbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputMaskModule} from 'primeng/inputmask';
import {ButtonModule} from 'primeng/button';


//app components
import { AppComponent } from './app.component';
import { MAIN_COMPONENTS } from './+main';
import {AUTH_COMPONENTS} from './+auth';

//app modules
import { AppRoutingModule } from './app-routing.module';
import { ServicesModule } from './services';
import { SharedModule } from './shared';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {DataViewModule} from 'primeng/dataview';
import { CalendarModule } from 'primeng/calendar';
import {TabViewModule} from 'primeng/tabview';
import { SliderModule } from 'primeng/slider';
import {InputSwitchModule} from 'primeng/inputswitch';
import { HomeComponent } from './home/home.component';
import { AutoComponent } from './auto/auto.component';
import { CompanyComponent } from './company/company.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { ProductComponent } from './product/product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CompanyService } from './services/company.service';
import { ProductService } from './services/product.service';
import { CustomerService } from './services/customer.service';
import { DisplayPrintService } from './services/display-print.service';
import { PaginatorModule } from 'primeng/paginator';
import { CustomerMainComponent } from './customer-main/customer-main.component';
import { DisplayProductComponent } from './display-product/display-product.component';
import { PrintProductComponent } from './print-product/print-product.component'; // Here
import {TableModule} from 'primeng/table';
import {BlockUIModule} from 'primeng/blockui';
import { CommonModule } from '@angular/common'; 



@NgModule({
  declarations: [
    //app components
    AppComponent,
    ...MAIN_COMPONENTS,
    ...AUTH_COMPONENTS,
    HomeComponent,
    AutoComponent,
    CompanyComponent,
    EditCompanyComponent,
    ProductComponent,
    EditProductComponent,
    CustomerMainComponent,
    DisplayProductComponent,
    PrintProductComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    //app modules
    ServicesModule,
    SharedModule,

    //prime-ng modules
    MenuModule,
    ContextMenuModule,
    ButtonModule,
    PanelModule,
    InputTextModule,
    RadioButtonModule,
    DropdownModule,
    StepsModule,
    TabMenuModule,
    DataViewModule,
    CalendarModule,
    MessagesModule,
    MessageModule,
    KeyFilterModule,
    TabViewModule,
    PaginatorModule,
    RadioButtonModule,
    InputMaskModule,
    FileUploadModule,
    SliderModule,
    SpinnerModule,
    ProgressSpinnerModule,
    LightboxModule,
    BrowserAnimationsModule,
    InputSwitchModule,
    ListboxModule,
    TableModule,
    CardModule,
    BlockUIModule,
    CommonModule
  ],
  
  providers: [
    CompanyService,
    ProductService,
    CustomerService,
    DisplayPrintService
    //AutoService,
    //AuthGuard
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
