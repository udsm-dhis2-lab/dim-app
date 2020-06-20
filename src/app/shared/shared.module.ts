/**
 *
 */
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 *
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchByNamePipe } from './pipes/search-by-name/search-by-name.pipe';
import { EmptyNotificationComponent } from './components/empty-notification/empty-notification.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ProgressLoaderComponent } from './components/progress-loader/progress-loader.component';

/**
 *
 */
@NgModule({
  declarations: [
    NavigationMenuComponent,
    EmptyNotificationComponent,
    SearchByNamePipe,
    ProgressLoaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressBarModule,
  ],
  exports: [
    SearchByNamePipe,
    ProgressLoaderComponent,
    EmptyNotificationComponent,
    NavigationMenuComponent,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatIconModule,
    MatDatepickerModule,
    MatSidenavModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
})
/**
 *
 */
export class SharedModule {}
