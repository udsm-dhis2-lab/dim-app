/**
 *
 */
import { Component, OnInit, OnDestroy } from '@angular/core';

/**
 *
 */
import { NavigationMenu } from '../../models/menu.model';
import { NavigationMenuConfig } from '../../config/menu.config';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css'],
})
export class NavigationMenuComponent implements OnInit, OnDestroy {
  /**
   *
   */
  navigationMenu: Array<NavigationMenu> = NavigationMenuConfig;

  /**
   *
   */
  constructor() {}

  /**
   *
   */
  ngOnInit(): void {}

  /**
   *
   */
  ngOnDestroy(): void {}

  /**
   *
   */
  onOpenMenu() {}
}
