import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../User';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
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
    'India',
    // Add more countries as needed
  ];
  hasError = false;
  model = new User('', '', '', '', '');

  private apiUrl = 'http://localhost:8082/v1/users'; // Replace with your API URL

  constructor(private http: HttpClient, private router: Router) {}

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

  // getAllData(id: number) {
  //   console.log(id);
  // }

  navigateToBirth(id: number) {
    console.log(id, '//////id');
    this.router.navigate([`/birth/${id}`]);
  }

  getUserForm(data: any) {
    if (
      data.fName === '' ||
      data.lName === '' ||
      data.date === '' ||
      data.city === ''
    ) {
      this.hasError = true;
      return;
    } else {
      this.hasError = false;
    }
    this.http
      .post('http://localhost:8082/v1/users/create', data)
      .subscribe((result) => {
        console.log(result);
        this.ngOnInit();
      });
  }
}
