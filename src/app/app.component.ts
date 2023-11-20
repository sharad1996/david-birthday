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
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

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
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  data: any;
  public title = 'david-birthday';
  public fName: string = '';
  public lName: string = '';
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
  private apiUrl = 'http://192.168.1.19:8081/v1/users'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(this.apiUrl).subscribe(
      (response) => {
        this.data = response;
        console.log('API Data:', this.data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  getUserForm(data: any) {
    this.http.post(this.apiUrl, data).subscribe((result) => {
      console.log(result);
    });
  }
}
