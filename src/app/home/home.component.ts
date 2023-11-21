import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../User';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [DatePipe],
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

  constructor(
    private http: HttpClient,
    private router: Router,
    private datePipe: DatePipe
  ) {}

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
        this.model = new User('', '', '', '', '');
        this.ngOnInit();
      },
      (error) => {
        alert(error.error.message);
      }
    );
  }
  // Method to convert the date format
  formatDateString(dateString: string): string {
    const parsedDate = new Date(dateString);
    return this.datePipe.transform(parsedDate, 'dd-MM-yyyy') || '';
  }
}
