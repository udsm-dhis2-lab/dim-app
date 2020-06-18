import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Menu } from 'src/app/shared/models/side-menu.model';
import { BatchSideMenuConfig } from '../../config/menu.config';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss'],
})
export class BatchComponent implements OnInit {
  sideMenuConfig: Array<Menu> = BatchSideMenuConfig;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  onOpenMenu(menu: Menu): void {
    if (menu) {
      this.router.navigate(['./' + menu.route], { relativeTo: this.route });
    }
  }
}
