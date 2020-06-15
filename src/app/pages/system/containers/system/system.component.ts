import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/shared/models/side-menu.model';
import { SystemSideMenuConfig } from '../../config/menu.config';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
})
export class SystemComponent implements OnInit {
  sideMenuConfig: Array<Menu> = SystemSideMenuConfig;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  onOpenMenu(menu: Menu): void {
    if (menu) {
      this.router.navigate(['./' + menu.route], { relativeTo: this.route });
    }
  }
}
