import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bug-Discover';

  userType: string = localStorage.getItem('userType');
  token: string = localStorage.getItem('token');

}
