import { User } from 'src/app/models/user.model';
import { AuthService } from '../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent implements OnInit {

  username: string | undefined = undefined;
  rol: string | undefined = undefined;

  public user: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.authService.user$.subscribe( (user) => {
      this.user = user;
    } );

  }

  logout(){
    if(this.authService.logOut()){
      this.router.navigate(['login'])
    }
  }

}
