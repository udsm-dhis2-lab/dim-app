import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/shared/models/side-menu.model';
import { ReportSideMenuConfig } from '../../config/menu.config';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  sideMenuConfig: Array<Menu> = ReportSideMenuConfig;

  constructor() {}

  ngOnInit(): void {}
}
