import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-birthday-view',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './birthday-view.component.html',
  styleUrl: './birthday-view.component.css',
})
export class BirthdayViewComponent {
  data: any;
  userId: any;
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.userId = params['id'];
    });
    console.log(this.userId, '/////this.userId');
    this.http.get(`http://localhost:8082/v1/users/${this.userId}`).subscribe(
      (response: any) => {
        this.data = response.result;
        console.log('API Data:', response.result);
        console.log(this.data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
