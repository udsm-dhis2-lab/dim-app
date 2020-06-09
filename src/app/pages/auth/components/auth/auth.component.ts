import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/shared/models/side-menu.model';
import { AuthSideMenuConfig } from '../../config/menu.config';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  sideMenuConfig: Array<Menu> = AuthSideMenuConfig;

  constructor() { }

  ngOnInit(): void {
  }

}
