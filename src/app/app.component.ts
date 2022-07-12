import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  title = 'fitness-tracker-app';
  openSideNav: boolean;

  ngOnInit() {
    this.openSideNav = false;
  }

  toggleSideNav(){
    this.openSideNav = !this.openSideNav;
  }
}
