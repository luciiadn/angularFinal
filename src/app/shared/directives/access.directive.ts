import { Directive, ElementRef, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Directive({
  selector: '[appAccess]'
})
export class AccessDirective {

  @Input() appAccess: string[] = [];

  constructor(private el: ElementRef, private authService: AuthService) {}

  ngOnInit() {
    if (!this.authService.rol || this.appAccess.indexOf(this.authService.rol) === -1) {
      this.el.nativeElement.style.display = 'none';
    }
  }
}
