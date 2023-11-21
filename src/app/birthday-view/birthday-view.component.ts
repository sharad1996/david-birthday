import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-birthday-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './birthday-view.component.html',
  styleUrl: './birthday-view.component.css',
})
export class BirthdayViewComponent {
  data: any;
  constructor(private http: HttpClient) {}
  private apiUrl = `http://localhost:8082/v1/users/`; // Replace with your API URL

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
}
