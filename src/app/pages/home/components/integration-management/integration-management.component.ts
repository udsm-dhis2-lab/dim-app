/**
 *
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
/**
 *
 */
import { Menu } from '../../models/side-menu.model';
import { SideMenuConfig } from '../../config/menu.config';
/**
 *
 */
@Component({
  selector: 'app-integration-management',
  templateUrl: './integration-management.component.html',
  styleUrls: ['./integration-management.component.scss'],
})
/**
 *
 */
export class IntegrationManagementComponent implements OnInit, OnDestroy {
  /**
   *
   */
  sideMenuConfig: Array<Menu> = SideMenuConfig;

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
}
