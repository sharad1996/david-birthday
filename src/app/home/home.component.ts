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

  navigateToBirth(id: number) {
    this.router.navigate([`/birth/${id}`]);
  }

  // Calculate age for user
  ageCalculator(dob: string) {
    const today = new Date();
    const birthDate = new Date(dob);
    let ageNow = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      ageNow--;
    }

    return ageNow;
  }

  getUserForm(data: any) {
    // All fields should not be empty
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

    // checking year should be 18 years above
    if (this.ageCalculator(data.date) < 18) {
      alert('Age Should be greater than 18');
      return;
    }

    this.http.post('http://localhost:8082/v1/users/create', data).subscribe(
      (result) => {
        console.log(result);
        this.ngOnInit();
      },
      (error) => {
        alert(error.error.message);
      }
    );
  }
}
