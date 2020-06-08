/**
 *
 */
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
/**
 *
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';
import { RouterModule } from '@angular/router';

/**
 *
 */
@NgModule({
  declarations: [NavigationMenuComponent],
  imports: [CommonModule, RouterModule, MatButtonModule, MatTooltipModule],
  exports: [NavigationMenuComponent, MatButtonModule, MatTooltipModule],
})
/**
 *
 */
export class SharedModule {}
