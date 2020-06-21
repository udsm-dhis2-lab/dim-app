import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/shared/models/side-menu.model';
import { ActivatedRoute, Router } from '@angular/router';
import { IntegrationSideMenuConfig } from '../../config/menu.config';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss'],
})
export class IntegrationComponent implements OnInit {
  sideMenuConfig: Array<Menu> = IntegrationSideMenuConfig;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  onOpenMenu(menu: Menu): void {
    if (menu) {
      this.router.navigate(['./' + menu.route], { relativeTo: this.route });
    }
  }
}
