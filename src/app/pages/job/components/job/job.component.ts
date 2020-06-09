import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/shared/models/side-menu.model';
import { JOBSideMenuConfig } from '../../config/menu.config';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
  sideMenuConfig: Array<Menu> = JOBSideMenuConfig;

  constructor() {}

  ngOnInit(): void {}
}
