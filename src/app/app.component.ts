import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { User } from './User';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public title = 'david-birthday';
  public firstName: string = '';
  public lastName: string = '';
  public city: string = '';
  public date: string = '';
  public country?: string = '';
  name = '';
  countries = [
    'Afghanistan',
    'Albania',
    // Add more countries as needed
  ];
  model = new User('18');

  // constructor(
  // ) {}

  onSubmit(values: any) {
    console.log('=============>>>>>>>>>>>>>>>', values, this.model);
  }
}
