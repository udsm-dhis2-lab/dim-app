import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/shared/models/side-menu.model';
import { BatchSideMenuConfig } from '../../config/menu.config';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss']
})
export class BatchComponent implements OnInit {

  sideMenuConfig: Array<Menu> = BatchSideMenuConfig;

  constructor() { }

  ngOnInit(): void {
  }

}
