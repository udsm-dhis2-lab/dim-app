import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuInfo } from 'src/app/shared/models/service.model';
import { JobMenu } from '../../config/service.config';

@Component({
  selector: 'app-service-menu',
  templateUrl: './service-menu.component.html',
  styleUrls: ['./service-menu.component.scss']
})
export class ServiceMenuComponent implements OnInit {
  systemMenuServices: Array<MenuInfo> = JobMenu;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  onOpenForm(menuInfo: MenuInfo) {
    if (menuInfo) {
      this.router.navigate([menuInfo.routeCreate], { relativeTo: this.route });
    }
  }

  onOpenList(menuInfo: MenuInfo) {
    if (menuInfo) {
      this.router.navigate([menuInfo.routeList], { relativeTo: this.route });
    }
  }

}
