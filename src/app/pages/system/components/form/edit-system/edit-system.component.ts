import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

import { DataEntryField } from 'src/app/shared/models/form.model';
import { CreateSystem, UpdateSystem } from 'src/app/pages/system/state';
import { DIMSystem } from 'src/app/pages/home/models/integration.model';
import { onUpdateFormProps } from 'src/app/shared/utils/form-values-updater.utils';
import {
  getSystemCreatedStatus,
  getSelectedSystem,
  getSystemEditedStatus,
} from 'src/app/pages/system/state/system.selector';
import { OpenSnackBar } from 'src/app/shared/helpers/snackbar.helper';
import { SystemState } from '../../../state/system.state';

@Component({
  selector: 'app-edit-system',
  templateUrl: './edit-system.component.html',
  styleUrls: ['./edit-system.component.scss'],
})
export class EditSystemComponent implements OnInit, OnDestroy {
  systemFormEntries: DataEntryField = _.clone(_.create());
  isUpdating: boolean;
  updateSystemForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    isExecuted: new FormControl(false),
    dataSet: new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
    }),
    ou: new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
    }),
    description: new FormControl(''),
    defaultCOC: new FormControl(''),
    isAllowed: new FormControl(false),
    importURL: new FormControl(''),
    isUsingHIM: new FormControl(''),
    dataFromURL: new FormControl(''),
    isUsingLiveDhis2: new FormControl(false),
    from: new FormControl(''),
    to: new FormControl(''),
  });

  subscriptions: Array<Subscription> = [];
  systemFormSUB$: Subscription;
  systemUpdatedSUB$: Subscription;
  updatedSystemSUB$: Subscription;
  selectedSystemSUB$: Subscription;

  constructor(
    private systemState: Store<SystemState>,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isUpdating = false;
    this.systemFormSUB$ = this.updateSystemForm.valueChanges.subscribe(
      (system: DIMSystem) => {
        this.systemFormEntries = onUpdateFormProps(
          this.systemFormEntries,
          system
        );
      }
    );
    this.selectedSystemSUB$ = this.systemState
      .pipe(select(getSelectedSystem))
      .subscribe((system: DIMSystem) => {
        this.updateSystemForm.patchValue(system);
      });
    this.subscriptions.push(this.systemFormSUB$);
    this.subscriptions.push(this.selectedSystemSUB$);
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      if (subscription) {
        subscription.unsubscribe();
      }
    }
  }

  onSubmitForm(): void {
    this.isUpdating = true;
    this.selectedSystemSUB$ = this.systemState
      .pipe(select(getSelectedSystem))
      .subscribe((system: DIMSystem) => {
        const updatedSystem = _.merge(_.clone(this.systemFormEntries), {
          id: system?.id,
        });
        this.systemState.dispatch(
          UpdateSystem(_.clone({ system: updatedSystem }))
        );
        this.systemUpdatedSUB$ = this.systemState
          .pipe(select(getSystemEditedStatus))
          .subscribe((status: boolean) => {
            if (status) {
              this.isUpdating = false;
              this.router.navigate(['../../list'], { relativeTo: this.route });
              OpenSnackBar(
                this.snackBar,
                `System "${updatedSystem?.name}" with id <${updatedSystem?.id}> is successfully updated`,
                '',
                'success-snackbar'
              );
            }
          });
        this.subscriptions.push(this.systemUpdatedSUB$);
      });
    this.subscriptions.push(this.selectedSystemSUB$);
  }

  onBack() {
    this.router.navigate(['../../list'], { relativeTo: this.route });
  }
}
