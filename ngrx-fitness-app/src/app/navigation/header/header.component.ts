import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sidenavToggle = new EventEmitter<void>();
  isUserLoggedIn: boolean;
  authSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isUserLoggedIn = false;
    this.authSub = this.authService.authChange.subscribe((result: boolean) => {
      this.isUserLoggedIn = result;
    })
  }

  ngOnDestroy() {
    if (this.authSub) this.authSub.unsubscribe();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logoutUser();
  }

}
