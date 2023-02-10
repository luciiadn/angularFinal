import { Injectable } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(): boolean {
    console.log(this.authService.rol)

    if(this.authService.rol === 'Administrador'){
      return true;
    }

    this.router.navigate(['/']);
    return false;

  }
}
