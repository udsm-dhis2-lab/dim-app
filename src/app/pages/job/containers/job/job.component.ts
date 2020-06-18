import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/shared/models/side-menu.model';
import { JOBSideMenuConfig } from '../../config/menu.config';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
  sideMenuConfig: Array<Menu> = JOBSideMenuConfig;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  onOpenMenu(menu: Menu): void {
    if (menu) {
      this.router.navigate(['./' + menu.route], { relativeTo: this.route });
    }
  }
}
