import { Routes } from '@angular/router';
import { BirthdayViewComponent } from './birthday-view/birthday-view.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, //default route
  { path: 'home', component: HomeComponent },
  { path: 'birth/:id', component: BirthdayViewComponent },
];
