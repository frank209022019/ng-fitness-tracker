import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Output() closeSidenav = new EventEmitter<void>();
  isUserLoggedIn: boolean;
  authSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isUserLoggedIn = false;
    this.authSub = this.authService.authChange.subscribe((result: boolean) => {
      this.isUserLoggedIn = result;
    })
  }

  onClose() {
    this.closeSidenav.emit();
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

  onLogout(){
    this.onClose();
    this.authService.logoutUser();
  }

}
