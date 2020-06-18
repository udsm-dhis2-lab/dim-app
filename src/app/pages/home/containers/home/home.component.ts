import { Component, OnInit } from '@angular/core';
import { AllMenuConfigs } from '../../config/menu.config';
import { AllServiceConfig, SubMenu } from '../../models/all.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  AllMenuConfigs: Array<AllServiceConfig> = AllMenuConfigs;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  onOpenForm(subMenu: SubMenu): void {
    this.router.navigate(['../' + subMenu.route, subMenu.childRoutes.create], {
      relativeTo: this.route,
    });
  }

  onOpenList(subMenu: SubMenu): void {
    this.router.navigate(['../' + subMenu.route, subMenu.childRoutes.list], {
      relativeTo: this.route,
    });
  }
}
