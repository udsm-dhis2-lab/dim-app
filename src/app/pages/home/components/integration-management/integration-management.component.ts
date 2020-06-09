/**
 *
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
/**
 *
 */
import { SideMenuConfig } from '../../config/menu.config';
import { Menu } from 'src/app/shared/models/side-menu.model';
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
