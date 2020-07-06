import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/shared/models/side-menu.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportSideMenuConfig } from '../../config/menu.config';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  sideMenuConfig: Array<Menu> = ReportSideMenuConfig;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  onOpenMenu(menu: Menu): void {
    if (menu) {
      this.router.navigate(['./' + menu.route], { relativeTo: this.route });
    }
  }
}
