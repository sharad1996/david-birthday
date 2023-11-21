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
  public country: string = '';

  name = '';
  countries = [
    'Afghanistan',
    'Albania',
    // Add more countries as needed
  ];
  error = '';
  model = new User();

  private apiUrl = 'http://localhost:8082/v1/users'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(this.apiUrl).subscribe(
      (response: any) => {
        this.data = response.result;
        console.log('API Data:', response.result);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  getUserForm(data: any) {
    if (
      data.fName === '' ||
      data.lName === '' ||
      data.date === '' ||
      data.city === ''
    ) {
      this.error = 'All fields are  required !!!';
      return;
    } else {
      this.error = '';
    }
    debugger;
    this.http
      .post('http://localhost:8082/v1/users/create', data)
      .subscribe((result) => {
        console.log(result);
        this.model = new User('');
        this.ngOnInit();
      });
  }
}
