import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  title = 'fitness-tracker-app';
  openSideNav: boolean;

  constructor(private authService: AuthService){}

  ngOnInit() {
    this.openSideNav = false;
    this.authService.initAuthListener();
  }

  toggleSideNav(){
    this.openSideNav = !this.openSideNav;
  }
}
