import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CustomerComponent } from './customer/customer.component';
import { AppComponent } from './app.component';
import { VerificationComponent } from './verification/verification.component';
import { ReviewComponent } from './review/review.component';
import { ApplicationComponent } from './application/application.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'verification', component: VerificationComponent },
  { path: 'review', component: ReviewComponent },
  { path: 'application/:id', component: ApplicationComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
