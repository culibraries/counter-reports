import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onLogOut() {
    const r = confirm(
      'You are logging out! According to OIT authentication system, You will need to exit all open windows of your current web browser to completely log out of the application. If you do not properly quit your browser, your computer will remain logged into the app!'
    );
    if (r) {
      this.router.navigate(['/logout']);
    }
  }
}
