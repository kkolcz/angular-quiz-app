import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}

  categories() {
    this.router.navigate(['categories'], { relativeTo: this.route });
  }
}
