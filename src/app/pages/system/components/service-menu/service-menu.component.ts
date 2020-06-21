import { Component, OnInit } from '@angular/core';
import { MenuInfo } from '../../../../shared/models/service.model';
import { SystemMenu } from '../../config/service.config';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-menu',
  templateUrl: './service-menu.component.html',
  styleUrls: ['./service-menu.component.scss'],
})
export class ServiceMenuComponent implements OnInit {
  systemMenuServices: Array<MenuInfo> = SystemMenu;

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
