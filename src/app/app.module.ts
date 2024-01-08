import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './services/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from './services/Data/category.service';
import { ProductService } from './services/Data/product.service';
import { CustomFormsModule } from 'ng2-validation';



@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        allowedDomains: [], // Domini autorizzati per la verifica del token
        disallowedRoutes: [] // Rotte escluse dalla verifica del token
      },
    }),
    RouterModule.forRoot([
      {path:'', component:HomeComponent},
      {path:'products', component:ProductsComponent},
      {path:'shopping-cart', component:ShoppingCartComponent},
      {path:'login', component:LoginComponent},

      {path:'my/orders', component:MyOrdersComponent, canActivate:[AuthGuard]},
      {path:'check-out', component:CheckOutComponent, canActivate:[AuthGuard]},
      {path:'order-success', component:OrderSuccessComponent, canActivate:[AuthGuard]}, 
     
      {path:'admin/products', component:AdminProductsComponent, canActivate:[AuthGuard,AdminAuthGuard]},
      {path:'admin/products/:id', component:ProductFormComponent, canActivate:[AuthGuard,AdminAuthGuard]},
      {path:'admin/products/new', component:ProductFormComponent, canActivate:[AuthGuard,AdminAuthGuard]},   
      {path:'admin/orders', component:AdminOrdersComponent, canActivate:[AuthGuard,AdminAuthGuard]}
     
    ]),
    HttpClientModule,
    CustomFormsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    CategoryService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
