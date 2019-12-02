import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.logout('/api-auth/logout/').subscribe(() => {
      console.log('You are logged out!');
    });
  }

}
