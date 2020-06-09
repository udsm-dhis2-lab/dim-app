import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/shared/models/side-menu.model';
import { SystemSideMenuConfig } from '../../config/menu.config';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {

  sideMenuConfig: Array<Menu> = SystemSideMenuConfig;

  constructor() { }

  ngOnInit(): void {
  }

}
